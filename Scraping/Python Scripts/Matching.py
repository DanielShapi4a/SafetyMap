import pandas as pd
import csv

# Step 1: Read Old CSV File
old_data = pd.read_csv('safety-info.safety.csv')  # Replace 'safety-info.safety.csv' with your actual file name

# Step 2: Read New Text File
unmatched_countries = []  # To store unmatched countries for manual checking
new_data_dict = {}

with open('English-Translate-27-12-23.txt', 'r') as file:  # Replace 'English-Translate-27-12-23.txt' with your actual file name
    csv_reader = csv.reader(file)
    for line in csv_reader:
        # Step 3: Update Data
        if len(line) >= 5:
            country_name = line[0]

            # Store new data in a dictionary
            new_data_dict[country_name] = {
                'Warning Level': line[1],
                'Recommendation': line[2],
                'The Threatened Area': line[3],
                'Detail': line[4]
            }
        else:
            print(f"Skipping line: {line}")

# Step 4: Update Data in Old CSV File
for index, row in old_data.iterrows():
    country_name = row['Country']

    # Check if the country exists in the new data dictionary
    if country_name in new_data_dict:
        old_data.at[index, 'Warning Level'] = new_data_dict[country_name]['Warning Level']
        old_data.at[index, 'Recommendation'] = new_data_dict[country_name]['Recommendation']
        old_data.at[index, 'The Threatened Area'] = new_data_dict[country_name]['The Threatened Area']
        old_data.at[index, 'Detail'] = new_data_dict[country_name]['Detail']
    else:
        unmatched_countries.append(f"{country_name},{row['Warning Level']},{row['Recommendation']},{row['The Threatened Area']},{row['Detail']}\n")

# Step 5: Create CSV with Updated Data
old_data.to_csv('updated_data.csv', index=False, quoting=csv.QUOTE_NONNUMERIC)  # Use quoting to preserve quotes

# Step 6: Create Unmatched Countries File
with open('unmatched_countries.txt', 'w') as unmatched_file:
    unmatched_file.writelines(unmatched_countries)
