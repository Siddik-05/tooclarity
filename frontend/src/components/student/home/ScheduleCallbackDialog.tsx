"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  _Dialog,
  _DialogContent,
  _DialogHeader,
  _DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/components/ui/InputField";
import { useUserStore } from "@/lib/user-store";
// import Image from "next/image";

export interface DialogContentConfig {
  title?: string;
  description?: string;
  inputLabel?: string;
  placeholder?: string;
  submitLabel?: string;
  inputType?: React.HTMLInputTypeAttribute;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email"
    | "search"
    | "url";
  fieldName?: keyof CallbackFormData | (string & {});
  value?: string | null;
  validator?: (value: string) => string | undefined;
}

interface ScheduleCallbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CallbackFormData) => void;
  contentConfig?: DialogContentConfig;
  collectEmailAndPhone?: boolean;
}

export interface CallbackFormData {
  userName?: string;
  phoneNumber?: string;
  email?: string;
  [key: string]: string | undefined;
}

export const ScheduleCallbackDialog: React.FC<ScheduleCallbackDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  contentConfig,
  collectEmailAndPhone = false,
}) => {
  const { user } = useUserStore();
  const defaultConfig = useMemo<DialogContentConfig>(
    () => ({
      title: "Verify your phone number",
      inputLabel: "Phone Number",
      placeholder: "9398******",
      submitLabel: "Submit",
      inputType: "tel",
      inputMode: "numeric",
      fieldName: "phoneNumber",
      value: null,
      validator: (value: string) => {
        const sanitized = value.replace(/[^0-9]/g, "");
        if (!/^[0-9]{10}$/.test(sanitized)) {
          return "Please enter a valid 10-digit phone number";
        }
      },
    }),
    []
  );

  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...contentConfig }),
    [defaultConfig, contentConfig]
  );
  const activeField = mergedConfig.fieldName || "phoneNumber";
  const isDualMode = collectEmailAndPhone;

  const [formData, setFormData] = useState<CallbackFormData>({
    userName: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<CallbackFormData>({
    userName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (isDualMode) {
      setInitialValues({ userName: "", phoneNumber: "", email: "" });
      setFormData({
        userName: "",
        phoneNumber: "",
        email: "",
      });
    } else {
      const nextInitial =
        mergedConfig.value !== undefined && mergedConfig.value !== null
          ? String(mergedConfig.value)
          : "";

      setInitialValues((prev) => ({
        ...prev,
        [activeField]: nextInitial,
      }));
      setFormData((prev) => ({
        ...prev,
        [activeField]: nextInitial,
      }));
    }
    setErrors({});
  }, [open, mergedConfig.value, activeField, isDualMode]);

  const validateForm = (): boolean => {
    if (isDualMode) {
      const nextErrors: Record<string, string> = {};
      const phoneValue = (formData.phoneNumber || "").trim();
      const emailValue = (formData.email || "").trim();

      if (!phoneValue && !emailValue) {
        nextErrors.phoneNumber = "Enter phone or email";
        setErrors(nextErrors);
        return false;
      }

      if (phoneValue && defaultConfig.validator) {
        const phoneError = defaultConfig.validator(phoneValue);
        if (phoneError) {
          nextErrors.phoneNumber = phoneError;
        }
      }

      if (emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          nextErrors.email = "Please enter a valid email address";
        }
      }

      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }

    const value = (formData[activeField] || "").trim();
    let errorMessage: string | undefined;

    if (!value) {
      errorMessage = `${mergedConfig.inputLabel || "This field"} is required`;
    } else if (mergedConfig.validator) {
      errorMessage = mergedConfig.validator(value);
    }

    setErrors(errorMessage ? { [activeField]: errorMessage } : {});
    return !errorMessage;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const resetFormState = () => {
    setFormData({
      userName: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    setInitialValues({
      userName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetFormState();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("formData", formData);

    try {
      const payload: CallbackFormData = isDualMode
        ? {
            userName: (user?.name || "").trim() || undefined,
            phoneNumber: (formData.phoneNumber || "").trim() || undefined,
            email: (formData.email || "").trim() || undefined,
          }
        : {
            [activeField]: formData[activeField],
          };

      await onSubmit?.(payload);

      resetFormState();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting callback request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <_Dialog open={open} onOpenChange={handleDialogChange}>
      <_DialogContent
        className="w-[95vw] max-w-[400px] rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
        showCloseButton={true}
      >
        <div className="relative mb-6 flex flex-col items-center">
          <_DialogHeader className="w-full text-center">
            <_DialogTitle className="text-2xl font-semibold text-[#1a1a1a] md:text-[24px]">
              {mergedConfig.title}
            </_DialogTitle>
          </_DialogHeader>
          {/* {mergedConfig.description ? (
            <p className="mt-2 text-center text-sm text-[#5f5f5f]">
              {mergedConfig.description}
            </p>
          ) : null} */}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isDualMode ? (
            <>
              <div className="flex flex-col gap-2">
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  placeholder="9398******"
                  error={errors.phoneNumber}
                  inputMode="numeric"
                />
              </div>
              <div className="flex flex-col gap-2">
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  error={errors.email}
                  inputMode="email"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <InputField
                label={mergedConfig.inputLabel || "Phone Number"}
                name={String(activeField)}
                type={mergedConfig.inputType || "tel"}
                value={formData[activeField] || ""}
                onChange={handleChange}
                placeholder={mergedConfig.placeholder || "9398******"}
                required
                error={errors[activeField]}
                inputMode={mergedConfig.inputMode || "numeric"}
              />
            </div>
          )}

          <div className="mt-2">
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#0222D7] text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0119b8] hover:shadow-[0_4px_12px_rgba(2,34,215,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0222D7] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#0222D7] disabled:hover:shadow-none"
              disabled={
                isSubmitting ||
                (isDualMode
                  ? (formData.phoneNumber || "") === (initialValues.phoneNumber || "") &&
                    (formData.email || "") === (initialValues.email || "")
                  : (formData[activeField] || "") ===
                    (initialValues[activeField] || ""))
              }
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit"}
            </button>
          </div>
        </form>
      </_DialogContent>
    </_Dialog>
  );
};

export default ScheduleCallbackDialog;
