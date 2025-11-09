export default function AuthLayout({ children }) {
  return (
    <div className="w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Mobile First */}
      <div className="max-w-[400px] w-full px-2">
        <div>{children}</div>
      </div>
    </div>
  );
}
