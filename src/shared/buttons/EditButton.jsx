"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditButton({ onClick, label, className = "" }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`text-gray-600 hover:text-blue-600 ${className}`}
    >
      <Pencil className="w-4 h-4" />
      {label ? (
        <span className="ml-2 text-sm font-medium">{label}</span>
      ) : null}
    </Button>
  );
}
