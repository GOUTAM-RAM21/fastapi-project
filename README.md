# 🚗 Car Price Prediction API

> A production-ready Machine Learning API built with **FastAPI** — predicts the resale price of a used car based on its features. Deployed live on Render.

[![Live Demo](https://img.shields.io/badge/Live-Render-46E3B7?style=for-the-badge&logo=render)](https://fastapi-project-ybry.onrender.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)](https://python.org)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Auth + API Keys** | Secure endpoints with token-based authentication and API key validation |
| 🧠 **ML Price Prediction** | Trained regression model estimates used car resale value |
| ⚡ **Redis Caching** | Skips redundant model inference for repeated inputs |
| 📈 **Prometheus Metrics** | Exposes `/metrics` endpoint for real-time monitoring |
| 📊 **Grafana Dashboards** | Pre-configured dashboards for visualizing API performance |
| 🐳 **Docker Compose** | One-command local setup with all services |
| ☁️ **Render Deployment** | `render.yaml` config included for zero-friction cloud deploy |

---

## 🧠 Model Input Features

The prediction endpoint accepts the following fields:

| Feature | Type | Description | Example |
|---|---|---|---|
| `company` | string | Car brand | `"Maruti"` |
| `year` | integer | Year of manufacture | `2015` |
| `owner` | string | Number of previous owners | `"Second"` |
| `fuel` | string | Fuel type | `"Petrol"` |
| `seller_type` | string | Individual or Dealer | `"Individual"` |
| `transmission` | string | Transmission type | `"Automatic"` |
| `km_driven` | integer | Kilometers driven | `200000` |
| `mileage_mpg` | float | Mileage (miles per gallon) | `55.0` |
| `engine_cc` | integer | Engine capacity (cc) | `1250` |
| `max_power_bhp` | float | Max power (BHP) | `80.0` |
| `torque_nm` | float | Torque (Newton meters) | `200.0` |
| `seats` | integer | Number of seats | `5` |

---

## 🚀 Getting Started (Local)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fastapi-project.git
cd fastapi-project
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
API_KEY=demo-key
JWT_SECRET_KEY=your-secret-key-here
REDIS_URL=redis://redis:6379
```

### 3. Build and Run

```bash
docker-compose up --build
```

This starts **4 services**: the FastAPI app, Redis, Prometheus, and Grafana.

### 4. Access the Interfaces

| Service | URL | Description |
|---|---|---|
| 📖 API Docs (Swagger) | http://localhost:8000/docs | Interactive API documentation |
| 📡 API Metrics | http://localhost:8000/metrics | Prometheus scrape endpoint |
| 🔭 Prometheus UI | http://localhost:9090 | Query raw metrics |
| 📊 Grafana UI | http://localhost:3000 | Pre-built dashboards |

---

## ☁️ Deployment on Render

This project includes a `render.yaml` for one-click deployment of the API service.

### Steps

1. **Push your code** to a GitHub repository
2. **Go to [Render](https://render.com)** → New → Web Service → Connect your repo
3. Render auto-detects `render.yaml` and configures the service
4. **Add environment variables** in the Render dashboard:

```
API_KEY=<your-api-key>
JWT_SECRET_KEY=<your-jwt-secret>
REDIS_URL=<your-redis-url>
```

5. Click **Deploy** — your API will be live at `https://<your-service>.onrender.com`

> **Note:** The free tier spins down after inactivity. First request after idle may take ~50 seconds.

---

## 📁 Project Structure

```
fastapi-project/
├── app/                    # FastAPI application source
├── data/                   # Training data and datasets
├── notebook/               # Jupyter notebooks for model training
├── Dockerfile              # Container build instructions
├── docker-compose.yml      # Multi-service orchestration
├── prometheus.yml          # Prometheus scrape config
├── render.yaml             # Render deployment config
├── requirements.txt        # Python dependencies
└── README.md
```

---

## 🔑 Authentication

All prediction endpoints require authentication. Two methods are supported:

**API Key** — pass as a header:
```
X-API-Key: demo-key
```

**JWT Token** — obtain a token via the `/token` endpoint, then pass as:
```
Authorization: Bearer <token>
```

---

## 📬 Example Request

```bash
curl -X POST "https://fastapi-project-ybry.onrender.com/predict" \
  -H "X-API-Key: demo-key" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Maruti",
    "year": 2015,
    "owner": "Second",
    "fuel": "Petrol",
    "seller_type": "Individual",
    "transmission": "Automatic",
    "km_driven": 200000,
    "mileage_mpg": 55.0,
    "engine_cc": 1250,
    "max_power_bhp": 80.0,
    "torque_nm": 200.0,
    "seats": 5
  }'
```

**Response:**
```json
{
  "predicted_price": 385000.0,
  "currency": "INR",
  "cached": false
}
```

---

## 🛠️ Tech Stack

- **[FastAPI](https://fastapi.tiangolo.com)** — Modern Python web framework
- **[scikit-learn](https://scikit-learn.org)** — ML model training & inference
- **[Redis](https://redis.io)** — In-memory caching layer
- **[Prometheus](https://prometheus.io)** — Metrics collection
- **[Grafana](https://grafana.com)** — Metrics visualization
- **[Docker Compose](https://docs.docker.com/compose/)** — Local orchestration
- **[Render](https://render.com)** — Cloud deployment

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 👤 Author

**Goutam Das** — [@GOUTAM-RAM21](https://github.com/GOUTAM-RAM21)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
