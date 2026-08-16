import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="project-card">
      <div className="project-card__topline">
        <span>{project.eyebrow}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="chip-row">
        {project.concepts.map((concept) => (
          <span className="chip" key={concept}>{concept}</span>
        ))}
      </div>
      <div className="project-card__footer">
        {project.href ? "View project on GitHub" : "Case study coming soon"}
        <span aria-hidden="true">{project.href ? "↗" : "→"}</span>
      </div>
    </article>
  );

  if (!project.href) {
    return card;
  }

  return (
    <a
      className="project-card-link"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} on GitHub (opens in a new tab)`}
    >
      {card}
    </a>
  );
}
