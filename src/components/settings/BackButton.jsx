"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = ({ className = "" }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
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
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
};

export default BackButton;
