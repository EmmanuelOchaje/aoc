"use client";

import { useRef, useState, type FormEvent } from "react";
import { carriers, shipmentTypes } from "@/content/site";
import { buildWhatsAppUrl, type QuoteRequest } from "@/lib/whatsapp";

const EMPTY: QuoteRequest = {
  name: "",
  phone: "",
  email: "",
  type: shipmentTypes[0],
  origin: "",
  destination: "",
  weight: "",
  carrier: carriers[0],
  description: "",
};

/**
 * Collects a quote request and hands it to WhatsApp as a prefilled
 * message. Nothing is stored or sent server-side.
 */
export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof QuoteRequest>(field: K, value: QuoteRequest[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(buildWhatsAppUrl(values), "_blank", "noopener");
    setMessage(
      "Opening WhatsApp with your details. If it does not open, call the number on the left."
    );
    formRef.current?.reset();
    setValues(EMPTY);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-[var(--radius-tile)] bg-surface p-5 sm:p-7"
    >
      <Field
        label="Full name"
        required
        value={values.name}
        onChange={(v) => update("name", v)}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Phone"
          type="tel"
          required
          value={values.phone}
          onChange={(v) => update("phone", v)}
        />
        <Field label="Email" type="email" value={values.email} onChange={(v) => update("email", v)} />
      </div>

      <SelectField
        label="Shipment type"
        value={values.type}
        options={shipmentTypes}
        onChange={(v) => update("type", v)}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Origin" value={values.origin} onChange={(v) => update("origin", v)} />
        <Field
          label="Destination"
          value={values.destination}
          onChange={(v) => update("destination", v)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Weight (kg)"
          type="number"
          value={values.weight}
          onChange={(v) => update("weight", v)}
        />
        <SelectField
          label="Carrier"
          value={values.carrier}
          options={carriers}
          onChange={(v) => update("carrier", v)}
        />
      </div>

      <label className="grid gap-1.5 text-xs font-semibold text-muted">
        What are you sending?
        <textarea
          rows={3}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className="w-full resize-y rounded-lg border border-line bg-canvas p-3.5 text-sm text-ink outline-none focus:border-ink"
        />
      </label>

      <button
        type="submit"
        className="inline-flex min-h-[50px] items-center justify-center self-start rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-[#33383D]"
      >
        Send my details
      </button>
      <p className="min-h-[18px] text-[13px] text-muted">{message}</p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-muted">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[46px] w-full min-w-0 rounded-lg border border-line bg-canvas px-3.5 text-sm text-ink outline-none focus:border-ink"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-muted">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[46px] w-full min-w-0 rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-ink"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
