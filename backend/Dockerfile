FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY src/ /app/
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# Bloqueia overrides do Railway: arranque passa SEMPRE por aqui
ENTRYPOINT ["/app/entrypoint.sh"]