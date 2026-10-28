import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { portfolioData } from "../data/kishandata";
import { useReveal } from "../hooks/useReveal";
import { Sheet, SheetContent, SheetClose } from "./ui/sheet";

const DetailSheet = ({ item, type, open, onClose }) => {
  if (!item) return null;

  const labels = {
    education: { icon: GraduationCap, title: item.degree, org: item.institution },
    experience: { icon: Briefcase, title: item.title, org: item.company },
  };
  const info = labels[type] || labels.experience;
  const period = item.period || item.year;

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <SheetContent
        side="bottom"
        className="bg-background border-t border-border text-foreground overflow-y-auto"
        style={{
          height: "80vh",
          maxHeight: "80vh",
          borderRadius: "20px 20px 0 0",
          padding: "32px 28px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div className="max-w-3xl mx-auto pt-4">
          <div className="mb-4">
            <span
              className="px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[10px] font-semibold uppercase tracking-wider"
            >
              {type === "education" ? "Education" : "Experience"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
            {info.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-text-muted text-sm mb-6">
            <span>{info.org}</span>
            <span className="text-border/40">·</span>
            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-text-muted" />
              <span>{period}</span>
            </div>
          </div>
          {item.description && (
            <p className="text-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              {item.description}
            </p>
          )}
          {type === "education" && item.gpa && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.15em] mb-2">
                GPA
              </h4>
              <span className="px-3 py-1.5 rounded-md border border-border/40 text-sm font-semibold text-text-secondary bg-white">
                {item.gpa}
              </span>
            </div>
          )}
          {(item.highlights || item.achievements) && (
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.15em] mb-3">
                {type === "experience" ? "Achievements" : "Highlights"}
              </h4>
              <div className="space-y-2">
                {(item.highlights || item.achievements || []).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-text-muted">
                    <CheckCircle size={14} className="text-border mt-0.5 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const TimelineNode = ({ item, type, onSelect }) => {
  const period = item.period || item.year;
  const org = type === "experience" ? item.company : item.institution;
  const title = type === "experience" ? item.title : item.degree;

  return (
    <div
      className="group cursor-pointer relative mb-14"
      onClick={() => onSelect(item, type)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item, type);
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 mt-1" />
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] text-text-muted font-mono">
              {org}
            </span>
            <span className="w-0.5 h-0.5 bg-border/40" />
            <span className="text-[11px] text-text-muted font-mono">
              {period}
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground">{title}</h4>
          {item.description && (
            <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">
              {item.description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-7 h-7 rounded-full border border-border/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(25,25,25,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-foreground transition-colors"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const Education = () => {
  const { education, experience } = portfolioData;
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { ref, isVisible, isReady } = useReveal();

  const sortedItems = [
    ...experience.map((exp) => ({ ...exp, _type: "experience" })),
    ...education.map((edu) => ({ ...edu, _type: "education" })),
  ].sort((a, b) => {
    const aYear = parseInt(a.year || a.period);
    const bYear = parseInt(b.year || b.period);
    return bYear - aYear;
  });

  const handleSelect = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setSheetOpen(true);
  };

  return (
    <section
      id="education"
      ref={ref}
      className={
        "relative py-20 px-4 " +
        (isReady ? ("reveal " + (isVisible ? "is-visible" : "")) : "")
      }
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase mb-5 block"
          >
            Background
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
            Experience & Education
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto font-light leading-[1.7]">
            Academic background and professional journey
          </p>
        </div>

        <div className="space-y-14">
          {sortedItems.map((item) => (
            <TimelineNode
              key={item._type + "-" + item.id}
              item={item}
              type={item._type}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <DetailSheet
        item={selectedItem}
        type={selectedType}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
};

export default Education;
