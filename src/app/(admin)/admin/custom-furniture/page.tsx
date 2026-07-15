import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminCustomFurniturePage() {
  return (
    <AdminModulePage
      module="inquiries"
      initialQuery="Custom furniture"
      title="Custom Furniture Requests"
      eyebrow="Made To Order"
      description="Review custom furniture briefs with dimensions, fabric, finish, budget, inspiration, and customer contact details."
    />
  );
}
