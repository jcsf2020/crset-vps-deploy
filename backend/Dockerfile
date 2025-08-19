FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY src/ /app/

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# 👇 Força shell para expandir $PORT mesmo se o Railway sobrescrever o CMD
ENTRYPOINT ["/bin/sh","-lc"]
CMD "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"