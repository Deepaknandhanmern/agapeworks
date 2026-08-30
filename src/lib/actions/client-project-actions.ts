"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendUpdateNotification } from "@/lib/email/send-update-notification";
import { PHASES } from "@/lib/client-project-phases";
import type { ActionState } from "@/lib/actions/blog-actions";

const clientProjectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.email("Enter a valid email address"),
});

export async function createClientProjectAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();

  const parsed = clientProjectSchema.safeParse({
    projectName: formData.get("projectName"),
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const project = await db.clientProject.create({ data: parsed.data });
  revalidatePath("/dashboard/client-projects");
  redirect(`/dashboard/client-projects/${project.id}`);
}

export async function setPhaseAction(id: string, phase: (typeof PHASES)[number]) {
  await requireAuth();
  await db.clientProject.update({ where: { id }, data: { phase } }).catch(() => null);
  revalidatePath(`/dashboard/client-projects/${id}`);
}

async function getStatusOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

const updateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Description is required"),
});

export async function postUpdateAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();

  const parsed = updateSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const project = await db.clientProject.findUnique({ where: { id } });
  if (!project) {
    return { error: "Project not found." };
  }

  await db.projectUpdate.create({
    data: { clientProjectId: id, title: parsed.data.title, body: parsed.data.body },
  });

  const origin = await getStatusOrigin();
  await sendUpdateNotification({
    clientEmail: project.clientEmail,
    clientName: project.clientName,
    projectName: project.projectName,
    updateTitle: parsed.data.title,
    statusUrl: `${origin}/status/${project.statusToken}`,
  });

  revalidatePath(`/dashboard/client-projects/${id}`);
}
