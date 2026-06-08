"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-slate-200 bg-white px-4 py-3 text-body text-ink " +
  "placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 min-h-[48px]";

const labelClass = "mb-1.5 block text-small font-medium text-slate-700";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-green-50 p-10 text-center">
        <CheckCircle2 className="text-green-600" size={48} />
        <h3 className="mt-4 text-h3 font-bold text-blue-900">Message sent</h3>
        <p className="mt-2 max-w-sm text-body text-slate-700">
          Thank you for reaching out. Our team will get back to you within two business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-blue-600 hover:text-green-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[var(--radius-lg)] bg-white p-6 shadow-card md:p-8" noValidate>
      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-danger">*</span>
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-danger">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+94 7X XXX XXXX" />
        </div>
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation
          </label>
          <input id="organisation" name="organisation" className={inputClass} placeholder="Company (optional)" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input id="subject" name="subject" className={inputClass} placeholder="How can we help?" />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your enquiry…"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-small font-medium text-danger">
          {error}
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="mt-3 text-xs text-slate-500">
          We typically respond within two business days.
        </p>
      </div>
    </form>
  );
}
