from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import csv

app = FastAPI()

# 🔹 Nạp dữ liệu từ file cards.csv
def load_cards_from_csv():
    cards = []
    try:
        with open("cards.csv", newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                cards.append({
                    "id": int(row["id"]),
                    "name": row["name"],
                    "attack": int(row["attack"]),
                    "defense": int(row["defense"]),
                    "rarity": int(row.get("rarity", 1))  # Mặc định rarity = 1 nếu không có
                })
    except Exception as e:
        print(f"Error loading cards: {e}")
    return cards

# Cơ sở dữ liệu thẻ bài
cards_db = load_cards_from_csv()

# 🔹 Schema cho thẻ bài
class Card(BaseModel):
    name: str
    attack: int
    defense: int
    rarity: int

# 📌 API lấy danh sách thẻ bài
@app.get("/cards", response_model=List[dict])
def get_cards():
    return cards_db

# 📌 API lấy chi tiết 1 thẻ bài theo ID
@app.get("/cards/{card_id}")
def get_card(card_id: int):
    for card in cards_db:
        if card["id"] == card_id:
            return card
    raise HTTPException(status_code=404, detail="Card not found")

# 📌 API thêm thẻ bài mới
@app.post("/cards", response_model=dict)
def add_card(card: Card):
    new_card = {"id": max([c["id"] for c in cards_db]) + 1 if cards_db else 1, **card.dict()}
    cards_db.append(new_card)
    with open("cards.csv", mode="w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["id", "name", "attack", "defense", "rarity"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cards_db)
    return new_card

# 📌 API cập nhật thẻ bài
@app.put("/cards/{card_id}")
def update_card(card_id: int, card: Card):
    for index, existing_card in enumerate(cards_db):
        if existing_card["id"] == card_id:
            cards_db[index].update(card.dict())
            with open("cards.csv", mode="w", newline="", encoding="utf-8") as csvfile:
                fieldnames = ["id", "name", "attack", "defense", "rarity"]
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(cards_db)
            return cards_db[index]
    raise HTTPException(status_code=404, detail="Card not found")

# 📌 API xóa thẻ bài
@app.delete("/cards/{card_id}")
def delete_card(card_id: int):
    for index, card in enumerate(cards_db):
        if card["id"] == card_id:
            del cards_db[index]
            with open("cards.csv", mode="w", newline="", encoding="utf-8") as csvfile:
                fieldnames = ["id", "name", "attack", "defense", "rarity"]
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(cards_db)
            return {"message": "Card deleted"}
    raise HTTPException(status_code=404, detail="Card not found")

# 📌 API mở khóa thẻ UNLOCK
@app.put("/cards/unlock")
def unlock_card():
    for index, card in enumerate(cards_db):
        if card["name"] == "UNLOCK":
            cards_db[index]["rarity"] = 3
            with open("cards.csv", mode="w", newline="", encoding="utf-8") as csvfile:
                fieldnames = ["id", "name", "attack", "defense", "rarity"]
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(cards_db)
            return cards_db[index]
    raise HTTPException(status_code=404, detail="UNLOCK card not found")
