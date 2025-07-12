"use client";

// TODO: this was completely AI generated. I need to refactor it cause its kinda messy.
// TODO: a Hero image would be nice here too

import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Invalid submission detected"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const SuccessCard = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: hsl(120, 50%, 95%);
  border: 1px solid hsl(120, 50%, 80%);
  border-radius: var(--border-radius);
  color: hsl(120, 50%, 25%);
`;

const ErrorCard = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: hsl(0, 50%, 95%);
  border: 1px solid hsl(0, 50%, 80%);
  border-radius: var(--border-radius);
  color: hsl(0, 50%, 25%);
`;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        const errorData = await response.json();
        console.error("Contact form error:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h1 style={{ marginBottom: "20px" }}>Contact Me</h1>
      <p>
        Whether you have a question, a special request, or just want to say
        hello, I'd love to hear from you!
      </p>

      {submitStatus === "success" && (
        <SuccessCard>
          Thank you for your message! I'll get back to you soon.
        </SuccessCard>
      )}

      {submitStatus === "error" && (
        <ErrorCard>
          Sorry, there was an error sending your message. Please try again.
        </ErrorCard>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {/* Honeypot field - hidden from users */}
        <div style={{ display: "none" }}>
          <input
            type="text"
            {...register("honeypot")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--font-color)",
                marginBottom: "8px",
              }}
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              style={{
                width: "100%",
                padding: "12px",
                border: `1px solid ${errors.name ? "hsl(0, 50%, 70%)" : "var(--secondary-background-color)"}`,
                borderRadius: "var(--border-radius)",
                backgroundColor: "var(--background-color)",
                color: "var(--font-color)",
                fontSize: "15px",
              }}
              placeholder="Your name"
            />
            {errors.name && (
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "hsl(0, 50%, 50%)",
                }}
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--font-color)",
                marginBottom: "8px",
              }}
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              style={{
                width: "100%",
                padding: "12px",
                border: `1px solid ${errors.email ? "hsl(0, 50%, 70%)" : "var(--secondary-background-color)"}`,
                borderRadius: "var(--border-radius)",
                backgroundColor: "var(--background-color)",
                color: "var(--font-color)",
                fontSize: "15px",
              }}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "hsl(0, 50%, 50%)",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--font-color)",
              marginBottom: "8px",
            }}
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            style={{
              width: "100%",
              padding: "12px",
              border: `1px solid ${errors.subject ? "hsl(0, 50%, 70%)" : "var(--secondary-background-color)"}`,
              borderRadius: "var(--border-radius)",
              backgroundColor: "var(--background-color)",
              color: "var(--font-color)",
              fontSize: "15px",
            }}
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "hsl(0, 50%, 50%)",
              }}
            >
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--font-color)",
              marginBottom: "8px",
            }}
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            style={{
              width: "100%",
              padding: "12px",
              border: `1px solid ${errors.message ? "hsl(0, 50%, 70%)" : "var(--secondary-background-color)"}`,
              borderRadius: "var(--border-radius)",
              backgroundColor: "var(--background-color)",
              color: "var(--font-color)",
              fontSize: "15px",
              resize: "vertical",
            }}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "hsl(0, 50%, 50%)",
              }}
            >
              {errors.message.message}
            </p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContactPage;
