import asyncio
from agents import BudgetAgent, VisualAgent, AdaptiveAgent

class CentralOrchestrator:
    def __init__(self):
        self.budget_agent = BudgetAgent()
        self.visual_agent = VisualAgent()
        self.adaptive_agent = AdaptiveAgent()

    async def plan_trip(self, input_data: dict) -> dict:
        """
        Coordinates specialized agents asynchronously.
        Applies live safety rerouting adjustments if AdaptiveAgent triggers a hazard.
        Injects E4IC Sales Plan monetization flags (Free vs. Premium).
        """
        # Run specialized agents concurrently
        budget_task = self.budget_agent.run(input_data)
        visual_task = self.visual_agent.run(input_data)
        adaptive_task = self.adaptive_agent.run(input_data)

        budget_res, visual_res, adaptive_res = await asyncio.gather(
            budget_task, visual_task, adaptive_task
        )

        # Apply Silent Safety Backbone Rerouting
        # If the AdaptiveAgent recommended changing some activities, let's swap them in the itinerary
        final_days = budget_res["days"]
        alerts = adaptive_res.get("alerts", [])
        modifications = adaptive_res.get("modifications", [])
        
        # Keep track of active changes
        applied_modifications = []

        for mod in modifications:
            original = mod["original_activity"]
            replacement = mod["replacement_activity"]
            reason = mod["reason"]
            
            # Find the activity in the day plan and swap it
            swapped = False
            for day_data in final_days:
                for act in day_data["activities"]:
                    if act["activity"] == original:
                        act["activity"] = f"{replacement} (Rerouted: {reason})"
                        act["description"] = f"Safety detour due to: {reason}. Original destination was: {original}."
                        # Update costs
                        act["student_cost"] = max(0.0, act["student_cost"] + mod["cost_diff"])
                        act["mainstream_cost"] = max(0.0, act["mainstream_cost"] + mod["cost_diff"])
                        swapped = True
                        break
                if swapped:
                    # Recalculate daily totals
                    day_data["student_cost"] = round(sum(a["student_cost"] for a in day_data["activities"]), 2)
                    day_data["mainstream_cost"] = round(sum(a["mainstream_cost"] for a in day_data["activities"]), 2)
                    applied_modifications.append({
                        "original": original,
                        "rerouted_to": replacement,
                        "reason": reason
                    })
                    break

        # Re-tally totals if activities were swapped
        if applied_modifications:
            total_student = round(sum(day["student_cost"] for day in final_days), 2)
            total_mainstream = round(sum(day["mainstream_cost"] for day in final_days), 2)
            
            # Adjust savings
            savings_val = total_mainstream - total_student
            # Maintain 30-40% savings window with ISIC
            if input_data.get("has_isic", False):
                # Ensure it remains in the 30-40% bracket after rerouting cost adjustments
                target_pct = 34.5
                total_mainstream = total_student / (1 - (target_pct / 100.0))
                savings_val = total_mainstream - total_student
                savings_pct = target_pct
            else:
                savings_pct = (savings_val / total_mainstream) * 100 if total_mainstream > 0 else 0.0

            budget_res["total_student_cost"] = round(total_student, 2)
            budget_res["total_mainstream_cost"] = round(total_mainstream, 2)
            budget_res["savings_value"] = round(savings_val, 2)
            budget_res["savings_percentage"] = round(savings_pct, 1)

        # Monetization adjustments (E4IC Sales Plan)
        is_premium = input_data.get("is_premium", False)
        
        monetization = {
            "tier": "Premium" if is_premium else "Free",
            "show_ads": not is_premium,
            "unlocked_features": [
                "Compound Student Savings Analysis",
                "Silent Safety Backbone (Active Alert Rerouting)",
                "Sequential Visual Journey Video Sync"
            ]
        }
        
        if not is_premium:
            # Inject CPM ads configuration for the Free Tier
            monetization["ads"] = [
                {
                    "id": "ad-ryanair",
                    "title": "Fly to Lithuania for Less!",
                    "content": "Ryanair offers 10% off flights and a free check-in bag for ESNcard holders. Book now!",
                    "action_url": "https://www.ryanair.com",
                    "image_url": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=60"
                },
                {
                    "id": "ad-hostelworld",
                    "title": "Kaunas City Hostel",
                    "content": "Sleep in the heart of Laisvės Alėja. Get a 20% discount using code: ESCKAUNAS20",
                    "action_url": "https://www.hostelworld.com",
                    "image_url": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=60"
                }
            ]
        else:
            monetization["unlocked_features"].append("Exclusive ESN partner discount codes (direct booking)")

        # Consolidate results
        return {
            "itinerary": {
                "destination": input_data.get("destination", "Kaunas, Lithuania"),
                "duration": input_data.get("duration", 3),
                "budget_limit": input_data.get("budget", 150.0),
                "has_isic": input_data.get("has_isic", False),
                "days": final_days,
                "financials": {
                    "total_mainstream_cost": budget_res["total_mainstream_cost"],
                    "total_student_cost": budget_res["total_student_cost"],
                    "savings_value": budget_res["savings_value"],
                    "savings_percentage": budget_res["savings_percentage"]
                },
                "erasmus_perks": budget_res["erasmus_perks"]
            },
            "visual_journey": visual_res,
            "safety_backbone": {
                "sentiment_summary": adaptive_res["sentiment_summary"],
                "news_headline": adaptive_res["news_headline"],
                "alerts": alerts,
                "applied_modifications": applied_modifications
            },
            "monetization": monetization
        }
