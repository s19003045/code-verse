# Data Governance Strategy

1. **Lineage Tracking** – every dataset stamped with schema + owner metadata; lineage graph auto-generated from pipeline manifests.
2. **Quality Gates** – Great Expectations suites executed on staging and prod topics with alert rules feeding PagerDuty.
3. **Policy Catalog** – Markdown/YAML policies stored in repo and surfaced via the governance console, mapping controls to services.
4. **Carbon Reporting** – ingestion jobs emit energy metrics; dashboards aggregate emissions per product area.
5. **Risk Register** – Jira automation synchronizes high severity incidents to governance board with SLA tracking.
