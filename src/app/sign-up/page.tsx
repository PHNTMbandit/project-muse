"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signup } from "./action";
import { SignUpFormData } from "@/types/form-data";
import { FaUser, FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { BentoBox } from "@/components/bento-box";
import { RxReload } from "react-icons/rx";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export default function SignUpPage() {
  const [loading, setloading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    setloading(true);
    signup(data);
  }

  return (
    <section className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col lg:flex-row gap-4 w-1/2">
        <BentoBox className="bg-accent-blue basis-1/3 flex justify-center items-center">
          <Logo />
        </BentoBox>
        <div className="basis-2/3 flex flex-col gap-4">
          <BentoBox
            className="bg-accent-purple basis-4/5"
            header="Let's get you started...">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          icon={FaUser}
                          type={"username"}
                          placeholder="Username"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="true"
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
                          autoComplete="true"
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          icon={FaLock}
                          type={"password"}
                          placeholder="Confirm Password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p>
                  Already have an account?{" "}
                  <Link
                    href={"/log-in"}
                    className="font-bold hover:underline">
                    Log In
                  </Link>
                </p>
                {loading ? (
                  <Button
                    disabled
                    className="w-full">
                    <RxReload className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full">
                    <p className="font-bold uppercase">Sign Up</p>
                  </Button>
                )}
              </form>
            </Form>
          </BentoBox>
          <BentoBox className="bg-accent-blue basis-1/5"></BentoBox>
        </div>
      </div>
    </section>
  );
}
