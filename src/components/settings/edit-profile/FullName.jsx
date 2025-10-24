"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateFullNameAction } from "@/actions/profile/update-full-name";
import { useActionState, useState, useEffect } from "react";
import { EMPTY_STRING } from "@/constants/general";
import { Pencil, X } from "lucide-react";
import { SubmitButton } from "@/shared/buttons/SubmitButton";

const initialState = {
  success: false,
  errors: {},
  values: {},
  message: "",
};

const FullName = ({ initialFullName }) => {
  const [formState, formAction] = useActionState(updateFullNameAction, initialState);
  const [localErrors, setLocalErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(initialFullName || EMPTY_STRING);
  const [originalFullName, setOriginalFullName] = useState(initialFullName || EMPTY_STRING);

  useEffect(() => {
    if (formState.errors) setLocalErrors(formState.errors);
    if (formState.success) {
      setOriginalFullName(fullName);
      setIsEditing(false);
    }
  }, [formState, fullName]);

  const handleInputChange = (e) => {
    setFullName(e.target.value);
    if (localErrors.fullName) {
      setLocalErrors((prev) => {
        const { fullName, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCancel = () => {
    setFullName(originalFullName);
    setIsEditing(false);
    setLocalErrors({});
  };

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 transition-all duration-300"
    >
      {formState.success && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
          {formState.message}
        </div>
      )}
      {localErrors?.root && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          {localErrors.root[0]}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label className="text-lg text-gray-700 font-normal">Full Name:</Label>

        <div className="flex items-center gap-2 w-full max-w-md">
          <div className="relative flex-grow">
            <Input
              name="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`transition-all duration-300 pr-10 w-full`}
            />

            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Save button stays inline */}
          {isEditing && (
            <SubmitButton
              label="Save"
              loadingLabel="Saving..."
              className="h-9 px-4 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            />
          )}
        </div>

        {localErrors?.fullName && (
          <p className="text-sm text-red-500">{localErrors.fullName[0]}</p>
        )}
      </div>
    </form>
  );
};

export default FullName;
