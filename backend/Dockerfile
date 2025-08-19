FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY src/ /app/

# Script de arranque que expande ${PORT}
RUN printf '%s\n' '#!/bin/sh' \
  'PORT="${PORT:-8000}"' \
  'exec uvicorn app.main:app --host 0.0.0.0 --port "$PORT"' > /app/start.sh \
  && chmod +x /app/start.sh

EXPOSE 8000
CMD ["/bin/sh","-lc","/app/start.sh"]
