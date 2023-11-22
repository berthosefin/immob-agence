"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const LoginForm = dynamic(() => import("../../components/login-form"), {
  ssr: false,
});

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <>
      <section>
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
          <div className="relative mt-8 sm:mt-12">
            <h1 className="text-center text-2xl font-bold">Se connecter</h1>
          </div>
          <div className="py-8 sm:px-24 sm:py-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
