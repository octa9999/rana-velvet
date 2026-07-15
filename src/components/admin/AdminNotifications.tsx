"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CalendarDays, MessageSquare, PackageCheck, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type AdminNotification = {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "inquiry" | "order";
  href: string;
  created_at?: string;
};

const iconMap = {
  appointment: CalendarDays,
  inquiry: MessageSquare,
  order: PackageCheck,
};

function timeLabel(value?: string) {
  if (!value) return "now";
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(value).toLocaleDateString("en-PK");
}

export function AdminNotifications() {
  const [items, setItems] = useState<AdminNotification[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    try {
      setDismissed(JSON.parse(window.localStorage.getItem("rv-dismissed-notifications") || "[]"));
    } catch {
      setDismissed([]);
    }
  }, []);

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/notifications", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json().catch(() => ({ notifications: [] }));
    const notifications = (payload.notifications || []) as AdminNotification[];
    notifications.forEach((notification) => seenRef.current.add(notification.id));
    setItems(notifications);
  }, []);

  useEffect(() => {
    load();
    const interval = window.setInterval(load, 30000);

    const channel = supabase
      ?.channel("admin-activity-notifications")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "appointments" }, load)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "inquiries" }, load)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, load)
      .subscribe();

    return () => {
      window.clearInterval(interval);
      if (channel) supabase?.removeChannel(channel);
    };
  }, [load]);

  const visible = useMemo(
    () => items.filter((item) => !dismissed.includes(item.id)).slice(0, 4),
    [dismissed, items]
  );

  const dismiss = (id: string) => {
    setDismissed((current) => {
      const next = Array.from(new Set([...current, id]));
      window.localStorage.setItem("rv-dismissed-notifications", JSON.stringify(next));
      return next;
    });
  };

  if (!visible.length) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[95] grid w-[min(380px,calc(100vw-40px))] gap-3">
      <div className="flex w-fit items-center gap-2 rounded-full bg-[#082f1f] px-4 py-2 text-xs font-semibold text-white shadow-xl shadow-black/10">
        <Bell className="h-3.5 w-3.5" />
        Live activity
      </div>
      {visible.map((item) => {
        const Icon = iconMap[item.type];
        return (
          <div key={item.id} className="rounded-[24px] border border-black/10 bg-white/95 p-3 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="flex items-start gap-3">
              <Link href={item.href} className="flex min-w-0 flex-1 gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#e5f4ec] text-[#0d6b3f]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#111]">{item.title}</span>
                  <span className="mt-1 block truncate text-xs text-neutral-500">{item.message}</span>
                  <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0d6b3f]">
                    {timeLabel(item.created_at)}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-[#111]"
                aria-label={`Dismiss ${item.title}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
