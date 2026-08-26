from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from orchestrator import CentralOrchestrator

app = FastAPI(title="TripEx MVP API", version="1.0.0")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate Orchestrator
orchestrator = CentralOrchestrator()

# Request Models
class ItineraryRequest(BaseModel):
    destination: str
    budget: float
    duration: int
    has_isic: bool
    is_premium: bool = False
    simulate_hazard: str = "weather" # "weather", "transit", or "none"

class JournalUploadRequest(BaseModel):
    title: str
    content: str
    mood: str
    has_isic: bool

@app.get("/")
def read_root():
    return {"message": "Welcome to TripEx MVP Backend API"}

@app.post("/api/itinerary")
async def generate_itinerary(req: ItineraryRequest):
    try:
        plan = await orchestrator.plan_trip({
            "destination": req.destination,
            "budget": req.budget,
            "duration": req.duration,
            "has_isic": req.has_isic,
            "is_premium": req.is_premium,
            "simulate_hazard": req.simulate_hazard
        })
        return plan
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/alerts")
async def get_active_alerts():
    # Return quick alerts for display in the landing page if desired
    return {
        "alerts": [
            {
                "id": "global-01",
                "type": "weather",
                "title": "Unsettled weather in Kaunas",
                "message": "Scattered rain predicted this week. Keep your indoor museums alternatives ready!",
                "severity": "info"
            }
        ]
    }

@app.post("/api/journal/upload")
async def upload_journal(req: JournalUploadRequest):
    # Mocking photo/journal uploads
    return {
        "success": True,
        "message": "Recap journal saved successfully!",
        "recap_card_url": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60",
        "saved_item": {
            "title": req.title,
            "content": req.content,
            "mood": req.mood,
            "social_share_text": f"Just finished planning my optimized trip to Kaunas with TripEX! Saved { '35%' if req.has_isic else '10%' } using student perks! #Erasmus #TripEx #Kaunas"
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
