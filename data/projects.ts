export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  concepts: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Distributed Event Reliability Platform",
    eyebrow: "Distributed Systems",
    description:
      "A production-style backend that ingests and processes events asynchronously, recovers from failures, detects data loss, and exposes operational metrics.",
    concepts: ["Java", "Spring Boot", "AWS", "Observability"],
    href: "https://github.com/Parash-Shah/Distributed-event-reliability-platform",
  },
  {
    title: "Silent Data Loss Detector",
    eyebrow: "Reliability Engineering",
    description:
      "A monitoring system that compares upstream and downstream throughput to detect partial data loss before customers do.",
    concepts: ["Metrics", "Alarms", "Data Integrity", "Anomaly Detection"],
  },
  {
    title: "Security Event Lake",
    eyebrow: "Cloud Security",
    description:
      "A cloud-native security telemetry pipeline for ingestion, normalization, storage, querying, and incident investigation.",
    concepts: ["Security", "Data Lake", "AWS", "Analytics"],
  },
];
