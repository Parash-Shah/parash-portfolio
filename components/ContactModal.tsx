"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ContactFields = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  website: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;
type SubmitState = "idle" | "sending" | "success" | "error";

const initialFields: ContactFields = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

const ContactContext = createContext<{ openContact: () => void } | null>(null);

function validate(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fields.name.trim()) errors.name = "Please enter your name.";
  else if (fields.name.trim().length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!fields.email.trim()) errors.email = "Please enter your email address.";
  else if (fields.email.length > 254 || !emailPattern.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (fields.company.trim().length > 120) {
    errors.company = "Company must be 120 characters or fewer.";
  }

  if (!fields.subject.trim()) errors.subject = "Please add a subject.";
  else if (fields.subject.trim().length > 160) {
    errors.subject = "Subject must be 160 characters or fewer.";
  }

  if (!fields.message.trim()) errors.message = "Please enter a message.";
  else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (fields.message.trim().length > 5000) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }

  return errors;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} />
    </ContactContext.Provider>
  );
}

export function ContactTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(ContactContext);

  if (!context) throw new Error("ContactTrigger must be used inside ContactProvider.");

  return (
    <button className={className} type="button" onClick={context.openContact}>
      {children}
    </button>
  );
}

export function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), a[href]',
        ),
      );

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  function updateField(field: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitState === "error") {
      setSubmitState("idle");
      setSubmitError("");
    }
  }

  function closeModal() {
    onClose();
    if (submitState === "success") {
      window.setTimeout(() => {
        setFields(initialFields);
        setErrors({});
        setSubmitState("idle");
      }, 250);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      const firstInvalidName = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
      return;
    }

    submittingRef.current = true;
    setSubmitState("sending");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitError("Your message could not be sent right now. Please try again in a moment.");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <div
      className={`contact-modal${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        className="contact-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        aria-describedby="contact-description"
      >
        <div className="contact-glow" aria-hidden="true" />
        <button className="contact-close" type="button" onClick={closeModal} aria-label="Close contact form">
          <span aria-hidden="true">×</span>
        </button>

        {submitState === "success" ? (
          <div className="contact-success" role="status">
            <span className="contact-success__icon" aria-hidden="true">✓</span>
            <p className="kicker">Message received</p>
            <h2 id="contact-title">Thanks for reaching out.</h2>
            <p id="contact-description">
              Message sent successfully. Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
            <button className="button" type="button" onClick={closeModal}>Close</button>
          </div>
        ) : (
          <>
            <div className="contact-heading">
              <p className="kicker">Start a conversation</p>
              <h2 id="contact-title">Contact Me</h2>
              <p id="contact-description">
                Tell me what you&apos;re building, hiring for, or thinking through. I&apos;ll reply directly to the email you provide.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-field-row">
                <ContactField
                  label="Name"
                  name="name"
                  value={fields.name}
                  error={errors.name}
                  required
                  maxLength={100}
                  autoComplete="name"
                  inputRef={nameRef}
                  onChange={(value) => updateField("name", value)}
                />
                <ContactField
                  label="Email"
                  name="email"
                  type="email"
                  value={fields.email}
                  error={errors.email}
                  required
                  maxLength={254}
                  autoComplete="email"
                  onChange={(value) => updateField("email", value)}
                />
              </div>

              <ContactField
                label="Company / Organization"
                name="company"
                value={fields.company}
                error={errors.company}
                maxLength={120}
                autoComplete="organization"
                onChange={(value) => updateField("company", value)}
              />

              <ContactField
                label="Subject"
                name="subject"
                value={fields.subject}
                error={errors.subject}
                required
                maxLength={160}
                onChange={(value) => updateField("subject", value)}
              />

              <label className="contact-field">
                <span>Message <b aria-hidden="true">*</b></span>
                <textarea
                  name="message"
                  value={fields.message}
                  required
                  maxLength={5000}
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(event) => updateField("message", event.target.value)}
                />
                {errors.message && <small className="contact-error" id="message-error">{errors.message}</small>}
              </label>

              <label className="contact-honeypot" aria-hidden="true">
                Website
                <input
                  name="website"
                  value={fields.website}
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </label>

              {submitError && <div className="contact-submit-error" role="alert">{submitError}</div>}

              <div className="contact-form__footer">
                <p>
                  Prefer email? <a href="mailto:parash5301@yahoo.com">Use the fallback address</a>.
                </p>
                <button className="button contact-submit" type="submit" disabled={submitState === "sending"}>
                  {submitState === "sending" ? "Sending…" : submitState === "error" ? "Try again" : "Send message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ContactField({
  label,
  name,
  value,
  error,
  type = "text",
  required = false,
  maxLength,
  autoComplete,
  inputRef,
  onChange,
}: {
  label: string;
  name: keyof ContactFields;
  value: string;
  error?: string;
  type?: string;
  required?: boolean;
  maxLength: number;
  autoComplete?: string;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
}) {
  const errorId = `${name}-error`;

  return (
    <label className="contact-field">
      <span>{label} {required && <b aria-hidden="true">*</b>}</span>
      <input
        ref={inputRef}
        name={name}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <small className="contact-error" id={errorId}>{error}</small>}
    </label>
  );
}
