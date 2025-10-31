"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" />

      <div className="relative flex items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
