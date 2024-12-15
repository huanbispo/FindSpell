FROM python:3.10-slim

EXPOSE 8000

WORKDIR /app

COPY /src/backend/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
