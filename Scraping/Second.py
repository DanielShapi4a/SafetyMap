import csv
import re

input_file_path = 'PleaseWork.csv'
output_file_path = 'final_data.csv'

def process_quotes(cell):
    # Remove quotes from the start and end of the cell
    cell = re.sub(r'^"+|"+$', '', cell)
    # Replace multiple quotes in the middle with a single quote
    cell = re.sub(r'"+', '"', cell)
    return cell

# Open the input file and read its contents
with open(input_file_path, 'r', encoding='ISO-8859-1') as input_file:
    # Read the lines from the file
    lines = input_file.readlines()

# Initialize variables to store the formatted data
formatted_data = []

# Process each line in the input file
for line in lines:
    # Use regular expression to fix double quotes inside cells
    line = re.sub(r'"(.*?)"', lambda match: process_quotes(match.group(1)), line)

    # Split the line into columns
    columns = csv.reader([line], delimiter=',', quotechar='"').__next__()

    # Combine extra columns into the last column
    if len(columns) > 5:
        columns[4] = ' '.join(columns[4:])

    # Truncate the list to have exactly 5 columns
    columns = columns[:5]

    # Process each cell to remove unwanted double quotes
    columns = [process_quotes(cell) for cell in columns]

    # Join the columns and add to the formatted data
    formatted_data.append(','.join(columns))

# Write the formatted data to the output file
with open(output_file_path, 'w', encoding='utf-8', newline='') as output_file:
    output_file.write('\n'.join(formatted_data))
