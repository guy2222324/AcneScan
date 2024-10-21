from fastapi import APIRouter, UploadFile, File
from models import AnalyzeRequest  # ตรวจสอบว่าไฟล์ models มีอยู่จริง

router = APIRouter()

@router.post("/analyze/")
async def analyze(request: AnalyzeRequest):
    analysis_result = f"{request.name} is {request.age} years old. Analysis complete."
    return {"data": request, "message": analysis_result}

@router.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    return {"filename": file.filename, "content_type": file.content_type}
