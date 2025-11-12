"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { renameSession } from "@/actions/chat/rename-session";

const SessionRenameDialog = ({
  sessionId,
  currentTitle,
  trigger,
  open,
  onOpenChange,
}) => {
  const [state, formAction] = useActionState(renameSession, null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
      formRef.current?.reset();
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white border border-gray-200">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-lg font-semibold text-gray-900 text-left">
                Rename Session
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 text-left leading-relaxed">
                Update the name of your session to help you organize your
                conversations.
              </DialogDescription>
            </div>
          </div>

          <form ref={formRef} action={formAction} className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <input type="hidden" name="sessionId" value={sessionId} />
            
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Session Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                variant="outline"
                defaultValue={currentTitle}
                placeholder="Enter session title"
                required
                className="w-full"
                autoFocus
              />
              {state?.error && (
                <p className="text-sm text-red-600">{state.error}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenChange(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <SubmitButton
                label="Rename"
                loadingLabel="Renaming..."
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionRenameDialog;
