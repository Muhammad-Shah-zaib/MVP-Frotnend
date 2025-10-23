"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = ({ className = "" }) => {
  const router = useRouter();

  const handleBack = () => {
    try {
      const ref = document.referrer || "";
      const hasReferrer = ref !== "";
      const sameOriginReferrer =
        hasReferrer && new URL(ref).origin === location.origin;

      if (sameOriginReferrer && window.history.length > 1) {
        router.back();
        return;
      }
    } catch (e) {
      console.error("Error handling back navigation:", e);
    }

    router.push("/chat");
  };

  return (
    <Button
      type="button"
      onClick={handleBack}
      variant="outline"
      size="icon"
      aria-label="Go back"
      className={`bg-gray-200 hover:bg-gray-300 rounded-full`}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
};

export default BackButton;
