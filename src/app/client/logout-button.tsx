"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutClientAction } from "@/lib/client-portal/actions";

export function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logoutClientAction();
          router.push("/signin");
          router.refresh();
        })
      }
    >
      {pending ? "Logging out..." : "Log out"}
    </Button>
  );
}
