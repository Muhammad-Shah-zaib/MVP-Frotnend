"use client";

import { useActionState } from "react";
import { FullnameInput } from "@/shared/inputs/FullnameInput";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { completeProfileAction } from "@/actions/auth/complete-profile";

const initialState = {
  errors: {},
  success: false,
  values: {},
};

export function CompleteProfileForm({ email = "" }) {
  const [formState, action] = useActionState(completeProfileAction, initialState);
  const errors = formState?.errors || {};
  const values = formState?.values || {};

  return (
    <form action={action} className="flex flex-col gap-5">
      {errors?.root && (
        <div className="text-sm text-red-500 text-center">{errors.root[0]}</div>
      )}
      <div>
        <FullnameInput name="fullName" defaultValue={values.fullName || ""} />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
            <Mail className="h-4 w-4" />
          </span>
          <Input
            type="email"
            name="email"
            value={email}
            disabled
            className={cn(
              "w-full rounded-md border border-zinc-300 bg-zinc-50 text-zinc-900 pl-10 pr-24",
              "dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100",
              "cursor-not-allowed"
            )}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <CheckCircle2 className="h-3 w-3" />
          </div>
        </div>
      </div>
      <SubmitButton
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
        label="Complete Profile"
        loadingLabel="Saving..."
      />
    </form>
  );
}
