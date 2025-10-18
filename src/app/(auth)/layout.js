export default function AuthLayout({ children }) {
  return (
    <div className="w-screen min-h-[80vh] h-full flex items-center justify-center">
      {/* Mobile First */}
      <div className="max-w-[400px]"> 
        <div>{children}</div>
      </div>
    </div>
  );
}