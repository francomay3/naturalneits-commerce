"use client";

// TODO: a Hero image would be nice here too

import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text, TextInput, Textarea, Title } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
      <Title order={1} mb="20" ta="center">
        Contact Me
      </Title>
      <Text>
        Whether you have a question, a special request, or just want to say
        hello, I'd love to hear from you!
      </Text>

      {submitStatus === "success" && (
        <Box
          mb="24px"
          p="16px"
          bg="hsl(120, 50%, 95%)"
          bd="1px solid hsl(120, 50%, 80%)"
          bdrs="var(--border-radius)"
          c="hsl(120, 50%, 25%)"
        >
          Thank you for your message! I'll get back to you soon.
        </Box>
      )}

      {submitStatus === "error" && (
        <Box
          mb="24px"
          p="16px"
          bg="hsl(0, 50%, 95%)"
          bd="1px solid hsl(0, 50%, 80%)"
          bdrs="var(--border-radius)"
          c="hsl(0, 50%, 25%)"
        >
          Sorry, there was an error sending your message. Please try again.
        </Box>
      )}

      <Flex gap="24px" w="100%">
        <Box visibleFrom="md" style={{ flex: 1 }}>
          <Image
            src="/contact-image.webp"
            alt="Girl dress"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "var(--border-radius)",
            }}
          />
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "12px",
            border: `1px solid ${errors.name ? "hsl(0, 50%, 70%)" : "var(--background-color-darker)"}`,
            borderRadius: "var(--border-radius)",
            backgroundColor: "var(--background-color)",
            flex: 3,
          }}
        >
          {/* Honeypot field - hidden from users */}
          <TextInput
            hiddenFrom="xs"
            {...register("honeypot")}
            tabIndex={-1}
            autoComplete="off"
          />

          <TextInput
            label="Name *"
            id="name"
            {...register("name")}
            placeholder="Your name"
            error={Boolean(errors.name?.message)}
          />

          <TextInput
            label="Email *"
            type="email"
            id="email"
            {...register("email")}
            placeholder="your.email@example.com"
            error={Boolean(errors.email?.message)}
          />

          <TextInput
            label="Subject *"
            id="subject"
            {...register("subject")}
            placeholder="What is this about?"
            error={Boolean(errors.subject?.message)}
          />

          <Textarea
            label="Message *"
            id="message"
            rows={6}
            {...register("message")}
            placeholder="Tell us more about your inquiry..."
            error={Boolean(errors.message?.message)}
          />

          <Flex justify="flex-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Flex>
        </form>
      </Flex>
    </section>
  );
};

export default ContactPage;
