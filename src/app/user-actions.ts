"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function getUsers() {
  return await prisma.user.findMany({ orderBy: { criadoEm: 'desc' } })
}

export async function checkHasUsers() {
  return await prisma.user.count() > 0;
}

export async function setupFirstAdmin(formData: FormData) {
  const count = await prisma.user.count();
  if (count > 0) return { error: "O Administrador principal já existe." };
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.create({ data: { name, email, password: hashedPassword } });
  return { success: true };
}

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "E-mail já cadastrado num utilizador!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.create({ data: { name, email, password: hashedPassword } });
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteUser(id: string) {
  const count = await prisma.user.count();
  if (count <= 1) return { error: "Não pode deletar o último administrador do sistema!" };
  
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin");
  return { success: true };
}