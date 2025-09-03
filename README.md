# Three-Tier Application with CI/CD on Kubernetes

## 📖 Overview
This project demonstrates a simple **3-Tier Web Application** deployed on **Kubernetes** with automated image build and push via **GitHub Actions**.  
The architecture follows the classic 3-tier pattern:

- **Frontend (UI)** → Static website (HTML/JS) served in a container.  
- **API (Backend)** → Node.js + Express + PostgreSQL client.  
- **Database (Persistence)** → PostgreSQL running in Kubernetes with persistent storage.  

---

## 🏗️ Architecture

```text
+-------------+       +-----------------+       +----------------+
|  Frontend   | <---> |  API (Express)  | <---> |   PostgreSQL   |
| (HTML/JS)   |       |  Node.js server |       |   StatefulSet  |
+-------------+       +-----------------+       +----------------+
       |                       |                          |
       +------------> Ingress (Nginx) <-------------------+

📂 Project Structure

3-tier-app/
├── services/
│   ├── frontend/
│   │   ├── Dockerfile
│   │   └── index.html
│   └── api/
│       ├── Dockerfile
│       ├── package.json
│       └── index.js (Express app)
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── db-secret.yaml
│   ├── postgres-statefulset.yaml
│   ├── api-deployment.yaml
│   ├── api-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
└── .github/
    └── workflows/
        └── ci-cd.yaml

⚙️ Components

1. Frontend
- Simple static HTML page.  
- Has a button **Ping API** that calls `/api/health`.  

2. API
- Node.js Express app.  
- Exposes `/api/health`:  
  - Connects to PostgreSQL.  
  - Returns `API OK @ <timestamp>` if DB is reachable.  

Example route:
```js
app.get("/api/health", async (_req, res) => {
  const r = await pool.query("SELECT NOW() as now");
  res.send(`API OK @ ${r.rows[0].now.toISOString()}`);
});

3. Database
- PostgreSQL running as StatefulSet.  
- Configured via:  
  - **ConfigMap** → database name & username.  
  - **Secret** → password.  
  - **PersistentVolumeClaim** for durable storage.  

🚀 CI/CD (GitHub Actions)

Workflow pipeline:  
1. Triggered on **git push**.  
2. Build Docker images for **frontend** and **api**.  
3. Push images to **Docker Hub**.  
