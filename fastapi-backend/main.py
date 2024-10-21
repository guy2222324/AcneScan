from fastapi import FastAPI
from routes import router  # Import router จากไฟล์ routes.py

app = FastAPI()

# เชื่อมต่อ router กับแอปพลิเคชันหลัก
app.include_router(router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI"}
