import React, { useState } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import { portfolioData } from "../data/kishandata";
import { Sheet, SheetContent, SheetClose } from "./ui/sheet";
import { useReveal } from "../hooks/useReveal";

const ProjectSheet = ({ project, open, onClose }) => {
  if (!project) return null;

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
          {project.status && (
            <div className="mb-4">
              <span
                className="px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[10px] font-semibold uppercase tracking-wider"
              >
                {project.status}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            {project.name}
          </h2>
          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
            {project.description}
          </p>
          {project.features && project.features.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.15em] mb-3">
                Features
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {project.features.map((f, i) => (
                  <span
                    key={i}
                    className="text-sm text-text-muted flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-border" /> {f}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.15em] mb-3">
                Technology
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 rounded-md border border-border/40 text-[12px] text-text-secondary font-medium bg-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-accent hover:text-white transition-colors"
                aria-label={"GitHub repository: " + project.name}
              >
                <Github size={15} className="text-text-secondary" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-accent hover:text-white transition-colors"
                aria-label={"Live site: " + project.name}
              >
                <ExternalLink size={15} className="text-text-secondary" />
                <span>Live site</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-surface-subtle transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
const FeaturedProjectCard = ({ project, onSelect }) => (
  <div
    className="group cursor-pointer"
    onClick={() => onSelect(project)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(project);
      }
    }}
  >
    <div className="rounded-xl border border-border/40 bg-white p-5 hover:bg-surface-subtle transition-colors">
      {project.status && (
        <div className="mb-3">
          <span
            className="px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[10px] font-semibold uppercase tracking-wider"
          >
            {project.status}
          </span>
        </div>
      )}
      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 tracking-tight">
        {project.name}
      </h3>
      <p className="text-text-muted text-sm md:text-base leading-relaxed mb-5">
        {project.description}
      </p>
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1.5 rounded-md border border-border/40 text-[12px] text-text-secondary font-medium bg-white"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-accent hover:text-white transition-colors"
            aria-label={"GitHub repository: " + project.name}
          >
            <Github size={15} className="text-text-secondary" /> View on GitHub
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border/40 bg-surface-subtle text-foreground text-sm font-medium hover:bg-accent hover:text-white transition-colors"
            aria-label={"Live site: " + project.name}
          >
            <ExternalLink size={15} className="text-text-secondary" /> Live site
          </a>
        )}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, index, onSelect }) => (
  <div
    className="group cursor-pointer"
    onClick={() => onSelect(project)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(project);
      }
    }}
  >
    <div className="rounded-xl border border-border/40 bg-white p-4 hover:bg-surface-subtle transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md border border-border/40 flex items-center justify-center text-[10px] font-mono font-medium text-text-secondary"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="text-base font-bold text-foreground">
            {project.name}
          </h4>
        </div>
        <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
          <ChevronRight
            size={13}
            className="text-text-muted group-hover:text-foreground transition-colors"
          />
        </div>
      </div>
      <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
        {project.description}
      </p>
    </div>
  </div>
);
const Projects = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { ref, isVisible, isReady } = useReveal();

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={
        "relative py-20 px-4 " +
        (isReady ? ("reveal " + (isVisible ? "is-visible" : "")) : "")
      }
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span
            className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase mb-5 block"
          >
            Work
          </span>
          <h3 className="text-2xl md:text-4xl font-black text-foreground mb-3 tracking-tight">
            Featured Projects
          </h3>
          <p className="text-text-muted text-sm max-w-xl mx-auto font-light leading-[1.7]">
            Production-grade applications built with modern architectures
          </p>
        </div>

        <div className="space-y-5 mb-10">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onSelect={handleSelectProject}
            />
          ))}
        </div>

        <div className="space-y-4">
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      </div>

      <ProjectSheet
        project={selectedProject}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
};

export default Projects;
