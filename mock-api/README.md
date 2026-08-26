# TripEX Mock REST API Documentation

This directory contains the mock JSON response files and setup guide for the **TripEX** live mock backend hosted on `https://apis.jsons.live/0jpsl/`.

---

## Overview & Live Endpoints

| Endpoint | HTTP Method | Backend Route | Frontend Invocation | Live Mock URL |
| :--- | :--- | :--- | :--- | :--- |
| **Root Health Check** | `GET` | `/` | Optional | `https://apis.jsons.live/0jpsl/root` |
| **Generate Itinerary** | `POST` | `/api/itinerary` | [App.tsx:381](file:///c:/Users/goofy/TripEX/frontend/src/App.tsx#L381) | `https://apis.jsons.live/0jpsl/itinerary` |
| **Active Alerts** | `GET` | `/api/alerts` | [main.py:59](file:///c:/Users/goofy/TripEX/backend/main.py#L59) | `https://apis.jsons.live/0jpsl/alerts` |
| **Upload Journal** | `POST` | `/api/journal/upload` | [JourneyJournal.tsx:31](file:///c:/Users/goofy/TripEX/frontend/src/components/JourneyJournal.tsx#L31) | `https://apis.jsons.live/0jpsl/journal` |

---

## 1. Root Endpoint (`GET /`)

* **HTTP Method**: `GET`
* **Current Backend Path**: `/`
* **Live Mock API URL**: `https://apis.jsons.live/0jpsl/root`
* **Headers**: `Accept: application/json`
* **Request Body**: None (GET request)
* **Expected Response JSON**:
  ```json
  {
    "message": "Welcome to TripEx MVP Backend API"
  }
  ```
* **curl Test Command**:
  ```bash
  curl -X GET "https://apis.jsons.live/0jpsl/root" -H "Accept: application/json"
  ```
* **Postman Test Example**:
  * **Method**: `GET`
  * **URL**: `https://apis.jsons.live/0jpsl/root`

---

## 2. Generate Trip Itinerary (`POST /api/itinerary`)

* **HTTP Method**: `POST`
* **Current Backend Path**: `/api/itinerary`
* **Frontend File & Line**: [App.tsx line 381](file:///c:/Users/goofy/TripEX/frontend/src/App.tsx#L381)
* **Live Mock API URL**: `https://apis.jsons.live/0jpsl/itinerary`
* **Required Headers**: `Content-Type: application/json`
* **Example Request Body**:
  ```json
  {
    "destination": "Kaunas, Lithuania",
    "budget": 150.0,
    "duration": 3,
    "has_isic": true,
    "is_premium": false,
    "simulate_hazard": "weather"
  }
  ```
* **curl Test Command**:
  ```bash
  curl -X POST "https://apis.jsons.live/0jpsl/itinerary" \
       -H "Content-Type: application/json" \
       -d '{"destination":"Kaunas, Lithuania","budget":150.0,"duration":3,"has_isic":true,"is_premium":false,"simulate_hazard":"weather"}'
  ```
* **Postman Test Example**:
  * **Method**: `POST`
  * **URL**: `https://apis.jsons.live/0jpsl/itinerary`
  * **Headers**: `Content-Type: application/json`

---

## 3. Active Safety Alerts (`GET /api/alerts`)

* **HTTP Method**: `GET`
* **Current Backend Path**: `/api/alerts`
* **Live Mock API URL**: `https://apis.jsons.live/0jpsl/alerts`
* **Headers**: `Accept: application/json`
* **Request Body**: None
* **curl Test Command**:
  ```bash
  curl -X GET "https://apis.jsons.live/0jpsl/alerts" -H "Accept: application/json"
  ```
* **Postman Test Example**:
  * **Method**: `GET`
  * **URL**: `https://apis.jsons.live/0jpsl/alerts`

---

## 4. Upload Journal Entry (`POST /api/journal/upload`)

* **HTTP Method**: `POST`
* **Current Backend Path**: `/api/journal/upload`
* **Frontend File & Line**: [JourneyJournal.tsx line 31](file:///c:/Users/goofy/TripEX/frontend/src/components/JourneyJournal.tsx#L31)
* **Live Mock API URL**: `https://apis.jsons.live/0jpsl/journal`
* **Required Headers**: `Content-Type: application/json`
* **Example Request Body**:
  ```json
  {
    "title": "Sunset at Santaka Confluence",
    "content": "Spent the evening walking down Laisvės alėja and visiting Santaka Park. Used ISIC student perks all day!",
    "mood": "🚀",
    "has_isic": true
  }
  ```
* **curl Test Command**:
  ```bash
  curl -X POST "https://apis.jsons.live/0jpsl/journal" \
       -H "Content-Type: application/json" \
       -d '{"title":"Sunset at Santaka Confluence","content":"Spent the evening walking down Laisvės alėja","mood":"🚀","has_isic":true}'
  ```
* **Postman Test Example**:
  * **Method**: `POST`
  * **URL**: `https://apis.jsons.live/0jpsl/journal`
  * **Headers**: `Content-Type: application/json`
