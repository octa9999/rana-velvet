import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminMeasurementVisitsPage() {
  return (
    <AdminModulePage
      module="appointments"
      initialQuery="Curtain measurement visit"
      title="Measurement Visits"
      eyebrow="Curtain Bookings"
      description="Review and update requested curtain measurement visits submitted from the public customization page."
    />
  );
}
