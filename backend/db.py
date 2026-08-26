import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tripex.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # ISIC Benefits
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS isic_benefits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        partner TEXT NOT NULL,
        benefit_type TEXT NOT NULL,
        discount_pct REAL NOT NULL,
        standard_cost REAL,
        student_cost REAL,
        location TEXT,
        description TEXT
    )
    """)

    # Erasmus Entitlements (e.g. ESN card benefits)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS erasmus_entitlements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        partner TEXT NOT NULL,
        discount_desc TEXT NOT NULL,
        criteria TEXT
    )
    """)

    # Attractions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS attractions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        standard_cost REAL NOT NULL,
        student_cost REAL NOT NULL,
        location TEXT,
        is_free INTEGER NOT NULL DEFAULT 0,
        description TEXT
    )
    """)

    # Saved Itineraries
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS itineraries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        destination TEXT NOT NULL,
        budget REAL NOT NULL,
        duration INTEGER NOT NULL,
        has_isic INTEGER NOT NULL DEFAULT 0,
        itinerary_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database tables initialized successfully.")
