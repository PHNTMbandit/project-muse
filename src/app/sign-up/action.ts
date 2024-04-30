"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SignUpFormData } from "@/types/form-data";

export async function signup(formData: SignUpFormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
      },
    },
  });

  if (error) {
    console.error(error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/discover");
}
