# FastAPI Tutorial

https://www.youtube.com/watch?v=-ykeT6kk4bk

# Development

1. cd admin_ui
2. python -m venv env/ (create your virtual environment)
3. source env/bin/activate (activate your virtual environment. google the command if you're on windows)
4. pip install -r src/requirements.txt (install required dependencies)
5. cd src && uvicorn main:app --reload
6. http://127.0.0.1:8000 or localhost:8000

# Unit Testing (pytest)

\*\*Note - if you get a sqlalchemy.exc.IntegrityError, chance are your `test.db` is still there, and already contains the entities (hence duplicatre error). Delete it via `rm admin_ui/src/test.db` (ensure it isn't open in DB Browser SQLite)

1. `cd admin_ui/src/`
2. `pip install -r requirements.txt` - ensure that you've all installed
3. [only run tests] `rm test.db & python -m pytest tests/`
4. [run tests and re-generate docs] `rm test.db & python -m pytest tests/ --docs tests/docs/docs.md --doc-type=md`
5. Only `.md` and `.rst` formats are supported, hence use https://www.markdowntopdf.com/ for conversion to report-friendly `.pdf`

# Pull Requests

[FOR GAME DEV TEAM] You can use `git commit --no-verify` to bypass these checks.

1. Git hooks are set on all commits. You won't be able to commit changes that fail **any** of these tests
   - black (formatter)
   - pylint (linter)
   - mypy (static type checker)
2. To fix it, ensure black, pylint, and mypy are installed (otherwise, `pip install black pylint mypy`)
3. Fix the warnings raised
   - black (formatter) - `black path/to/directory/` - formats all .py files in the directory, recursively
   - pylint (linter) - lints all .py files in the directory, recursively. Fix the errors manually.
   - mypy (static type checker) - checks for wrong types in all .py files in the directory, recursively. Fix the errors manually.

# Deployment - Deta

deta update --env admin_ui/src/.env (update ENV)
cd admin_ui/src && deta deploy

# Deployment - Azure VM + HTTP Tunneling

## Update host machine main branch

gco main && gp

## Start up application server

cd admin_ui/src/ && uvicorn main:app &
disown

## Start up HTTP tunnel

lt --port 8000 &
disown

## Deployment - Okteta

- https://okteto.com/blog/building-and-deploying-a-fastapi-app-in-okteto-cloud/
- https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker

- https://stackoverflow.com/questions/60819376/fastapi-throws-an-error-error-loading-asgi-app-could-not-import-module-api
- https://stackoverflow.com/questions/20632258/change-directory-command-in-docker

### Debugging things:

- May have to delete and regenerate sql.db due to changes in schema
