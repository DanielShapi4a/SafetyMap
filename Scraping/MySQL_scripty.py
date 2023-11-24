import mysql.connector

# Replace 'your_database', 'your_table', 'your_username', and 'your_password' with your actual database information
database_name = 'scrape_project'
table_name = 'data'
username = 'root'
password = '1234'

text_file_path = 'C:/Git/Proj/Updated_Changed_CSV_asTXT2.txt'

conn = mysql.connector.connect(host='localhost', user=username, password=password, database=database_name)
cursor = conn.cursor()

# Load data from text file into MySQL table
query = f"""
    LOAD DATA LOCAL INFILE '{text_file_path}'
    INTO TABLE {table_name}
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\\n';
"""

cursor.execute(query)

# Commit the transaction and close the connection
conn.commit()
conn.close()
