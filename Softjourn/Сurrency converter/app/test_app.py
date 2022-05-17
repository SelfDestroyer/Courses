import re
from random import *

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from webdriver_manager.chrome import ChromeDriverManager

from converter import app


class TestViews:

    def setup(self):
        app.testing = True
        self.client = app.test_client()
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.error_messages = ['Choose a foreign currency',
                               'Input the amount of currency and select the foreign currency',
                               'The "Amount of currency" field must not be blank, it must not contain Cyrillic, '
                               'Latin and symbols. The input data must be an integer (100, 2, 12 etc.) or a floating '
                               'point number (10.21, 2.23, 12.123 etc.).']
        self.test_bad_data = ['adidas', '2.2as2', '2,asd12', '!@#$%^', 'sad 12 3123 ', '    ', '-10asd0', '12$!2@$3',
                              '-12',
                              '-122,312']
        self.test_date = ['14.5.2010', '21.1.2014', '1.2.2022', '1.1.2022', '27.11.2016', '14.2.2001',
                          '24.6.2020', '3.3.2003', '12.9.2011', '18.11.2019', '10.10.2021', '1.2.2022',
                          '12.11.2013', '25.3.2002']
        self.test_user_money = [1000, 123, 2.4, 1231, 123, 1313, 1.2, 1231, 1222, 13132, 123.123, 12578, 2.4141, 25.125,
                                125.123123, 1256.12311, 123.21]

    def test_check_http_status_code(self):
        # Check page menu
        page_menu = self.client.get('/')
        assert page_menu.status_code == 200

        # Check page exchange rates
        page_exchange_rates = self.client.get('/exchange_rates')
        assert page_exchange_rates.status_code == 200

        # Check page UAH to foreign currency
        uah_to_foreign_currency = self.client.get('/UAH_to_foreign_currency')
        assert uah_to_foreign_currency.status_code == 200

        # Check page foreign currency to UAH
        foreign_currency_to_uah = self.client.get('/foreign_currency_to_UAH')
        assert foreign_currency_to_uah.status_code == 200

    def test_check_error_messages(self):
        # Check errors on page UAH to foreign currency
        self.driver.get('http://localhost:5000/UAH_to_foreign_currency')
        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')

        amount_of_currency.send_keys(choice(self.test_bad_data))
        btn_exchange.click()
        err_message = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/div').text

        assert err_message in self.error_messages

        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')
        amount_of_currency.send_keys(choice(self.test_bad_data))
        element_select = self.driver.find_element(By.XPATH, '//*[@id="currencyName"]')
        option = Select(element_select).options
        random_option = option[randint(0, len(option) - 1)]
        self.driver.find_element(By.XPATH, f"//*[@value='{random_option.get_attribute('value')}']").click()
        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        btn_exchange.click()

        err_message = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/div').text

        assert err_message in self.error_messages

        # Check errors on page foreign currency to  UAH
        self.driver.get('http://localhost:5000/foreign_currency_to_UAH')
        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')

        amount_of_currency.send_keys(choice(self.test_bad_data))
        btn_exchange.click()
        err_message = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/div').text

        assert err_message in self.error_messages

        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')
        amount_of_currency.send_keys(choice(self.test_bad_data))
        element_select = self.driver.find_element(By.XPATH, '//*[@id="currencyName"]')
        option = Select(element_select).options
        random_option = option[randint(0, len(option) - 1)]
        self.driver.find_element(By.XPATH, f"//*[@value='{random_option.get_attribute('value')}']").click()
        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        btn_exchange.click()

        err_message = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/div').text

        assert err_message in self.error_messages

        self.driver.quit()

    def test_menu_page(self):
        menu_el = ['FOREX converter UAH to foreign currency as of today (NBU rates)',
                   'FOREX converter foreign currency to UAH as of today (NBU rates)',
                   'FOREX ratings as of selected date (NBU rates)']

        self.driver.get('http://localhost:5000/')
        assert 'Menu' in self.driver.title

        links = self.driver.find_elements(By.TAG_NAME, 'a')
        assert [el.text for el in links] == menu_el

        self.driver.quit()

    def test_exchange_rates(self):
        date_for_test = choice(self.test_date)

        self.driver.get('http://localhost:5000/exchange_rates')

        date_picker = self.driver.find_element(By.XPATH, '//*[@id="datePicker"]')
        date_picker.send_keys(date_for_test)

        btn = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div/div/button')
        btn.click()

        date_on_page = '.'.join(
            re.findall(r'[\d]+', self.driver.find_element(By.XPATH, '/html/body/main/div/div/h1').text))

        assert date_for_test == date_on_page

        self.driver.quit()

    def test_calculations(self):
        # Check test_calculations on page UAH to foreign currency
        user_money = choice(self.test_user_money)
        self.driver.get('http://localhost:5000/UAH_to_foreign_currency')

        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')

        amount_of_currency.send_keys(user_money)

        element_select = self.driver.find_element(By.XPATH, '//*[@id="currencyName"]')
        option = Select(element_select).options
        random_option = option[randint(0, len(option) - 1)]
        unit = self.driver.find_element(By.XPATH,
                                        f"//*[@value='{random_option.get_attribute('value')}']").get_attribute(
            'data-unit')
        exchange_rate = self.driver.find_element(By.XPATH,
                                                 f"//*[@value='{random_option.get_attribute('value')}']").get_attribute(
            'data-exchangeRate')
        self.driver.find_element(By.XPATH, f"//*[@value='{random_option.get_attribute('value')}']").click()
        btn_exchange.click()

        result_calculation = float(
            self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/span/span').text)
        test_result = float(re.search(r'(?=.*\d)\d*(?:\.\d{0,2})?',
                                      str((float(user_money) / float(exchange_rate)) * float(unit))).group(0))

        assert result_calculation == test_result

        # Check test_calculations on page foreign currency to UAH

        self.driver.get('http://localhost:5000/foreign_currency_to_UAH')

        btn_exchange = self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/button')
        amount_of_currency = self.driver.find_element(By.XPATH, '//*[@id="amountOfCurrency"]')

        amount_of_currency.send_keys(user_money)

        element_select = self.driver.find_element(By.XPATH, '//*[@id="currencyName"]')
        option = Select(element_select).options
        random_option = option[randint(0, len(option) - 1)]
        unit = self.driver.find_element(By.XPATH,
                                        f"//*[@value='{random_option.get_attribute('value')}']").get_attribute(
            'data-unit')
        exchange_rate = self.driver.find_element(By.XPATH,
                                                 f"//*[@value='{random_option.get_attribute('value')}']").get_attribute(
            'data-exchangeRate')
        self.driver.find_element(By.XPATH, f"//*[@value='{random_option.get_attribute('value')}']").click()
        btn_exchange.click()

        result_calculation = float(
            self.driver.find_element(By.XPATH, '/html/body/main/div/div/div/form/div[3]/span/span').text)
        test_result = float(re.search(r'(?=.*\d)\d*(?:\.\d{0,2})?',
                                      str((float(exchange_rate) * float(user_money)) / float(unit))).group(0))

        assert result_calculation == test_result

        self.driver.quit()