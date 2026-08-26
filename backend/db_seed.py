from db import init_db, get_db_connection

def seed_data():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Clear existing data to avoid duplicates on re-run
    cursor.execute("DELETE FROM isic_benefits")
    cursor.execute("DELETE FROM erasmus_entitlements")
    cursor.execute("DELETE FROM attractions")

    # Seed ISIC card benefits in Kaunas/Lithuania
    isic_benefits = [
        ("Kaunas Public Transport", "transport", 0.80, 28.00, 5.60, "Kaunas City", "80% student discount on local transit monthly pass"),
        ("Kaunas Castle Museum", "culture", 0.50, 4.00, 2.00, "Pilies g. 17, Kaunas", "50% off entrance fee to the medieval castle exhibition"),
        ("M. K. Čiurlionis National Art Museum", "culture", 0.50, 6.00, 3.00, "V. Putvinskio g. 55, Kaunas", "50% off entrance to the art and music collection"),
        ("Vero Cafe", "food", 0.10, 3.50, 3.15, "Laisvės al. & multiple locations", "10% off all coffee beverages and pastries with student card"),
        ("Kaunas City Hostel", "accommodation", 0.20, 20.00, 16.00, "Laisvės al. 90", "20% student discount on standard dormitory beds"),
        ("Pizza Express", "food", 0.15, 8.00, 6.80, "Laisvės al. 56", "15% off standard large pizzas"),
        ("Talutti Bakes 'n' Shakes", "food", 0.10, 12.00, 10.80, "Vasario 16-osios g. 2", "10% discount on food orders with ISIC card"),
        ("Ninth Fort Museum", "culture", 0.50, 5.00, 2.50, "Žemaičių pl. 73", "50% discount on historical museum and underground fort tour")
    ]

    cursor.executemany("""
    INSERT INTO isic_benefits (partner, benefit_type, discount_pct, standard_cost, student_cost, location, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, isic_benefits)

    # Seed Erasmus Entitlements
    erasmus_entitlements = [
        ("Ryanair", "10% off flights & free checked-in bag", "Active ESNcard registered on ESN website"),
        ("FlixBus", "10-15% discount vouchers for student trips", "ESNcard holder single-use code"),
        ("ESN Kaunas Local Partners", "Free entry to weekly cultural events and ESN parties", "Erasmus student registration or ESNcard"),
        ("Gym+ Kaunas", "Student subscription discount (25% off monthly fee)", "Student certificate or ESNcard")
    ]

    cursor.executemany("""
    INSERT INTO erasmus_entitlements (partner, discount_desc, criteria)
    VALUES (?, ?, ?)
    """, erasmus_entitlements)

    # Seed attractions in Kaunas (including free-entry spots)
    attractions = [
        ("Oakwood Park (Ąžuolynas)", "nature", 0.0, 0.0, "Radvilėnų pl.", 1, "Largest urban oak stand in Europe, perfect for running, walking, and study breaks"),
        ("Santaka Park & Nemunas-Neris Confluence", "nature", 0.0, 0.0, "Pilies g. 1", 1, "The beautiful park where Lithuania's two largest rivers merge, hosting the old altar site"),
        ("St. Michael the Archangel Church (Soboras)", "sightseeing", 0.0, 0.0, "Nepriklausomybės aikštė 14", 1, "Stunning Neo-Byzantine dome church at the end of Laisvės alėja"),
        ("Kaunas Old Town & Town Hall Square", "sightseeing", 0.0, 0.0, "Rotušės aikštė", 1, "Beautiful historic square featuring the 'White Swan' Town Hall, gothic houses, and street cafes"),
        ("Pažaislis Monastery Trail & Kaunas Reservoir", "nature", 0.0, 0.0, "T. Masiulio g. 31", 1, "Scenic walk along the reservoir shoreline with sandy beaches and views of the baroque monastery"),
        ("Žaliakalnis Funicular Railway", "transport", 1.50, 0.75, "Aušros tak. 6", 0, "Historic cable railway from 1931 taking students up the hill to Christ's Resurrection Church"),
        ("Christ's Resurrection Basilica (Terrace)", "sightseeing", 2.50, 1.25, "Žemaičių g. 31A", 0, "Panoramic view of Kaunas city from the church roof terrace"),
        ("Devil's Museum (Žmuidzinavičius Collection)", "culture", 5.00, 2.50, "V. Putvinskio g. 64", 0, "The world's only dedicated museum exhibiting 3,000+ devil carvings and sculptures")
    ]

    cursor.executemany("""
    INSERT INTO attractions (name, type, standard_cost, student_cost, location, is_free, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, attractions)

    conn.commit()
    conn.close()
    print("Database seeded with Kaunas/Lithuania data successfully.")

if __name__ == "__main__":
    seed_data()
