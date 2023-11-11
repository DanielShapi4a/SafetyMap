from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
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

# Find the main container div
results_div = soup.find("div", class_="col-12 px-3 col-lg-8")

# Find all the `<div>` elements with the class `"row row-gov ordered-fields"`
row_divs = results_div.find_all("div", class_="row row-gov ordered-fields")

# Extract the relevant information from each `<div>` element
for index,row_div in enumerate (row_divs,start=1):
    print(f"Block number {index}")
    try:
        # Find all the nested `<div>` elements with the class "col-12 col-sm-4 xs-p-0 xs-mb-10 xs-pe-20"
        info_divs = row_div.find_all("div", class_="col-12 col-sm-4 xs-p-0 xs-mb-10 xs-pe-20")

        # Iterate through each nested div to extract information
        for info_div in info_divs:
            # Extract information from <span> or <label> elements within the nested div
            span_text = info_div.find("span").text.strip() if info_div.find("span") else ""
            label_text = info_div.find("label").text.strip() if info_div.find("label") else ""

            # Print the extracted information
            print(f"Span Text: {span_text}")
            print(f"Label Text: {label_text}")


    except (AttributeError, IndexError) as e:
        # Handle errors gracefully if information not found
        print(f"Error extracting data: {e}")
        print("--------------------------------")
    print("--------------------------------")

# Close the Chrome WebDriver when done
driver.quit()


