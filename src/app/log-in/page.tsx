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
import { BentoBox } from "@/components/bento-box";
import { FaLock } from "react-icons/fa";
import { Logo } from "@/components/logo";
import { MdAlternateEmail } from "react-icons/md";

const logInFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
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
    <div className="grid grid-cols-subgrid col-span-6 row-span-2 row-start-2 col-start-3">
      <BentoBox className="bg-accent-purple flex justify-center items-center col-span-2">
        <Logo />
      </BentoBox>
      <BentoBox className="flex flex-col justify-center gap-4 col-span-4 bg-accent-blue ">
        <h2>Welcome Back!</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      icon={MdAlternateEmail}
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
                      icon={FaLock}
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
            <p className="pt-4">
              New here?{" "}
              <Link
                href={"/sign-up"}
                className="font-bold hover:underline">
                Sign Up
              </Link>
            </p>
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
                <p className="font-bold uppercase">Log In</p>
              </Button>
            )}
          </form>
        </Form>
      </BentoBox>
    </div>
  );
}
