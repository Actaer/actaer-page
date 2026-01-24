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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

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
      <Card className={compact ? "border-0 shadow-none" : ""}>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("success.title")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("success.description")}
            </p>
            <Button variant="outline" onClick={handleReset}>
              {t("success.sendAnother")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      {!compact && (
        <CardHeader>
          <CardTitle className="text-2xl font-heading">
            {title || t("formTitle")}
          </CardTitle>
          <CardDescription>
            {description || t("formDescription")}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={compact ? "p-0" : ""}>
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
                className={errors.name ? "border-destructive" : ""}
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
                className={errors.email ? "border-destructive" : ""}
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("form.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("form.phonePlaceholder")}
                {...register("phone")}
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
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {(errors.root || submitError) && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
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
      </CardContent>
    </Card>
  );
}
