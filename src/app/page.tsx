import { getEquipments } from "./actions";
import DashboardClient from "./DashboardClient";

export default async function Home() {
  const equipamentos = await getEquipments();
  return <DashboardClient equipamentos={equipamentos} />;
}