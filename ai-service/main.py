"""
GREENPACK AI Service
Supply Prediction & Waste Intelligence Engine
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
import math
from datetime import datetime, timedelta

app = FastAPI(
    title="GREENPACK AI Service",
    description="Waste Supply Prediction & Intelligence Engine",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Mock AI Engine ───────────────────────────────────────────────
# In production: replace with trained ML models using scikit-learn/Prophet

def simulate_prediction(base: float, days: int, trend: str = "up") -> List[float]:
    """Simulate time-series prediction with seasonal variation."""
    values = []
    for i in range(days):
        seasonal = math.sin(i * 0.5) * 0.1  # seasonal variation
        trend_factor = 1 + (0.02 if trend == "up" else -0.01) * i
        noise = random.gauss(0, 0.05)
        values.append(round(base * trend_factor * (1 + seasonal + noise), 1))
    return values

# ─── Supply Prediction ────────────────────────────────────────────
@app.get("/predict/supply")
async def predict_supply(zone: Optional[str] = None, material: Optional[str] = None, days: int = 7):
    zones = ["Mumbai West", "Delhi NCR", "Bengaluru", "Chennai", "Hyderabad"]
    materials = ["Plastic PET", "Scrap Metal", "Cardboard", "E-Waste", "HDPE Plastic"]

    target_zone = zone or random.choice(zones)
    target_material = material or random.choice(materials)
    base_kg = random.uniform(500, 3000)

    predictions = simulate_prediction(base_kg, days, "up")
    dates = [(datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(days)]

    return {
        "zone": target_zone,
        "material": target_material,
        "predictions": [{"date": d, "kg": kg} for d, kg in zip(dates, predictions)],
        "confidence": round(random.uniform(0.72, 0.91), 2),
        "trend": "increasing",
        "peak_day": dates[predictions.index(max(predictions))],
        "peak_kg": max(predictions),
        "model": "GREENPACK-TS-v1",
    }

# ─── Zone Intelligence ────────────────────────────────────────────
@app.get("/intelligence/zones")
async def get_zone_intelligence():
    zones = [
        {"city": "Mumbai",    "waste_score": 95, "growth_rate": 0.12, "top_material": "Plastic PET", "risk": "low"},
        {"city": "Delhi",     "waste_score": 88, "growth_rate": 0.08, "top_material": "Cardboard",   "risk": "medium"},
        {"city": "Bengaluru", "waste_score": 82, "growth_rate": 0.15, "top_material": "E-Waste",      "risk": "low"},
        {"city": "Chennai",   "waste_score": 75, "growth_rate": 0.06, "top_material": "Metal",        "risk": "low"},
        {"city": "Hyderabad", "waste_score": 71, "growth_rate": 0.09, "top_material": "Paper",        "risk": "medium"},
        {"city": "Pune",      "waste_score": 68, "growth_rate": 0.11, "top_material": "Plastic",      "risk": "low"},
    ]
    return {"zones": zones, "generated_at": datetime.utcnow().isoformat()}

# ─── Material Trends ──────────────────────────────────────────────
@app.get("/intelligence/trends")
async def get_material_trends():
    return {
        "trends": [
            {"material": "PET Plastic", "demand_trend": "rising",  "supply_trend": "stable",  "price_trend": "up",   "forecast": "High demand expected Q3 2024"},
            {"material": "E-Waste",     "demand_trend": "rising",  "supply_trend": "rising",  "price_trend": "up",   "forecast": "Electronics recycling boom"},
            {"material": "Scrap Metal", "demand_trend": "stable",  "supply_trend": "falling", "price_trend": "up",   "forecast": "Supply shortage expected"},
            {"material": "Cardboard",   "demand_trend": "seasonal","supply_trend": "rising",  "price_trend": "down", "forecast": "Post-festival season glut"},
            {"material": "Organic",     "demand_trend": "rising",  "supply_trend": "stable",  "price_trend": "stable","forecast": "Biogas demand driving interest"},
        ]
    }

# ─── Supplier Ranking ─────────────────────────────────────────────
@app.get("/intelligence/supplier-ranking")
async def get_supplier_ranking():
    return {
        "rankings": [
            {"rank": 1, "kabadiwala": "Rajesh Kumar",   "location": "Mumbai",    "score": 94.2, "consistency": 0.96},
            {"rank": 2, "kabadiwala": "Sharma Traders",  "location": "Delhi",     "score": 91.8, "consistency": 0.93},
            {"rank": 3, "kabadiwala": "Patel Kabadi",    "location": "Ahmedabad", "score": 88.5, "consistency": 0.89},
            {"rank": 4, "kabadiwala": "Green Collectors","location": "Bengaluru", "score": 85.1, "consistency": 0.87},
        ],
        "generated_at": datetime.utcnow().isoformat(),
    }

# ─── Fraud Detection ─────────────────────────────────────────────
@app.get("/intelligence/fraud-signals")
async def get_fraud_signals():
    return {
        "signals": [
            {"id": "FRD-001", "type": "duplicate_registration", "severity": "high",   "entity": "KB-2234", "detail": "Same face ID used for 2 pickers"},
            {"id": "FRD-002", "type": "volume_anomaly",          "severity": "medium", "entity": "KB-0891", "detail": "Unusual 300% volume spike in 24h"},
            {"id": "FRD-003", "type": "quality_mismatch",        "severity": "low",    "entity": "KB-1104", "detail": "Industry rating inconsistent with logged quality"},
        ]
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "GREENPACK AI", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
