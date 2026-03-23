import { getServerSession } from "next-auth";
import { getEquipments } from "../actions";
import { getUsers } from "../user-actions";
import AdminManager from "./AdminManager";

export default async function AdminPage() {
  // Descobre quem está logado neste momento
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  const equipamentos = await getEquipments();
  const users = await getUsers();

  return (
    <AdminManager 
      equipamentos={equipamentos} 
      users={users} 
      currentUserEmail={currentUserEmail} 
    />
  );
}