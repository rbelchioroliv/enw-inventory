import { getEquipments } from "../actions";
import AdminForm from "./AdminForm";
import AdminTable from "./AdminTable"; 

export default async function AdminPage() {
  const equipamentos = await getEquipments();

  return (
    <div className="space-y-8">
     
      <AdminForm />

      <AdminTable equipamentos={equipamentos} />
    </div>
  );
}