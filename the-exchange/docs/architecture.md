# Architecture Summary

```text
┌──────────────────────────────────────────────┐
│               The Exchange                   │
├──────────────────────────────────────────────┤
│ Ingestion  | API Gateway + Schema Registry   │
│ Streaming  | Kafka + Debezium + Flink Jobs   │
│ Storage    | PostgreSQL, MongoDB, S3 Data Lake│
│ Observability | OpenTelemetry → Grafana/Superset│
│ Governance | RBAC, Policy Engine, Carbon KPIs│
│ Delivery   | Terraform + ArgoCD + Kubernetes │
└──────────────────────────────────────────────┘
```

- **Frontend**: React 19 micro-frontend shell with TanStack Query data orchestration and Tailwind design system.
- **APIs**: GraphQL and REST endpoints fronted by API Gateway; service mesh secured via mTLS.
- **Data**: Kafka topics feed time-series stores; batch snapshots land in S3; Superset dashboards pull from PostgreSQL and OpenSearch.
- **Deployment**: GitOps workflow (Terraform + ArgoCD) to provision and promote clusters across staging/production.

Integration diagrams and sequence charts will be expanded as services move from prototype to production.
