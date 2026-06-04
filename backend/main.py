"""
GREENPACK FastAPI Backend
AI-Powered Waste Intelligence Platform
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import uuid
import jwt
import hashlib

# ─── App Setup ────────────────────────────────────────────────────
app = FastAPI(
    title="GREENPACK API",
    description="AI-Powered Waste Intelligence Platform for India",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://greenpack.in"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Config ───────────────────────────────────────────────────────
SECRET_KEY = "greenpack-secret-key"
ALGORITHM  = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# ─── Models ───────────────────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str  # kabadiwala | industry | admin
    phone: Optional[str] = None
    organization: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None

class WasteEntry(BaseModel):
    picker_id: str
    waste_type: str   # plastic | paper | metal | ewaste | organic | mixed
    quantity_kg: float
    quality: str      # A | B | C
    collection_area: str
    notes: Optional[str] = None

class PickerCreate(BaseModel):
    name: str
    area: str
    phone: Optional[str] = None
    specialization: List[str]
    daily_avg_kg: float
    face_data: Optional[str] = None  # Base64 encoded

class IndustryRequest(BaseModel):
    material_type: str
    quantity_kg: float
    quality_requirement: str
    max_price_per_kg: float
    delivery_location: str
    notes: Optional[str] = None

class FeedbackCreate(BaseModel):
    kabadiwala_id: str
    transaction_id: str
    quality_rating: int      # 1-5
    contamination_rating: int
    consistency_rating: int
    delivery_satisfaction: int
    notes: Optional[str] = None

# ─── Mock Database ────────────────────────────────────────────────
MOCK_USERS = {
    "admin@greenpack.in":     {"id": "USR-001", "name": "Super Admin",     "role": "admin",      "password": "admin@123"},
    "kabadiwala@greenpack.in": {"id": "USR-002", "name": "Rajesh Kumar",   "role": "kabadiwala", "password": "demo@123"},
    "industry@greenpack.in":   {"id": "USR-003", "name": "EcoRecycle Ltd", "role": "industry",   "password": "demo@123"},
}

MOCK_PICKERS = [
    {"id": "GP-001", "name": "Ramesh Yadav",  "area": "Andheri West", "trust_score": 94, "total_kg": 18420},
    {"id": "GP-002", "name": "Sunita Devi",   "area": "Kurla East",   "trust_score": 91, "total_kg": 15680},
    {"id": "GP-003", "name": "Manoj Gupta",   "area": "Dharavi",      "trust_score": 88, "total_kg": 12940},
]

MOCK_INVENTORY = [
    {"id": "INV-001", "type": "Plastic (PET)",  "qty_kg": 2400, "quality": "A", "zone": "Mumbai West",    "price_per_kg": 18},
    {"id": "INV-002", "type": "Scrap Metal",     "qty_kg": 800,  "quality": "A", "zone": "Delhi NCR",      "price_per_kg": 42},
    {"id": "INV-003", "type": "Cardboard",       "qty_kg": 1800, "quality": "B", "zone": "Bengaluru",      "price_per_kg": 9},
    {"id": "INV-004", "type": "E-Waste",         "qty_kg": 320,  "quality": "A", "zone": "Hyderabad",      "price_per_kg": 65},
]

# ─── Auth Utilities ───────────────────────────────────────────────
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ─── Auth Endpoints ───────────────────────────────────────────────
@app.post("/auth/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = MOCK_USERS.get(form_data.username)
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token({"sub": user["id"], "role": user["role"], "name": user["name"]})
    return {"access_token": token, "token_type": "bearer", "role": user["role"]}

@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    if user.email in MOCK_USERS:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = f"USR-{uuid.uuid4().hex[:6].upper()}"
    return {
        "message": "Registration successful",
        "user_id": user_id,
        "role": user.role,
        "greenpack_id": f"GP-{uuid.uuid4().hex[:4].upper()}",
    }

# ─── Picker Endpoints ─────────────────────────────────────────────
@app.get("/pickers")
async def get_pickers(token: dict = Depends(verify_token)):
    return {"pickers": MOCK_PICKERS, "total": len(MOCK_PICKERS)}

@app.post("/pickers", status_code=status.HTTP_201_CREATED)
async def register_picker(picker: PickerCreate, token: dict = Depends(verify_token)):
    if token.get("role") != "kabadiwala" and token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only kabadiwalas can register pickers")
    picker_id = f"GP-{uuid.uuid4().hex[:4].upper()}"
    return {
        "message": "Picker registered successfully",
        "picker_id": picker_id,
        "greenpack_id": picker_id,
        "trust_score": 50,  # Initial score
        "linked_kabadiwala": token.get("sub"),
    }

@app.get("/pickers/{picker_id}")
async def get_picker(picker_id: str, token: dict = Depends(verify_token)):
    picker = next((p for p in MOCK_PICKERS if p["id"] == picker_id), None)
    if not picker:
        raise HTTPException(status_code=404, detail="Picker not found")
    return picker

# ─── Waste Entry Endpoints ────────────────────────────────────────
@app.post("/waste/log", status_code=status.HTTP_201_CREATED)
async def log_waste(entry: WasteEntry, token: dict = Depends(verify_token)):
    entry_id = f"WE-{uuid.uuid4().hex[:6].upper()}"
    tx_hash  = f"0x{hashlib.sha256(entry_id.encode()).hexdigest()[:40]}"
    return {
        "message": "Waste entry logged successfully",
        "entry_id": entry_id,
        "blockchain_tx": tx_hash,
        "status": "confirmed",
        "timestamp": datetime.utcnow().isoformat(),
        "trust_score_delta": +2,
    }

@app.get("/waste/history")
async def get_waste_history(token: dict = Depends(verify_token)):
    return {
        "entries": [
            {"id": "WE-001A3B", "picker": "Ramesh Yadav", "type": "Plastic", "qty": 45, "quality": "A", "timestamp": "2024-06-03T10:30:00"},
            {"id": "WE-002C4D", "picker": "Sunita Devi",  "type": "Paper",   "qty": 32, "quality": "B", "timestamp": "2024-06-03T11:00:00"},
        ]
    }

# ─── Inventory Endpoints ──────────────────────────────────────────
@app.get("/inventory")
async def get_inventory(
    waste_type: Optional[str] = None,
    quality:    Optional[str] = None,
    zone:       Optional[str] = None,
    token: dict = Depends(verify_token)
):
    inventory = MOCK_INVENTORY.copy()
    if waste_type:
        inventory = [i for i in inventory if waste_type.lower() in i["type"].lower()]
    if quality:
        inventory = [i for i in inventory if i["quality"] == quality]
    if zone:
        inventory = [i for i in inventory if zone.lower() in i["zone"].lower()]
    return {"inventory": inventory, "total": len(inventory)}

# ─── Industry Endpoints ───────────────────────────────────────────
@app.post("/industry/request")
async def create_request(request: IndustryRequest, token: dict = Depends(verify_token)):
    req_id = f"IND-{uuid.uuid4().hex[:4].upper()}"
    return {
        "message": "Purchase request created",
        "request_id": req_id,
        "status": "pending",
        "matched_suppliers": 3,
    }

@app.get("/industry/suppliers")
async def get_suppliers(token: dict = Depends(verify_token)):
    return {
        "suppliers": [
            {"id": "KB-001", "name": "Rajesh Kumar", "location": "Mumbai West", "trust_score": 94, "rating": 4.8, "verified": True},
            {"id": "KB-002", "name": "Sharma Traders","location": "Delhi NCR",  "trust_score": 91, "rating": 4.7, "verified": True},
        ]
    }

@app.post("/industry/feedback")
async def submit_feedback(feedback: FeedbackCreate, token: dict = Depends(verify_token)):
    avg_score = (feedback.quality_rating + feedback.contamination_rating +
                 feedback.consistency_rating + feedback.delivery_satisfaction) / 4
    return {
        "message": "Feedback submitted and trust score updated",
        "avg_rating": round(avg_score, 1),
        "kabadiwala_trust_delta": round((avg_score - 3) * 2, 1),
    }

# ─── AI Endpoints ─────────────────────────────────────────────────
@app.get("/ai/predictions")
async def get_predictions(token: dict = Depends(verify_token)):
    return {
        "predictions": [
            {"zone": "Mumbai West",  "material": "Plastic PET",  "forecast_kg": 3200, "confidence": 87, "trend": "up",   "timeframe": "next 7 days"},
            {"zone": "Delhi NCR",    "material": "Cardboard",     "forecast_kg": 2800, "confidence": 82, "trend": "up",   "timeframe": "next 7 days"},
            {"zone": "Bengaluru",    "material": "Scrap Metal",   "forecast_kg": 1500, "confidence": 75, "trend": "down", "timeframe": "next 7 days"},
        ]
    }

@app.get("/ai/insights")
async def get_insights(token: dict = Depends(verify_token)):
    return {
        "insights": [
            "Plastic waste expected to increase +23% in Zone A next month",
            "Cardboard availability rising near commercial sectors",
            "Metal scrap supply peak forecasted for Bengaluru South in 2 weeks",
            "3 new verified kabadiwalas match your material requirements",
        ]
    }

@app.get("/ai/heatmap")
async def get_heatmap(token: dict = Depends(verify_token)):
    return {
        "zones": [
            {"city": "Mumbai",    "lat": 19.0760, "lng": 72.8777, "intensity": 0.95, "kg": 42000},
            {"city": "Delhi",     "lat": 28.7041, "lng": 77.1025, "intensity": 0.82, "kg": 38000},
            {"city": "Bengaluru", "lat": 12.9716, "lng": 77.5946, "intensity": 0.71, "kg": 31000},
            {"city": "Chennai",   "lat": 13.0827, "lng": 80.2707, "intensity": 0.64, "kg": 25000},
            {"city": "Hyderabad", "lat": 17.3850, "lng": 78.4867, "intensity": 0.58, "kg": 22000},
        ]
    }

# ─── Trust Endpoints ──────────────────────────────────────────────
@app.get("/trust/{entity_id}")
async def get_trust_score(entity_id: str, token: dict = Depends(verify_token)):
    return {
        "entity_id": entity_id,
        "trust_score": 94,
        "badge": "GOLD",
        "factors": {
            "consistency": 96,
            "quality_accuracy": 92,
            "delivery_reliability": 95,
            "industry_ratings": 91,
        },
        "verified": True,
        "rank": 3,
    }

# ─── Admin Endpoints ──────────────────────────────────────────────
@app.get("/admin/stats")
async def get_admin_stats(token: dict = Depends(verify_token)):
    if token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return {
        "total_pickers": 12847,
        "total_kabadiwalas": 578,
        "total_industry": 389,
        "waste_tracked_kg": 4218000,
        "fraud_flags": 4,
        "blocked_users": 12,
        "blockchain_transactions": 48291,
    }

@app.post("/admin/ban/{user_id}")
async def ban_user(user_id: str, token: dict = Depends(verify_token)):
    if token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return {"message": f"User {user_id} has been suspended", "status": "banned"}

# ─── Blockchain Endpoints ─────────────────────────────────────────
@app.get("/blockchain/verify/{tx_hash}")
async def verify_transaction(tx_hash: str):
    return {
        "tx_hash": tx_hash,
        "status": "confirmed",
        "block_number": 52841934,
        "network": "Polygon",
        "timestamp": "2024-06-03T10:30:00Z",
        "verified": True,
    }

@app.get("/blockchain/certificate/{entry_id}")
async def get_certificate(entry_id: str, token: dict = Depends(verify_token)):
    cert_hash = hashlib.sha256(entry_id.encode()).hexdigest()
    return {
        "certificate_id": f"CERT-{entry_id}",
        "entry_id": entry_id,
        "hash": f"0x{cert_hash[:64]}",
        "issuer": "GREENPACK Blockchain Service",
        "network": "Polygon",
        "valid": True,
        "issued_at": "2024-06-03T10:30:00Z",
    }

# ─── Health Check ─────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "GREENPACK API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
