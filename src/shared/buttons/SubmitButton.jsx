"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { PrimaryButton } from "./PrimaryButton"

export function SubmitButton({
  label = "Submit",
  loadingLabel = "Submitting...",
  className,
}) {
  const { pending } = useFormStatus()

  return (
    <PrimaryButton type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </PrimaryButton>
  )
}