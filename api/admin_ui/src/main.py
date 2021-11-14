from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from sqlalchemy import event
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.engine import Engine

import models
from api.api import api_router
from db.database import engine

from starlette_exporter import PrometheusMiddleware, handle_metrics

origins = [
    "http://localhost:3000",
    "https://loving-easley-7c1b0c.netlify.app/",
    "https://loving-easley-7c1b0c.netlify.app"
]

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(PrometheusMiddleware, app_name="game_of_thrones", group_paths=True, prefix='GOT')
app.add_route("/metrics", handle_metrics)

app.include_router(api_router)
models.Base.metadata.create_all(bind=engine)
models.Student.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")
