# SRE Playbook (Snapshot)

## Monitoring
- Grafana dashboards covering ingestion latency, Kafka lag, API P95/99, and Superset query error rates.
- Synthetic probes executed via k6 on critical exchanges every 5 minutes.

## Incident Response
- Alert routing through PagerDuty; Sev1 targets 5-minute acknowledgement, 30-minute mitigation.
- Runbooks linked to Grafana panels: API gateway saturation, Kafka consumer skew, data freshness breaches.

## Release Engineering
- Canary deploys managed by Argo Rollouts; automated health checks validate consumer lag and API error budgets before full rollout.
- Terraform plans gated by policy-as-code (OPA) to enforce network segmentation and audit logging before apply.

## Disaster Recovery
- Cross-region Kafka clusters with MirrorMaker replication.
- Nightly database snapshots stored in encrypted S3 buckets with 30-day retention.
