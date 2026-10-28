import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Zap, GraduationCap, FolderGit2, Mail } from "lucide-react";
import { scrollToSection } from "../hooks/useSmoothScroll";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home", num: "01" },
      { id: "skills", label: "Skills", num: "02" },
      { id: "education", label: "Education", num: "03" },
      { id: "projects", label: "Projects", num: "04" },
      { id: "contact", label: "Contact", num: "05" },
    ],
    []
  );

  const mobileItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => n.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      setIsScrolled(window.scrollY > 50);

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <>
      {/* ===== Desktop Nav ===== */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block px-6 border-b border-border/60 bg-background/80 backdrop-blur-sm"
        style={{ paddingTop: "20px" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => handleNavClick("home")}
            className="font-mono text-foreground text-base font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            KISHAN
          </button>

          <div className="flex items-center" style={{ gap: "36px" }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative group font-mono text-[11px] tracking-[0.15em] font-medium uppercase transition-colors"
                  style={{
                    color: isActive
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-accent"
                    />
                  )}
                  <span
                    className="absolute -bottom-[3px] left-0 right-0 h-[1px] bg-border/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* ===== Mobile Bottom Dock ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 0.5,
          }}
          className="pointer-events-auto"
          style={{
            marginBottom: "20px",
            height: "60px",
            padding: "0 8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "30px",
          }}
        >
          {mobileItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex flex-col items-center justify-center gap-[2px] transition-all duration-200"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  width: "52px",
                  height: "48px",
                  borderRadius: "20px",
                  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                  transition: "all 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16px",
                    height: "16px",
                    filter: isActive ? "none" : "grayscale(1) contrast(0.5)",
                    transition: "filter 0.2s ease",
                  }}
                >
                  <item.icon size={16} style={{ color: isActive ? "#191919" : "#80808a" }} />
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "8px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: isActive ? "rgba(25,25,25,1)" : "rgba(128,128,138,0.9)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;