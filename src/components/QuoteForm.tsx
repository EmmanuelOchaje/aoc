"use client";

import { useState, type FormEvent } from "react";
import { serviceLines } from "@/content/site";
import { buildWhatsAppUrl, type QuoteRequest } from "@/lib/whatsapp";

const EMPTY: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  serviceLine: "",
  origin: "",
  destination: "",
  weight: "",
  details: "",
};

/**
 * Collects a quote request and hands it to WhatsApp as a prefilled
 * message. Nothing is stored or sent server-side — the customer's
 * own WhatsApp does the delivering, so there is no backend to run
 * and no inbox to monitor beyond the phone AOC already uses.
 */
export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteRequest, string>>>({});

  function update(field: keyof QuoteRequest, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof QuoteRequest, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please tell us your name.";
    if (!values.phone.trim()) nextErrors.phone = "We need a number to reach you on.";
    if (!values.destination.trim()) nextErrors.destination = "Where is it going?";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    window.open(buildWhatsAppUrl(values), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <Field
          label="Phone number"
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />
        <Field
          label="Email address"
          type="email"
          optional
          value={values.email}
          onChange={(value) => update("email", value)}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="serviceLine" className="label">
            Service
          </label>
          <select
            id="serviceLine"
            value={values.serviceLine}
            onChange={(event) => update("serviceLine", event.target.value)}
            className="h-12 rounded-[var(--radius-tile)] border border-line bg-surface px-4 text-sm outline-none focus:border-ink"
          >
            <option value="">Not sure yet</option>
            {serviceLines.map((line) => (
              <option key={line.id} value={line.name}>
                {line.name}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Origin"
          optional
          value={values.origin}
          onChange={(value) => update("origin", value)}
        />
        <Field
          label="Destination"
          value={values.destination}
          error={errors.destination}
          onChange={(value) => update("destination", value)}
        />
        <Field
          label="Weight or volume"
          optional
          value={values.weight}
          onChange={(value) => update("weight", value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="details" className="label">
          What are you shipping? <span className="normal-case">(optional)</span>
        </label>
        <textarea
          id="details"
          rows={4}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          className="resize-y rounded-[var(--radius-tile)] border border-line bg-surface p-4 text-sm outline-none focus:border-ink"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-night"
      >
        Send on WhatsApp
      </button>

      <p className="text-sm text-muted">
        This opens WhatsApp with your details filled in. Nothing is sent until you
        press send there.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  optional = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  error?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label} {optional && <span className="normal-case">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-12 rounded-[var(--radius-tile)] border bg-surface px-4 text-sm outline-none focus:border-ink ${
          error ? "border-red-500" : "border-line"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
