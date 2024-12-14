#url1 ='https://www.google.com/finance/quote/INFY:NSE'
#url2 ='https://www.google.com/finance/quote/500209:BOM'

import requests
from bs4 import BeatifulSoup
import time
ticker = 'INFY'
url=f'https://www.google.com/finance/quote/{ticker}:NSE'
response = requests.get(url)
soup = BeatifulSoup(response.text, 'html.parser')




