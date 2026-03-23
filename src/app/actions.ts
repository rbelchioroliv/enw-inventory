"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getEquipments() {
  return await prisma.equipment.findMany({
    orderBy: { criadoEm: 'desc' }
  })
}

export async function addEquipment(formData: FormData) {

  const macAddress = formData.get("macAddress") as string;
  const usuarioAtual = formData.get("usuarioAtual") as string;
  const emailCorporativo = formData.get("emailCorporativo") as string;
  const patrimonio = formData.get("patrimonio") as string;

  const snRaw = formData.get("numeroSerie");
  const snValue = snRaw ? snRaw.toString().trim() : "";
  const numeroSerie = snValue === "" ? null : snValue;


  const orConditions: any[] = [
    { patrimonio },
    { macAddress },
    { usuarioAtual },
    { emailCorporativo }
  ];


  if (numeroSerie) {
    orConditions.push({ numeroSerie });
  }

  const existingEq = await prisma.equipment.findFirst({
    where: { OR: orConditions }
  });


  if (existingEq) {
    return { error: "Maquina ja cadastrada em um usuário, verifique e tente novamente! Se acha que isso foi um erro contacte o suporte via e-mail!" };
  }


  const idade = parseInt(formData.get("idadeHardware") as string);
  const cpu = formData.get("cpu");
  const ram = formData.get("ram");
  const storageType = formData.get("storageType");
  const storageInterface = formData.get("storageInterface");
  const storageCapacity = formData.get("storageCapacity");

  const finalInterface = storageType === "HD" ? "SATA" : storageInterface;
  const configuracoesTexto = `CPU: ${cpu} | RAM: ${ram} | ${storageType} ${finalInterface} ${storageCapacity}`;

  const data = {
    empresa: formData.get("empresa") as string,
    patrimonio,
    numeroSerie,
    macAddress,
    modelo: formData.get("modelo") as string,
    configuracoes: configuracoesTexto,
    idadeHardware: idade,
    alertaTroca: idade >= 4,
    usuarioAtual,
    emailCorporativo,
  }

  try {
    await prisma.equipment.create({ data })
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { error: "Erro interno ao cadastrar no banco de dados." }
  }
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

export async function editEquipment(id: string, formData: FormData) {
  const macAddress = formData.get("macAddress") as string;
  const usuarioAtual = formData.get("usuarioAtual") as string;
  const emailCorporativo = formData.get("emailCorporativo") as string;
  const patrimonio = formData.get("patrimonio") as string;
  
  const snRaw = formData.get("numeroSerie");
  const snValue = snRaw ? snRaw.toString().trim() : "";
  const numeroSerie = snValue === "" ? null : snValue;

  // Verifica duplicados (ignorando o equipamento que está a ser editado agora)
  const orConditions: any[] = [
    { patrimonio }, { macAddress }, { usuarioAtual }, { emailCorporativo }
  ];
  if (numeroSerie) orConditions.push({ numeroSerie });

  const existingEq = await prisma.equipment.findFirst({
    where: { 
      id: { not: id }, 
      OR: orConditions 
    }
  });

  if (existingEq) {
    return { error: "Os dados inseridos (S/N, MAC, E-mail, etc) já pertencem a outra máquina cadastrada!" };
  }

  const idade = parseInt(formData.get("idadeHardware") as string);
  const reparos = parseInt(formData.get("numeroReparos") as string); // <-- NOVA LINHA AQUI
  
  const cpu = formData.get("cpu");
  const ram = formData.get("ram");
  const storageType = formData.get("storageType");
  const storageInterface = formData.get("storageInterface");
  const storageCapacity = formData.get("storageCapacity");

  const finalInterface = storageType === "HD" ? "SATA" : storageInterface;
  const configuracoesTexto = `CPU: ${cpu} | RAM: ${ram} | ${storageType} ${finalInterface} ${storageCapacity}`;

  const data = {
    empresa: formData.get("empresa") as string,
    patrimonio,
    numeroSerie,
    macAddress,
    modelo: formData.get("modelo") as string,
    configuracoes: configuracoesTexto,
    idadeHardware: idade,
    numeroReparos: reparos, // <-- NOVA LINHA AQUI
    alertaTroca: idade >= 4,
    usuarioAtual,
    emailCorporativo,
  }

  try {
    await prisma.equipment.update({ where: { id }, data })
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { error: "Erro interno ao atualizar no banco de dados." }
  }
}