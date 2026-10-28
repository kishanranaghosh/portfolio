import React from "react";
import { Github, Linkedin, Download, ChevronDown } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { portfolioData } from "../data/kishandata";
import { scrollToSection } from "../hooks/useSmoothScroll";

import kishan from "./kishan.jpeg";

const Hero = () => {
  const { personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: personal.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personal.linkedin,
    },
    {
      icon: SiLeetcode,
      label: "LeetCode",
      href: personal.leetcode,
    },
    {
      icon: Download,
      label: "Resume",
      href: "/kishanranaghoshCV.pdf",
      download: "Kishan_Rana_Ghosh_Resume.pdf",
    },
  ];

  return (
    <section id="home" className="relative py-24 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Profile Image */}
        <motion.div variants={fadeUpItem} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-border">
              <img
                src={kishan}
                alt="Kishan Rana Ghosh"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={fadeUpItem} className="select-none">
          <span className="block text-[clamp(30px,8vw,40px)] font-black leading-[1.05] tracking-[-0.02em] text-foreground mb-1">
            KISHAN
          </span>
          <span className="block text-[clamp(30px,8vw,40px)] font-black leading-[1.05] tracking-[-0.02em] text-text-secondary">
            RANA GHOSH
          </span>
        </motion.h1>

        {/* Role Tag */}
        <motion.div variants={fadeUpItem} className="mt-4 mb-6">
          <span className="inline-block text-[11px] text-text-secondary font-medium tracking-[0.18em] uppercase">
            {personal.title}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUpItem}
          className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-14 leading-[1.7] font-normal"
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            const isResume = link.download;

            const extraProps = isResume
              ? { download: link.download, href: link.href }
              : { href: link.href, target: "_blank", rel: "noopener noreferrer" };

            return (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <a
                  {...extraProps}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                >
                  <Icon size={15} className="text-text-secondary" />
                  <span>{link.label}</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Email */}
        <motion.div
          variants={fadeUpItem}
          className="flex items-center justify-center gap-2 text-text-muted text-xs"
        >
          <span className="w-1 h-1 rounded-full bg-border" />
          <a
            href={`mailto:${personal.email}`}
            className="text-text-secondary hover:text-foreground underline underline-offset-4 transition-colors duration-200 tracking-wide"
          >
            {personal.email}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("contributions")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-text-secondary transition-colors z-10"
        aria-label="Scroll to contributions"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
