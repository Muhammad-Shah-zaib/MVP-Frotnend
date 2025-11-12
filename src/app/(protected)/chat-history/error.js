"use client";

import { Separator } from "@/components/ui/separator";
import MenuButton from "@/shared/buttons/MenuButton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <section id="chat-history-ctn" className="h-[90vh] w-full p-4 px-6 space-y-4">
      <div className="flex items-center gap-4 text-gray-700">
        <MenuButton />
        <span className="text-3xl font-semibold">Chat History</span>
      </div>

      <Separator />

      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="w-16 h-16 text-gray-400" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-600">
            Unable to load chat history. Please try again.
          </p>
        </div>
        <Button onClick={() => reset()} className="mt-2">
          Try Again
        </Button>
      </div>
    </section>
  );
}
