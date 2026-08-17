import "server-only";

export const portfolioContext = `
PARASH SHAH
Software Development Engineer focused on cloud security infrastructure.
Based in Boston, Massachusetts.

CURRENT EXPERIENCE
- Software Development Engineer at Amazon Web Services since August 2025.
- Builds production cloud security infrastructure supporting Amazon Security Lake and AWS Security Hub across multi-region environments processing millions of security events.
- Works with secure cross-account access, IAM, STS, CloudTrail, service-linked roles, authentication, access control, AWS SDKs, Kubernetes, Terraform, CDK, and operational detection.
- Designed request-time CloudTrail Management validation to catch invalid onboarding configurations and replace silent asynchronous failures with clearer customer-facing errors.
- Remediated 13 high-severity dependency findings involving Log4j, ZooKeeper, Netty, Hadoop, Jackson, Jetty, Airlift, and related libraries.
- Built ETL input-versus-output monitoring across 8 log sources using CloudWatch metrics, metering, 8 per-source alarms, and 1 composite alarm with a 45-minute evaluation window.
- Strengthened canary validation with expected-row checks that surfaced a partial-data scenario with 251 rows received versus 300 expected.
- Introduced Awaitility for declarative polling in asynchronous Java integration tests.

PRIOR EXPERIENCE
- Served in the United States Marine Corps from 2018 to 2025 as a Fuel Specialist and Embarkation Manager.
- Led operational workflows, equipment readiness, logistics, safety, compliance, and junior Marines in high-pressure environments.

TECHNICAL SKILLS
- Languages: Java, Python, SQL, MATLAB.
- Cloud and infrastructure: AWS, IAM, STS, CloudTrail, service-linked roles, Kubernetes, Terraform, CDK, access control, authentication, and cross-account security.
- AWS services: Lambda, SQS, DynamoDB, Athena, Lake Formation, EC2, and CloudWatch.
- Reliability and security: vulnerability remediation, dependency hardening, metrics, metering, alarms, monitoring, canary testing, reconciliation, and automated validation.
- Tools: Git, Linux, Maven, AWS SDKs, CDK, and Awaitility.

COMPLETED PUBLIC PROJECT
Distributed Event Reliability Platform:
- Public repository: https://github.com/Parash-Shah/Distributed-event-reliability-platform
- A Java and Spring Boot event-processing backend that accepts events, processes them asynchronously, recovers from failures, detects data loss, and exposes operational metrics.
- Demonstrates queues, idempotency, retries, dead-letter handling, reconciliation, LocalStack-based AWS integration, SQS, DynamoDB, Prometheus, Grafana, Alertmanager, Docker Compose, and load testing.
- Validated by 16 automated tests and progressive load evidence up to 250 simulated users.

PLANNED PORTFOLIO PROJECTS
- Silent Data Loss Detector: planned reliability project focused on comparing upstream and downstream throughput, alarms, data integrity, and anomaly detection.
- Security Event Lake: planned cloud-security project focused on telemetry ingestion, normalization, storage, querying, and incident investigation.
Do not describe planned projects as completed.

CONTACT
- GitHub: https://github.com/Parash-Shah
- LinkedIn: https://www.linkedin.com/in/parash-shah-3b3891279
- Email: parash5301@yahoo.com
- Phone: +1 (551) 254-9284
`.trim();
