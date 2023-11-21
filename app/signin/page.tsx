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
      <section className="flex min-h-full overflow-hidden pt-8 sm:py-16">
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
          <div className="relative mt-8 sm:mt-12">
            <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900">
              Se connecter
            </h1>
          </div>
          <div className="sm:rounded-5xl -mx-4 mt-2 flex-auto bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
