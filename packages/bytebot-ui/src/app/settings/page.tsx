"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/locales/translations";
import { CustomModel } from "@/types";

interface CustomModelFormState {
  provider: string;
  name: string;
  title: string;
  contextWindow: string;
}

const emptyFormState: CustomModelFormState = {
  provider: "",
  name: "",
  title: "",
  contextWindow: "",
};

export default function SettingsPage() {
  const { language, setLanguage, languages, t } = useTranslation();
  const [customModels, setCustomModels] = useState<CustomModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<CustomModelFormState>(emptyFormState);
  const [activeModel, setActiveModel] = useState<CustomModel | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = useMemo(() => Boolean(activeModel), [activeModel]);

  const loadCustomModels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/custom-models", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to load custom models (${response.status})`);
      }

      const data = (await response.json()) as CustomModel[];
      setCustomModels(data);
    } catch (error) {
      console.error("Failed to load custom models", error);
      setCustomModels([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomModels();
  }, []);

  const resetForm = () => {
    setFormState(emptyFormState);
    setActiveModel(null);
    setFormError(null);
  };

  const handleEdit = (model: CustomModel) => {
    setActiveModel(model);
    setFormState({
      provider: model.provider,
      name: model.name,
      title: model.title,
      contextWindow: model.contextWindow ? String(model.contextWindow) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (model: CustomModel) => {
    const confirmation = window.confirm(
      t("settings.customModels.deleteConfirmation", { title: model.title }),
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(`/api/custom-models/${model.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete custom model (${response.status})`);
      }

      setCustomModels((prev) => prev.filter((item) => item.id !== model.id));
      if (activeModel?.id === model.id) {
        resetForm();
      }
    } catch (error) {
      console.error("Failed to delete custom model", error);
    }
  };

  const handleFormChange = (key: keyof CustomModelFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!formState.name.trim() || !formState.title.trim()) {
      setFormError(t("settings.customModels.form.validation.required"));
      return;
    }

    const normalizedContextWindow = formState.contextWindow.trim();
    let contextWindow: number | undefined;

    if (normalizedContextWindow) {
      const parsed = Number(normalizedContextWindow);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        setFormError(t("settings.customModels.form.validation.contextWindow"));
        return;
      }
      contextWindow = Math.floor(parsed);
    }

    const payload = {
      provider: formState.provider.trim() || undefined,
      name: formState.name.trim(),
      title: formState.title.trim(),
      contextWindow,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        activeModel ? `/api/custom-models/${activeModel.id}` : "/api/custom-models",
        {
          method: activeModel ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to submit custom model (${response.status})`);
      }

      await loadCustomModels();
      resetForm();
    } catch (error) {
      console.error("Failed to submit custom model", error);
      setFormError(t("settings.customModels.form.validation.generic"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-bytebot-bronze-light-12">
              {t("settings.title")}
            </h1>
            <p className="text-bytebot-bronze-light-11 mt-2 text-sm">
              {t("settings.description")}
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.languageSection.title")}</CardTitle>
                <CardDescription>
                  {t("settings.languageSection.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full sm:w-72">
                    <SelectValue placeholder={t("common.language")} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((definition) => (
                      <SelectItem key={definition.code} value={definition.code}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {definition.nativeLabel}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {definition.label}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("settings.customModels.title")}</CardTitle>
                <CardDescription>
                  {t("settings.customModels.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form
                  className="mb-6 space-y-4 rounded-xl border border-dashed p-4"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="provider">
                        {t("settings.customModels.form.providerLabel")}
                      </Label>
                      <Input
                        id="provider"
                        value={formState.provider}
                        onChange={(event) =>
                          handleFormChange("provider", event.target.value)
                        }
                        placeholder={t(
                          "settings.customModels.form.providerPlaceholder",
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">
                        {t("settings.customModels.form.nameLabel")}
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formState.name}
                        onChange={(event) =>
                          handleFormChange("name", event.target.value)
                        }
                        placeholder={t(
                          "settings.customModels.form.namePlaceholder",
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">
                        {t("settings.customModels.form.titleLabel")}
                      </Label>
                      <Input
                        id="title"
                        required
                        value={formState.title}
                        onChange={(event) =>
                          handleFormChange("title", event.target.value)
                        }
                        placeholder={t(
                          "settings.customModels.form.titlePlaceholder",
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="contextWindow">
                        {t("settings.customModels.form.contextWindowLabel")}
                      </Label>
                      <Input
                        id="contextWindow"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formState.contextWindow}
                        onChange={(event) =>
                          handleFormChange(
                            "contextWindow",
                            event.target.value.replace(/[^0-9]/g, ""),
                          )
                        }
                        placeholder={t(
                          "settings.customModels.form.contextWindowPlaceholder",
                        )}
                      />
                    </div>
                  </div>
                  {formError && (
                    <p className="text-sm text-destructive">{formError}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                      {isEditing
                        ? t("settings.customModels.form.updateButton")
                        : t("settings.customModels.form.saveButton")}
                    </Button>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={resetForm}
                        disabled={isSubmitting}
                      >
                        {t("common.cancel")}
                      </Button>
                    )}
                  </div>
                </form>

                <div className="space-y-4">
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">
                      {t("common.loading")}
                    </p>
                  ) : customModels.length === 0 ? (
                    <p className="rounded-lg bg-bytebot-bronze-light-a2 p-4 text-sm text-muted-foreground">
                      {t("settings.customModels.empty")}
                    </p>
                  ) : (
                    customModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex flex-col justify-between gap-3 rounded-lg border border-bytebot-bronze-light-7 p-4 sm:flex-row sm:items-center"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-bytebot-bronze-light-12">
                            {model.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {model.name} · {model.provider}
                            {model.contextWindow
                              ? ` · ${t(
                                  "settings.customModels.contextWindowUnit",
                                  { value: model.contextWindow },
                                )}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(model)}
                          >
                            {t("common.edit")}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(model)}
                          >
                            {t("common.delete")}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
