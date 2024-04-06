"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RxReload } from "react-icons/rx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "./action";
import { LogInFormData } from "@/types/form-data";
import { useState } from "react";
import Link from "next/link";

const logInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LogInPage() {
  const [loading, setloading] = useState(false);

  const form = useForm<LogInFormData>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LogInFormData) {
    setloading(true);
    login(data);
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-3/4 border p-6 rounded-xl">
          <div>
            <h2>Log In</h2>
            <p>
              New user? <Link href={"/sign-up"}>Sign Up</Link>
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={"email"}
                    placeholder="Email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Password"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <Button
              disabled
              className="w-full">
              <RxReload className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full">
              Log In
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
