"use client";

import { useSubmit } from "@formspree/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "h-10 border-0 border-b border-(--ink-subtle) bg-muted px-4 focus-visible:border-b-2 focus-visible:border-primary focus-visible:ring-0";

const textareaClasses =
  "border-0 border-b border-(--ink-subtle) bg-muted px-4 py-3 focus-visible:border-b-2 focus-visible:border-primary focus-visible:ring-0";

type FormData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

interface ContactFormProps {
  formspreeId?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function ContactForm({
  formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "your-form-id",
  title,
  description,
  compact = false,
}: ContactFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const t = useTranslations("contact");
  const tValidation = useTranslations("validation");

  // Create schema with translated error messages
  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tValidation("nameMin")),
        email: z.string().email(tValidation("emailInvalid")),
        company: z.string().optional(),
        phone: z.string().optional(),
        message: z.string().min(10, tValidation("messageMin")),
      }),
    [tValidation],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const formspreeSubmit = useSubmit<FormData>(formspreeId);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const result = await formspreeSubmit(data);
      // Check if submission failed
      if (result && "error" in result && result.error) {
        setSubmitError(t("errors.submit"));
      } else {
        setSubmitSuccess(true);
      }
    } catch {
      setSubmitError(t("errors.unexpected"));
    }
  };

  const handleReset = () => {
    reset();
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  if (submitSuccess) {
    return (
      <div
        className={compact ? "" : "border border-border bg-background p-6 md:p-8"}
      >
        <div className="py-8">
          <CheckCircle className="mb-4 size-8 text-primary" />
          <h3 className="text-body-lg mb-2 font-semibold">
            {t("success.title")}
          </h3>
          <p className="mb-6 text-muted-foreground">
            {t("success.description")}
          </p>
          <Button variant="outline" onClick={handleReset}>
            {t("success.sendAnother")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={compact ? "" : "border border-border bg-background p-6 md:p-8"}
    >
      {!compact && (
        <div className="mb-8 space-y-2">
          <h2 className="text-headline">{title || t("formTitle")}</h2>
          <p className="text-sm text-muted-foreground">
            {description || t("formDescription")}
          </p>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("form.name")}{" "}
                <span className="text-destructive">{t("form.required")}</span>
              </Label>
              <Input
                id="name"
                placeholder={t("form.namePlaceholder")}
                {...register("name")}
                className={cn(
                  fieldClasses,
                  errors.name && "border-b-destructive",
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t("form.email")}{" "}
                <span className="text-destructive">{t("form.required")}</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("form.emailPlaceholder")}
                {...register("email")}
                className={cn(
                  fieldClasses,
                  errors.email && "border-b-destructive",
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">{t("form.company")}</Label>
              <Input
                id="company"
                placeholder={t("form.companyPlaceholder")}
                {...register("company")}
                className={fieldClasses}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("form.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("form.phonePlaceholder")}
                {...register("phone")}
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {t("form.message")}{" "}
              <span className="text-destructive">{t("form.required")}</span>
            </Label>
            <Textarea
              id="message"
              placeholder={t("form.messagePlaceholder")}
              rows={5}
              {...register("message")}
              className={cn(
                textareaClasses,
                errors.message && "border-b-destructive",
              )}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {(errors.root || submitError) && (
            <div className="border border-destructive/20 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">
                {submitError || t("errors.general")}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("form.submitting")}
              </>
            ) : (
              t("form.submit")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
