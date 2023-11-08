from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.gov.il/he/departments/dynamiccollectors/travel-warnings-nsc?skip=0"

# Import the ChromeDriverManager class
from webdriver_manager.chrome import ChromeDriverManager

# Download the ChromeDriver executable if not already installed
service = Service(ChromeDriverManager().install())

# Configure the Chrome options
options = Options()
options.headless = True  # Run in headless mode (no GUI)

# Initialize the Chrome WebDriver using the ChromeDriver service and options
driver = webdriver.Chrome(service=service, options=options)
driver.get(url)

# Wait for the page to load
print('Waiting to Load data...')
wait = WebDriverWait(driver, 10)

# Get the page source and parse it with BeautifulSoup
page_source = driver.page_source
soup = BeautifulSoup(page_source, "html.parser")

results_div = soup.find("div", class_="col-12 px-3 col-lg-8")

# Find all the `<div>` elements with the class `"row row-gov"`
row_divs = results_div.find_all("div", class_="row row-gov")

# Extract the relevant information from each `<div>` element
for row_div in row_divs:
    try:
        # Extract the country of the travel warning
        country_span = row_div.find("span", class_="mr-1 ng-binding ng-scope")
        country = country_span.text.strip()

        # Extract the travel advisory level of the travel warning
        advisory_level_span = row_div.find("span", class_='mr-1 xs-me-10 error-txt ng-binding')
        advisory_level = advisory_level_span.text.strip()

        # Print the extracted information
        print(f"Country: {country}")
        print(f"Advisory Level: {advisory_level}")
        print("--------------------------------")

    except (AttributeError, IndexError) as e:
        # Handle errors gracefully if country or advisory level not found
        print(f"Error extracting data: {e}")
        print("--------------------------------")

# Close the Chrome WebDriver when done
driver.quit()
