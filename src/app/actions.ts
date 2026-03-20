"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getEquipments() {
  return await prisma.equipment.findMany({
    orderBy: { criadoEm: 'desc' }
  })
}

export async function addEquipment(formData: FormData) {
  const idade = parseInt(formData.get("idadeHardware") as string);
  
 
  const snValue = formData.get("numeroSerie")?.toString().trim();
  const numeroSerie = snValue === "" ? null : snValue;


  const cpu = formData.get("cpu");
  const ram = formData.get("ram");
  const storageType = formData.get("storageType");
  const storageInterface = formData.get("storageInterface");
  const storageCapacity = formData.get("storageCapacity");

  
  const finalInterface = storageType === "HD" ? "SATA" : storageInterface;
  const configuracoesTexto = `CPU: ${cpu} | RAM: ${ram} | ${storageType} ${finalInterface} ${storageCapacity}`;

  const data = {
    empresa: formData.get("empresa") as string,
    patrimonio: formData.get("patrimonio") as string,
    numeroSerie: numeroSerie,
    macAddress: formData.get("macAddress") as string,
    modelo: formData.get("modelo") as string,
    configuracoes: configuracoesTexto,
    idadeHardware: idade,
    alertaTroca: idade >= 4,
    usuarioAtual: formData.get("usuarioAtual") as string,
    emailCorporativo: formData.get("emailCorporativo") as string,
  }

  await prisma.equipment.create({ data })
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteEquipment(id: string) {
  await prisma.equipment.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function addRepair(id: string) {
  await prisma.equipment.update({
    where: { id },
    data: { numeroReparos: { increment: 1 } }
  })
  revalidatePath("/")
  revalidatePath("/admin")
}