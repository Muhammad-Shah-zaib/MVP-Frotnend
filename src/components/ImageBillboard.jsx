"use client";

import { useRef } from "react";
import { useImageBillboardStore } from "@/store/imageBillboard/imageBillboardStore";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getArtworkInfo, formatArtistName } from "@/utils/artworkInfo";

export default function ImageBillboard() {
  const { isOpen, setIsOpen, imagePath } = useImageBillboardStore();
  const imageRef = useRef(null);

  const artworkInfo = getArtworkInfo(imagePath);
  const artistName = formatArtistName(artworkInfo);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl w-full p-4">
        <DialogTitle>{artistName || "Artwork"}</DialogTitle>
        <DialogDescription className={`hidden`}>Artwork preview in full size.</DialogDescription>
        <div className="flex flex-col items-center">
          {imagePath && (
            <img
              ref={imageRef}
              src={imagePath}
              alt="Gallery artwork"
              className="rounded max-h-[60vh] object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
