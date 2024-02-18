import json

from fastapi import FastAPI
from uagents import Model
from uagents.query import query

AGENT_ADDRESS = "agent1qggdqhn33xrmezcfj672k98rdgsj02s9fjdzndtzyer5r4j0hgx3cd6c3qe"

class RequestSchema(Model):
    message: str

async def agent_query(req):
    print("REQQQQQQ: ", req)
    response = await query(destination=AGENT_ADDRESS, message=req, timeout=20000)
    data = json.loads(response.decode_payload())
    # print("DATA Proxy: ", data)
    print(data)
    return data["image_list"]

app = FastAPI()

@app.get("/")
def read_root():
    return "Hello from the Agent controller"

@app.post("/endpoint")
async def make_agent_call(req: RequestSchema):
    try:
        res = await agent_query(req)
        return f"Successful call - Agent Response: {res}"
    except Exception as e:
        print(e)
        # raise e
        return "Unsuccessful Agent call"
