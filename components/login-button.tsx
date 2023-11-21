import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
      variant="ghost"
      size="icon"
      className="w-full md:w-10 justify-start md:justify-center md:hover:bg-accent hover:bg-background hover:font-bold"
    >
      <span className="md:hidden">Se connecter</span>
      <LogIn size={16} className="hidden md:block" />
    </Button>
  );
};
