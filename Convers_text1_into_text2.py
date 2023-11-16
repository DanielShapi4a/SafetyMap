import openpyxl
import csv
import pandas as pd
from io import StringIO

# Read the text file with 'utf-16' encoding
with open('Updated_Changed_CSV_asTXT2.txt', 'r', encoding='utf-16') as file:
    text_data = file.read()

# Replace commas within double quotes with a placeholder
text_data = text_data.replace('","', '"REPLACE_COMMA"')

# Use StringIO to create a file-like object for pandas to read
csv_data = csv.reader(StringIO(text_data), delimiter=',')

# Convert the CSV data to a list of lists
data_list = [row for row in csv_data]

# Replace the placeholder with a comma in the data list
data_list = [[item.replace('REPLACE_COMMA', ',') for item in row] for row in data_list]

# Create a new Excel workbook
workbook = openpyxl.Workbook()
sheet = workbook.active

# Write the header to the Excel sheet
# header = ["Country", "Warning Level", "Recommendation", "Threatened Area", "Detail"]
# sheet.append(header)

# Write the data to the Excel sheet
for row in data_list:
    sheet.append(row)

# Save the Excel file
workbook.save('output_file.xlsx')
