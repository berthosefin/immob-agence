import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button
      onClick={async () => {
        await signOut();
      }}
    >
      Login
    </Button>
  );
};
