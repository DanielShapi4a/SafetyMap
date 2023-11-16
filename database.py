import pandas as pd
import sqlite3

# Read the CSV file into a pandas DataFrame
csv_file = 'PleaseWork.csv'
data = pd.read_csv(csv_file)

# Connect to a SQLite database
conn = sqlite3.connect('database_name.db')

# Convert DataFrame to SQL and write to the database
data.to_sql('table', conn, if_exists='replace', index=False)

# Commit changes and close connection
conn.commit()
conn.close()

print("CSV data uploaded to SQLite database successfully.")
