# https://stackoverflow.com/questions/11643611/execute-sqlite-script

rm admin_ui/src/sql_app.db

cd admin_ui/src 

uvicorn main:app --reload --port 8080 --host 0.0.0.0 &

sleep 5

kill -9 $(lsof -ti:8080)

sqlite3 sql_app.db < db/dummy_data.sql

cd ../..

bash quick_deploy.sh
