import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span>{project.eyebrow}</span>
        <span>{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="chip-row">
        {project.concepts.map((concept) => (
          <span className="chip" key={concept}>{concept}</span>
        ))}
      </div>
      <div className="project-card__footer">Explore system <span aria-hidden="true">↗</span></div>
    </article>
  );
}
