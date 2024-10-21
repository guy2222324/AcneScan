from pydantic import BaseModel

# สร้างโมเดลข้อมูลสำหรับรับ request
class AnalyzeRequest(BaseModel):
    name: str
    age: int
