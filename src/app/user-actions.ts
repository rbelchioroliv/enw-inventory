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

export async function editUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const oldPassword = formData.get("oldPassword") as string;

  const existing = await prisma.user.findFirst({
    where: { email, id: { not: id } }
  });
  if (existing) return { error: "Este E-mail já está a ser utilizado por outro administrador!" };

  const dataToUpdate: any = { name, email };

  if (password && password.trim() !== "") {
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) return { error: "Usuário não encontrado." };

    if (!oldPassword || oldPassword.trim() === "") {
      return { error: "Para definir uma nova senha, precisa digitar a sua senha antiga!" };
    }

    const isValid = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isValid) {
      return { error: "A senha antiga está incorreta. Alteração cancelada." };
    }

    dataToUpdate.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({ where: { id }, data: dataToUpdate });
  revalidatePath("/admin");
  return { success: true };
}

// FUNÇÃO ATUALIZADA: Bloqueia a exclusão do próprio perfil
export async function deleteUser(id: string, currentUserEmail?: string | null) {
  // 1. Verifica quem está a tentar ser apagado
  const userToDelete = await prisma.user.findUnique({ where: { id } });
  
  // 2. Se for a própria pessoa, bloqueia!
  if (userToDelete?.email === currentUserEmail) {
    return { error: "Por medidas de segurança, você não pode excluir o seu próprio perfil!" };
  }

  const count = await prisma.user.count();
  if (count <= 1) return { error: "Não pode deletar o último administrador do sistema!" };
  
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin");
  return { success: true };
}