"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientProjectAction } from "@/lib/actions/client-project-actions";

export function ClientProjectForm() {
  const [state, formAction, pending] = useActionState(createClientProjectAction, undefined);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="projectName">Project name</Label>
        <Input id="projectName" name="projectName" placeholder="Acme Inc. — Website Rebuild" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clientName">Client name</Label>
        <Input id="clientName" name="clientName" placeholder="Jane Cooper" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clientEmail">Client email</Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          type="email"
          placeholder="jane@acme.com"
          required
        />
        <p className="text-xs text-muted-foreground">
          Update notifications go here — no account or password needed.
        </p>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Creating..." : "Create & generate status link"}
      </Button>
    </form>
  );
}
