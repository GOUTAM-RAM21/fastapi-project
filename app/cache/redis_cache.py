import os
import redis
import json
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

redis_client = redis.StrictRedis.from_url(
    REDIS_URL, decode_responses=True
)

# 🔍 Get cached data
def get_cached_prediction(key: str):
    value = redis_client.get(key)
    return json.loads(value) if value else None


# 💾 Set cached data
def set_cached_prediction(key: str, value: dict):
    redis_client.set(key, json.dumps(value))