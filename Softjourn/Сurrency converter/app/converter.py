import re
import secrets
from datetime import *

import timestring
from flask import Flask, render_template, request, flash

from app.parser.parser import *

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex()


@app.route('/', methods=['GET', 'POST'])
def menu():
    return render_template('menu.html')


@app.route('/UAH_to_foreign_currency', methods=['GET', 'POST'])
def uah_to_foreign_currency():
    current_date = datetime.now().date().strftime("%d.%m.%Y")
    url = f'https://bank.gov.ua/en/markets/exchangerates?date={current_date}&period=daily'
    current_exchange_rate = get_content(get_html(url).text)
    user_currency = ''
    user_money = 0.0

    if request.method == 'POST':
        if request.form.get('amountOfCurrency'):
            uah = request.form.get('amountOfCurrency')
            letter_code = request.form.get('currencyName')

            if letter_code == 'selected' and len(uah.strip()) == 0:
                flash('Input the amount of currency and select the foreign currency')
            elif letter_code == 'selected':
                flash('Choose a foreign currency')
            else:
                try:
                    for el in current_exchange_rate:
                        if el['letterCode'] == letter_code:
                            user_money = float(re.search(r'(?=.*\d)\d*(?:\.\d{0,2})?',
                                                         str(float(uah.replace(',', '.')) / float(
                                                             el['exchangeRate'].replace(',', '.')) * float(
                                                             el['numberOfCurrencyUnits']))).group(0))
                            user_currency = el['letterCode']
                except ValueError:
                    flash(
                        'The "Amount of currency" field must not be blank, it must not contain Cyrillic, Latin and '
                        'symbols. The input data must be an integer (100, 2, 12 etc.) or a floating point number ('
                        '10.21, 2.23, 12.123 etc.).')

    return render_template('UAH_to_foreign_currency.html', current_exchange_rate=current_exchange_rate,
                           current_date=current_date,
                           user_currency=user_currency, user_money=user_money)


@app.route('/foreign_currency_to_UAH', methods=['GET', 'POST'])
def foreign_currency_to_uah():
    current_date = datetime.now().date().strftime("%d-%m-%Y")
    url = f'https://bank.gov.ua/en/markets/exchangerates?date={current_date}&period=daily'
    current_exchange_rate = get_content(get_html(url).text)
    user_currency = ''
    user_money = 0.0

    if request.method == 'POST':
        if request.form.get('amountOfCurrency'):
            foreign_currency = request.form.get('amountOfCurrency')
            letter_code = request.form.get('currencyName')

            if letter_code == 'selected' and len(foreign_currency.strip()) == 0:
                flash('Input the amount of currency and select the foreign currency')
            elif letter_code == 'selected':
                flash('Choose a foreign currency')
            else:
                try:
                    for el in current_exchange_rate:
                        if el['letterCode'] == letter_code:
                            user_money = float(re.search(r'(?=.*\d)\d*(?:\.\d{0,2})?',
                                                         str(float(el['exchangeRate'].replace(',', '.')) * float(
                                                             foreign_currency.replace(',', '.')) / float(
                                                             el['numberOfCurrencyUnits']))).group(0))

                            user_currency = el['letterCode']
                except ValueError:
                    flash(
                        'The "Amount of currency" field must not be blank, it must not contain Cyrillic, Latin and '
                        'symbols. The input data must be an integer (100, 2, 12 etc.) or a floating point number ('
                        '10.21, 2.23, 12.123 etc.).')

    return render_template('foreign_currency_to_UAH.html', current_exchange_rate=current_exchange_rate,
                           current_date=current_date,
                           user_currency=user_currency, user_money=user_money)


@app.route('/exchange_rates', methods=['GET', 'POST'])
def exchange_rates():
    current_date = datetime.now().date().strftime("%d-%m-%Y")
    url = f'https://bank.gov.ua/en/markets/exchangerates?date={current_date}&period=daily'
    max_date = datetime.now().date().strftime("%Y-%m-%m")
    min_date = '2000-01-01'


    if request.method == 'POST':
        if request.form.get('datePicker'):
            user_date = timestring.Date(request.form.get('datePicker'))

            url = f'https://bank.gov.ua/en/markets/exchangerates?date={user_date.year}-{user_date.month}-{user_date.day}&period=daily'
            current_date = f'{user_date.day}-{user_date.month}-{user_date.year}'

    user_exchange_rate = get_content(get_html(url).text)

    return render_template('exchange_rates.html',
                           current_date=current_date,
                           user_exchange_rate=user_exchange_rate,
                           max_date=max_date,
                           min_date=min_date)


if __name__ == '__main__':
    app.run(debug=True)
