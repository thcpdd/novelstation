import time
import pymysql
import sys

host = sys.argv[1]
port = int(sys.argv[2])
user = sys.argv[3]
password = sys.argv[4]
database = sys.argv[5]

while True:
    try:
        connection = pymysql.connect(host=host, port=port, user=user, password=password, database=database)
        print("MySQL is up - executing command")
        connection.close()
        break
    except pymysql.MySQLError:
        print(f"Waiting for MySQL at {host}:{port}...")
        time.sleep(1)
