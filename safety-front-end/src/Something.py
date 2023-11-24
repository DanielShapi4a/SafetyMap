import json
# Read the GeoJSON file
with open('C:\\Git\\Proj\\safety-front-end\\src\\countries.geo.json', 'r') as geojson_file:
    geojson_data = json.load(geojson_file)

# Sample data from other files or database
additional_properties = {
    "property1": "value1",
    "property2": "value2",
    "property3": "value3"
    # Add more properties as needed
}

# Add the additional properties to the 'properties' section of each feature in the GeoJSON
for feature in geojson_data['features']:
    feature['properties'].update(additional_properties)

# Write the updated GeoJSON back to the file
with open('geojson_with_additional_data.json', 'w') as output_file:
    json.dump(geojson_data, output_file, indent=2)