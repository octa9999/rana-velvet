import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminCurtainRequestsPage() {
  return (
    <AdminModulePage
      module="inquiries"
      initialQuery="Curtain customization"
      title="Curtain Requests"
      eyebrow="Custom Curtains"
      description="Customer-submitted made-to-measure curtain requests. Open a record to review measurements, fabric, lining, installation, and contact details."
    />
  );
}
