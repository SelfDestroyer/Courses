import requests
from bs4 import BeautifulSoup

HOST = 'https://bank.gov.ua/en/'
HEADERS = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,'
              'application/signed-exchange;v=b3;q=0.9',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/97.0.4692.99 Mobile Safari/537.36 '
}


def get_html(url, params=''):
    request = requests.get(url, headers=HEADERS, params=params)
    return request


def get_content(html):
    soup = BeautifulSoup(html, 'html.parser')
    table_rows = map(lambda el: el.select('td'), soup.find('tbody').findAll('tr'))
    values = map(lambda table_row: list(map(lambda el: el.get_text().strip(), table_row)), table_rows)
    keys = ['digitalCode', 'letterCode', 'numberOfCurrencyUnits', 'currencyName', 'exchangeRate']

    return list(map(lambda el: dict(zip(keys, el)), values))


if __name__ == "__main__":
    url = 'https://bank.gov.ua/en/markets/exchangerates?date=2021-01-07&period=daily'
    print(get_content(get_html(url).text))
    list(map(lambda dic: print(dic, end='\n'), get_content(get_html(url).text)))
