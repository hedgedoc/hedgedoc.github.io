---
title: Can I run multiple instances on the same database?
---

No. The HedgeDoc server process is not entirely stateless and therefore running more than one instance will result in missing/broken content for users. In order to solve issues like HA-capabilities, please use a high level orchestrator that makes sure that always 1 instance is running on your infrastructure and that the database is available. The server process usually starts within seconds and therefore the possible downtime should be minimal.
