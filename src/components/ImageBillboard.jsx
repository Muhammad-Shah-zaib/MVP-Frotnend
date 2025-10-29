"use client";

import { useRef } from "react";
import { useImageBillboardStore } from "@/store/imageBillboard/imageBillboardStore";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const IMAGE_URL =
  "https://axhilbtjftwiyvduuvlx.supabase.co/storage/v1/object/public/sample_images/artwork_images/schiele-herbert-rainer-psychological-line.gif";

export default function ImageBillboard() {
  const { isOpen, setIsOpen } = useImageBillboardStore();
  const imageRef = useRef(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl w-full p-4">
        <DialogTitle>Artist Name</DialogTitle>
        <DialogDescription className={`hidden`}>Artwork preview in full size.</DialogDescription>
        <div className="flex flex-col items-center">
          <img
            ref={imageRef}
            src={IMAGE_URL}
            alt="Gallery artwork"
            className="rounded max-h-[60vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
