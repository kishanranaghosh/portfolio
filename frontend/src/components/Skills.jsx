import React from "react";
import {
  Smartphone,
  Server,
  Globe,
  Wrench,
  Code2,
} from "lucide-react";
import { portfolioData } from "../data/kishandata";
import { useReveal } from "../hooks/useReveal";

const iconMap = {
  "Mobile Development": Smartphone,
  "Backend Development": Server,
  "Frontend Development": Globe,
  Databases: Server,
  Languages: Code2,
  "Tools & DevOps": Wrench,
};

const SkillCard = ({ skillGroup }) => {
  const Icon = iconMap[skillGroup.category] || Code2;

  return (
    <div className="group">
      <div className="rounded-xl border border-border/40 bg-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md border border-border/40 flex items-center justify-center">
            <Icon size={15} className="text-text-secondary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground tracking-wide">
            {skillGroup.category}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {skillGroup.items.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1.5 rounded-md border border-border/40 text-[12px] text-text-secondary font-medium bg-white hover:bg-surface-subtle hover:text-foreground transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExploringSection = ({ exploring }) => (
  <div className="mb-16">
    <div className="text-center mb-8">
      <span className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase">
        Currently Exploring
      </span>
    </div>
    <div className="flex flex-wrap justify-center gap-2">
      {exploring.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1.5 rounded-md border border-border/40 text-[12px] text-text-secondary font-medium bg-white"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const { skills, exploring } = portfolioData;
  const { ref, isVisible, isReady } = useReveal();

  return (
    <section
      id="skills"
      ref={ref}
      className={
        "relative py-20 px-4 " +
        (isReady ? ("reveal " + (isVisible ? "is-visible" : "")) : "")
      }
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase mb-5 block">
            Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto font-light leading-[1.7]">
            Proficient in modern mobile and backend development technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {skills.map((skillGroup) => (
            <SkillCard key={skillGroup.id} skillGroup={skillGroup} />
          ))}
        </div>

        <ExploringSection exploring={exploring} />
      </div>
    </section>
  );
};

export default Skills;
