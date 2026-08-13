"use client";

import { useState, type FormEvent } from "react";

const HELP_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "automation", label: "Workflow Automation" },
  { value: "ads", label: "Ad Campaign" },
];

type FormState = {
  name: string;
  email: string;
  help: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", help: "", details: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full rounded-lg border border-border bg-bg-raised px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.help) next.help = "Select what you need help with.";
    if (!form.details.trim()) next.details = "Tell us a bit about the project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    // [PLACEHOLDER] Not wired to a backend/API route/form service yet —
    // this only confirms client-side. Swap this for a real submit call
    // when that's ready.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-bg-raised px-6 py-12 text-center">
        <p className="font-heading text-xl font-semibold text-fg">
          Thanks, we&rsquo;ll be in touch.
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          [PLACEHOLDER] This form isn&rsquo;t connected to anything yet, nothing was sent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 text-left">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClasses}
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="mt-1.5 text-sm text-accent">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={inputClasses}
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="mt-1.5 text-sm text-accent">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="help" className="mb-2 block text-sm font-medium text-fg">
          What do you need help with?
        </label>
        <select
          id="help"
          value={form.help}
          onChange={(e) => updateField("help", e.target.value)}
          className={inputClasses}
          aria-invalid={Boolean(errors.help)}
        >
          <option value="" disabled>
            Select one
          </option>
          {HELP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.help && <p className="mt-1.5 text-sm text-accent">{errors.help}</p>}
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block text-sm font-medium text-fg">
          Project details
        </label>
        <textarea
          id="details"
          rows={5}
          value={form.details}
          onChange={(e) => updateField("details", e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder="What are you building, and what does success look like?"
          aria-invalid={Boolean(errors.details)}
        />
        {errors.details && <p className="mt-1.5 text-sm text-accent">{errors.details}</p>}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent/90"
      >
        Submit
      </button>
    </form>
  );
}
