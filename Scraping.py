from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import pandas as pd
from selenium.common.exceptions import NoSuchElementException

# Import the ChromeDriverManager class
from webdriver_manager.chrome import ChromeDriverManager

# Configure the Chrome options
options = Options()
options.headless = True  # Run in headless mode (no GUI)

# Initialize an empty DataFrame to store the results
result_df = pd.DataFrame()

# Iterate through multiple pages (adjust the range as needed)
for skip_value in range(0, 20, 10):
    url = f"https://www.gov.il/he/departments/dynamiccollectors/travel-warnings-nsc?skip={skip_value}"

    # Download the ChromeDriver executable if not already installed
    service = Service(ChromeDriverManager().install())

    # Initialize the Chrome WebDriver using the ChromeDriver service and options
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)

    try:
        # Wait for the page to load
        print('Waiting to Load data...')
        wait = WebDriverWait(driver, 10)

        # Get the page source and parse it with BeautifulSoup
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")

        # Find the main container div
        results_div = soup.find("div", class_="col-12 px-3 col-lg-8")

        # Check if the main container div is found
        if results_div:
            # Find all the `<div>` elements with the class `"row row-gov ordered-fields"`
            row_divs = results_div.find_all("div", class_="row row-gov ordered-fields")

            # Extract the relevant information from each `<div>` element
            for index, row_div in enumerate(row_divs, start=1):
                print(f"Block number {index}")
                try:
                    # Find all the nested `<div>` elements with the class "col-12 col-sm-4 xs-p-0 xs-mb-10 xs-pe-20"
                    info_divs = row_div.find_all("div", class_="col-12 col-sm-4 xs-p-0 xs-mb-10 xs-pe-20")

                    # Create a dictionary to store the data for the current row
                    row_data = {}

                    # Iterate through each nested div to extract information
                    for info_div in info_divs:
                        # Extract information from <span> or <label> elements within the nested div
                        span_text = info_div.find("span").text.strip() if info_div.find("span") else ""
                        label_text = info_div.find("label").text.strip() if info_div.find("label") else ""

                        # Add the data to the row dictionary
                        row_data[label_text] = span_text

                    # Append the row dictionary to the DataFrame
                    result_df = result_df.append(row_data, ignore_index=True)

                except (AttributeError, IndexError) as e:
                    # Handle errors gracefully if information not found
                    print(f"Error extracting data: {e}")
                    print("--------------------------------")

        else:
            print("Main container div not found. Skipping this page.")
            print("--------------------------------")

    except NoSuchElementException:
        # Handle exception when the URL doesn't exist or when the last available page is reached
        print(f"No more pages available. Terminating the loop.")
        break

    finally:
        # Close the Chrome WebDriver when done with the current page
        driver.quit()

# Save the DataFrame to a CSV file in UTF-8 format
result_df.to_csv("scraped_data.csv", index=False, encoding="utf-8")