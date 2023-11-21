import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  return (
    <Button
      onClick={async () => {
        await signOut();
      }}
      variant="ghost"
      size="icon"
      className="w-full md:w-10 justify-start md:justify-center md:hover:bg-accent hover:bg-background hover:font-bold"
    >
      <span className="md:hidden">Se connecter</span>
      <LogOut size={16} className="hidden md:block" />
    </Button>
  );
};
