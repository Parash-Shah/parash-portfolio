export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  status: string;
  concepts: string[];
};

export const projects: Project[] = [
  {
    title: "Distributed Event Processor",
    eyebrow: "Distributed Systems",
    description:
      "A resilient asynchronous event-processing platform designed around retries, idempotency, dead-letter handling, and observability.",
    status: "Week 01",
    concepts: ["Queues", "Idempotency", "Retries", "Observability"],
  },
  {
    title: "Silent Data Loss Detector",
    eyebrow: "Reliability Engineering",
    description:
      "A monitoring system that compares upstream and downstream throughput to detect partial data loss before customers do.",
    status: "Week 02",
    concepts: ["Metrics", "Alarms", "Data Integrity", "Anomaly Detection"],
  },
  {
    title: "Security Event Lake",
    eyebrow: "Cloud Security",
    description:
      "A cloud-native security telemetry pipeline for ingestion, normalization, storage, querying, and incident investigation.",
    status: "Planned",
    concepts: ["Security", "Data Lake", "AWS", "Analytics"],
  },
];
