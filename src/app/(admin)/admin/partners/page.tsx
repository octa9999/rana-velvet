import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminPartnersPage() {
  return (
    <AdminModulePage
      module="inquiries"
      initialQuery="Interior designer partner"
      title="Partner Applications"
      eyebrow="Trade Program"
      description="Review interior designer, architect, stylist, and contractor applications submitted from the partner page."
    />
  );
}
