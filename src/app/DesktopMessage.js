import { Smartphone } from "lucide-react";

export default function DesktopMessage() {
  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center gap-8 px-8 overflow-hidden">
      <Smartphone className="w-24 h-24 text-white" strokeWidth={1.5} />

      <h1 className="select-none text-4xl md:text-5xl lg:text-5xl text-center text-white font-medium max-w-4xl leading-tight">
        This application is currently only available on mobile devices.
      </h1>
    </div>
  );
}
