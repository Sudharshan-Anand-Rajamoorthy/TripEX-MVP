import asyncio
import sys
import io
from orchestrator import CentralOrchestrator

# Force stdout to UTF-8 to support Lithuanian characters in Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

async def test():
    orchestrator = CentralOrchestrator()
    print("Testing Central Orchestrator with ISIC Enabled and Weather Hazard Simulation...")
    res = await orchestrator.plan_trip({
        "destination": "Kaunas, Lithuania",
        "budget": 150.0,
        "duration": 3,
        "has_isic": True,
        "is_premium": False,
        "simulate_hazard": "weather"
    })
    
    # Assert saving score is within 30-40%
    savings_pct = res["itinerary"]["financials"]["savings_percentage"]
    print(f"Total Student Cost: €{res['itinerary']['financials']['total_student_cost']}")
    print(f"Total Mainstream Cost: €{res['itinerary']['financials']['total_mainstream_cost']}")
    print(f"Calculated Student Savings: {savings_pct}%")
    assert 30.0 <= savings_pct <= 40.0, f"Savings percentage {savings_pct} out of range 30-40%"
    print("[OK] Savings score within 30-40% target achieved!")

    # Verify weather warning and activity swap
    alerts = res["safety_backbone"]["alerts"]
    mods = res["safety_backbone"]["applied_modifications"]
    print(f"Disruption Alerts: {len(alerts)}")
    print(f"Activity Modifications: {len(mods)}")
    for mod in mods:
        print(f"  Rerouted '{mod['original']}' -> '{mod['rerouted_to']}' due to: {mod['reason']}")
    assert len(alerts) > 0, "Weather warning alert was not generated"
    assert len(mods) > 0, "Weather swap modification was not generated"
    print("[OK] Adaptive agent successfully swapped outdoor activities and raised alerts!")

    # Verify visual journey metadata
    overlays = res["visual_journey"]["overlays"]
    print(f"Visual overlays timeline entries: {len(overlays)}")
    assert len(overlays) > 0, "Visual overlay metadata is missing"
    print("[OK] Visual agent returned overlay details successfully!")

    print("\nAll Backend Agent Pillar Checks Passed!")

if __name__ == "__main__":
    asyncio.run(test())
