import csv

input_file_path = 'scraped.csv'
output_file_path = 'Updated_Changed_CSV.csv'

# Define the column names
column_names = ["Country", "warning level", "recommendation", "the threatened area", "detail"]

# Initialize variables to store data
current_country_data = []
transformed_data = []

# Open the input file and read its contents, skipping the first two rows
with open(input_file_path, 'r', encoding='utf-8') as input_file:
    csv_reader = csv.reader(input_file, delimiter='\t')
    
    # Skip the first two rows
    next(csv_reader)  # Skip the first row
    next(csv_reader)  # Skip the second row
    
    for row in csv_reader:
        # Process each element in the row to remove irrelevant words and commas
        cleaned_row = [element.rsplit(',', 1)[0].strip() for element in row]
        current_country_data.append(cleaned_row)
        
        # Check if we have collected data for one country (6 rows)
        if len(current_country_data) == 6:
            # Append the data for one country as a single row with column names
            transformed_data.append(dict(zip(column_names, [item[0] for item in current_country_data])))
            current_country_data = []

# Write the transformed data to the output file
with open(output_file_path, 'w', encoding='utf-8', newline='') as output_file:
    csv_writer = csv.DictWriter(output_file, fieldnames=column_names)
    csv_writer.writeheader()
    csv_writer.writerows(transformed_data)
    