# Security & Compliance Notes

- **Access control**: RBAC enforced via Keycloak; service-to-service auth handled with short-lived JWTs issued by the mesh.
- **Data handling**: PII is tokenized before entering analytics stores; encryption at rest enabled for PostgreSQL/MongoDB/S3 buckets.
- **Auditability**: All ingestion mutations log to Kafka topics mirrored into OpenSearch; dashboards expose SOC2/ISO 27001 control evidence.
- **Secret management**: Managed through Vault with automatic rotation policies.
- **Compliance roadmap**: SOC2 Type II readiness checklist and ISMS policy templates stored alongside pipeline configs.
