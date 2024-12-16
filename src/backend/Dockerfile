FROM python:3.10-slim

WORKDIR /app/backend

COPY ./requirements.txt /app/backend/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/backend /app/backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
