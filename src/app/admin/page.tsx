import { getEquipments } from "../actions";
import { getUsers } from "../user-actions";
import AdminManager from "./AdminManager";

export default async function AdminPage() {
  const equipamentos = await getEquipments();
  const users = await getUsers();

  return (
    <AdminManager equipamentos={equipamentos} users={users} />
  );
}