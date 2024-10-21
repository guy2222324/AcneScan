from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    if file:
        # เพิ่ม log เพื่อพิมพ์ชื่อไฟล์ที่รับเข้ามา
        print(f"Received file: {file.filename}")
    else:
        # เพิ่ม log เมื่อไม่ได้รับไฟล์
        print("No file received")
    
    contents = await file.read()  # อ่านเนื้อหาของไฟล์
    analysis_result = "Analysis complete."
    
    return {"filename": file.filename, "message": analysis_result}
