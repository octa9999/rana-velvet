"use client";

import {
  Package,
  Layers,
  Calendar,
  MessageSquare,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";

// Mock data for dashboard
const stats = [
  {
    label: "Total Products",
    value: "156",
    change: "+12",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    label: "Categories",
    value: "24",
    change: "+3",
    icon: Layers,
    color: "bg-green-500",
  },
  {
    label: "Appointments",
    value: "18",
    change: "+5",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    label: "Inquiries",
    value: "42",
    change: "+8",
    icon: MessageSquare,
    color: "bg-orange-500",
  },
];

const recentAppointments = [
  {
    id: "1",
    name: "Ahmed Khan",
    email: "ahmed.k@email.com",
    phone: "+92 300 123 4567",
    date: "2025-05-20",
    time: "10:00 AM",
    service: "Home Styling Consultation",
    status: "pending",
  },
  {
    id: "2",
    name: "Fatima Malik",
    email: "fatima.m@email.com",
    phone: "+92 321 987 6543",
    date: "2025-05-21",
    time: "2:00 PM",
    service: "Custom Furniture Design",
    status: "confirmed",
  },
  {
    id: "3",
    name: "Ali Hassan",
    email: "ali.h@email.com",
    phone: "+92 345 678 9012",
    date: "2025-05-22",
    time: "11:00 AM",
    service: "Fabric Selection",
    status: "pending",
  },
];

const recentInquiries = [
  {
    id: "1",
    name: "Sara Khan",
    email: "sara.k@email.com",
    subject: "Bulk order for hotel project",
    created_at: "2 hours ago",
    status: "new",
  },
  {
    id: "2",
    name: "Imran Shah",
    email: "imran.s@email.com",
    subject: "Custom sofa dimensions inquiry",
    created_at: "5 hours ago",
    status: "read",
  },
  {
    id: "3",
    name: "Ayesha Begum",
    email: "ayesha.b@email.com",
    subject: "Delivery time for curtains",
    created_at: "1 day ago",
    status: "new",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  new: "bg-blue-100 text-blue-800",
  read: "bg-gray-100 text-gray-800",
};

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--charcoal)]">
          Dashboard
        </h1>
        <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)] mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 border border-[var(--border)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-sans)] text-2xl font-semibold text-[var(--charcoal)]">
              {stat.value}
            </h3>
            <p className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-gray)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[var(--charcoal)]">
              Recent Appointments
            </h2>
            <a
              href="/admin/appointments"
              className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-taupe)] hover:underline"
            >
              View All
            </a>
          </div>
          <div className="p-6 space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--cream)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--charcoal)]">
                      {appointment.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                      {appointment.name}
                    </p>
                    <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                      {appointment.service}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[appointment.status]}`}>
                    {appointment.status}
                  </span>
                  <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] mt-1">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[var(--charcoal)]">
              Recent Inquiries
            </h2>
            <a
              href="/admin/inquiries"
              className="font-[family-name:var(--font-sans)] text-sm text-[var(--warm-taupe)] hover:underline"
            >
              View All
            </a>
          </div>
          <div className="p-6 space-y-4">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--cream)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--charcoal)]">
                      {inquiry.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
                      {inquiry.name}
                    </p>
                    <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)]">
                      {inquiry.subject}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[inquiry.status]}`}>
                    {inquiry.status}
                  </span>
                  <p className="font-[family-name:var(--font-sans)] text-xs text-[var(--warm-gray)] mt-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {inquiry.created_at}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[var(--charcoal)] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/products/new"
            className="flex flex-col items-center justify-center p-6 bg-white border border-[var(--border)] hover:border-[var(--warm-taupe)] transition-colors"
          >
            <Package className="w-8 h-8 text-[var(--warm-taupe)] mb-3" />
            <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
              Add Product
            </span>
          </a>
          <a
            href="/admin/categories/new"
            className="flex flex-col items-center justify-center p-6 bg-white border border-[var(--border)] hover:border-[var(--warm-taupe)] transition-colors"
          >
            <Layers className="w-8 h-8 text-[var(--warm-taupe)] mb-3" />
            <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
              Add Category
            </span>
          </a>
          <a
            href="/admin/banners"
            className="flex flex-col items-center justify-center p-6 bg-white border border-[var(--border)] hover:border-[var(--warm-taupe)] transition-colors"
          >
            <Eye className="w-8 h-8 text-[var(--warm-taupe)] mb-3" />
            <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
              Manage Banners
            </span>
          </a>
          <a
            href="/admin/testimonials/new"
            className="flex flex-col items-center justify-center p-6 bg-white border border-[var(--border)] hover:border-[var(--warm-taupe)] transition-colors"
          >
            <MessageSquare className="w-8 h-8 text-[var(--warm-taupe)] mb-3" />
            <span className="font-[family-name:var(--font-sans)] text-sm font-medium text-[var(--charcoal)]">
              Add Testimonial
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}