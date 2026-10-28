import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { portfolioData } from "../data/kishandata";
import { useToast } from "../hooks/use-toast";
import { useReveal } from "../hooks/useReveal";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { personal } = portfolioData;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const serviceId = "service_8hjc37a";
    const templateId = "template_l64wy22";
    const publicKey = "H8P4OdLra6PfJ5V_t";
    emailjs
      .sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          toast({
            title: "Message Sent!",
            description:
              "Thank you for reaching out. I'll get back to you soon.",
          });
          formRef.current.reset();
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log(error);
          toast({
            title: "Message Sent Failed!!",
            description:
              "Try again later or use another method for contact",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
      description: "Available for calls",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personal.location,
      description: "Based in India",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: personal.github,
      label: "GitHub",
      username: "kishanghosh090",
    },
    {
      icon: Linkedin,
      href: personal.linkedin,
      label: "LinkedIn",
      username: "Kishan Rana Ghosh",
    },
    {
      icon: SiLeetcode,
      href: personal.leetcode,
      label: "LeetCode",
      username: "KishanRanaGhosh2005",
    },
  ];

  const { ref, isVisible, isReady } = useReveal();

  return (
    <section
      id="contact"
      ref={ref}
      className={
        "relative py-20 px-4 " +
        (isReady ? ("reveal " + (isVisible ? "is-visible" : "")) : "")
      }
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase mb-5 block"
          >
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
            Get in touch
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto font-light leading-[1.7]">
            Available for freelance work and full-time opportunities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.label}
              className="rounded-xl border border-border/40 bg-white p-4"
            >
              <div className="w-8 h-8 rounded-md border border-border/40 flex items-center justify-center mb-3">
                <method.icon size={16} className="text-text-secondary" />
              </div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.15em] mb-1">
                {method.label}
              </p>
              {method.href ? (
                <a
                  href={method.href}
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-sm text-foreground">{method.value}</p>
              )}
              <p className="text-[11px] text-text-muted mt-2">
                {method.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex-1 space-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 bg-white text-foreground hover:bg-surface-subtle transition-colors"
                aria-label={link.label}
              >
                <link.icon size={16} className="text-text-secondary" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex-1 space-y-4">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs text-text-secondary mb-2 tracking-wide uppercase"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:border-accent transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-text-secondary mb-2 tracking-wide uppercase"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:border-accent transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-text-secondary mb-2 tracking-wide uppercase"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:border-accent transition-colors resize-none text-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-white text-foreground text-sm font-medium hover:bg-surface-subtle hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-text-muted text-center mt-2">
              I'll get back to you within 24 hours
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-text-secondary">{personal.name}</span>. Built
            with React & passion for development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;