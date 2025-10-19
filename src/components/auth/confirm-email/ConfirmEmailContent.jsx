import { ResendEmailButton } from "./ResendEmailButton";

export function ConfirmEmailContent({ email }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        We&apos;ve sent a confirmation email to{" "}
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{email}</span>.
        Please check your inbox and click on the link to confirm your email before moving forward.
      </p>

      <ResendEmailButton email={email} />
    </div>
  );
}
