import os, time, json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt, bcrypt

BOOT = time.time()
app = FastAPI()

CORS = os.getenv("CORS_ORIGINS","*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JWT_SECRET = os.getenv("JWT_SECRET","dev")
ADMIN_USER="admin"
# hash de 'admin123' (bcrypt cost 12) — igual ao seed
ADMIN_HASH=b"$2b$12$0w8Uppv4W49q7QfYw3Z6KOf0Qb2i7sP0rA7mN1QmXy1q2ZgF.7aGK"

class ContactIn(BaseModel):
    name:str
    email:str
    message:str

class ChatIn(BaseModel):
    message:str

class LoginIn(BaseModel):
    username:str
    password:str

@app.get("/health")
def health():
    return {"env":"production","status":"ok","uptime_s": round(time.time()-BOOT,2)}

@app.post("/api/contact")
def contact(payload: ContactIn):
    # Aqui podes inserir em DB e enviar via Resend depois (placeholder)
    return {"ok":True,"echo":payload.model_dump()}

@app.post("/api/chat")
def chat(payload: ChatIn):
    # Placeholder IA — responde echo; depois liga OpenAI
    return {"reply":"pong","echo":payload.model_dump()}

@app.post("/api/admin/login")
def login(payload: LoginIn):
    if payload.username != ADMIN_USER or not bcrypt.checkpw(payload.password.encode(), ADMIN_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"sub":"admin"}, JWT_SECRET, algorithm="HS256")
    return {"token": token}

