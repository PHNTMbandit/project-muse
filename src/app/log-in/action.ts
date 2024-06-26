"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogInFormData } from "@/types/form-data";

export async function login(formData: LogInFormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/discover");
}
