"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} variant="outline" className="gap-1.5">
      <Printer className="size-4" /> Save as PDF / Print
    </Button>
  );
}
