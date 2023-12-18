import pandas as pd
import csv

# Input and output file paths
input_file_path = r'C:\Git\Proj\Scraping\English YESYESYES.txt'
output_file_path = r'C:\Git\Proj\Scraping\Translated-Please-Work-Xdddd.csv'

# Read the data from the input file using pandas
data = pd.read_csv(input_file_path, encoding='utf-8')

print(data.columns)

# Modify the columns as needed
data['Warning Level'] = data['Warning Level'].apply(lambda x: f'"{x}"')
data['Recommendation'] = data['Recommendation'].apply(lambda x: f'"{x}"')
data['Detail'] = data.apply(lambda row: f'"{row["Detail"]},{row["The Threatened Area"]}"', axis=1)

# Write the modified data to a new CSV file
data.to_csv(output_file_path, index=False, quoting=csv.QUOTE_NONNUMERIC, encoding='utf-8')
