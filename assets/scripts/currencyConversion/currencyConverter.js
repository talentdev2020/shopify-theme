Shopify.theme.currencyConverter = {
  init(settings) {

    this.defaults = {
      switcherSelector: '[data-currency-converter]',
      priceSelector: 'span.money',
      shopCurrency: Currency.shop_currency,
      defaultCurrency: Currency.default_currency,
      displayFormat: Currency.display_format,
      moneyFormat: Currency.money_format,
      moneyFormatNoCurrency: Currency.money_format_no_currency,
      moneyFormatCurrency: Currency.money_format_currency,
    };

    this.options = this.defaults;
    this.moneyFormats = moneyFormats;
    this.storage = 'currency';
    this.currentCurrency = null;
    this.isInitialised = false;

    if (!window.Currency || this.isInitialised) return;

    $(this.options.switcherSelector).on('change', function() {
      const $currencySelector = $(this);
      Shopify.theme.currencyConverter.setCurrency($currencySelector.val());
    })

    this.currentCurrency = this._getStoredCurrency() || this.options.defaultCurrency;
    this.moneyFormats[this.options.shopCurrency].money_with_currency_format = this.options.moneyFormatCurrency;
    this.moneyFormats[this.options.shopCurrency].money_format = this.options.moneyFormatNoCurrency;

    this.isInitialised = true;
    this._current();
  },
  setCurrency(newCurrency) {
      /**
    * Change the currency to a new currency using an ISO currency code
    *
    * @param {String} newCurrency - New currency to convert prices to
    */
    if (!this.isInitialised) return;

    this._convertAll(newCurrency);
  },
  update(priceEl) {
      /**
    * Update a price on the page from shop currency to the active currency, and formatting
    *
    * @param priceEl {HTMLElement} - element containing price text, in the shop currency
    */
    if (!this.isInitialised) return;

    // unset any stored previous conversions and the data-currency attribute itself
    const attributes = priceEl.attributes;
    for (let attr = 0; attr < attributes.length; attr++) {
      const attribute = attributes[attr];

      if (attribute.name.indexOf('data-currency') === 0) {
        priceEl.setAttribute(attribute.name, '');
      }
    }

    this._convertEl(priceEl, this.currentCurrency);
  },
  _getStoredCurrency() {
      /**
    * Return the stored currency from the client's browser
    * @returns {String}
    * @private
    */
    try {
      return localStorage.getItem(this.storage);
    } catch (error) {
      console.warn(error);
      return this.options.defaultCurrency;
    }
  },
  _setStoredCurrency(currency) {
      /**
    * Save the client's currency in localstorage for persistence across pages
    * and sessions
    * @param {String} currency
    * @private
    */
    try {
      localStorage.setItem(this.storage, currency);
    } catch (error) {
      console.warn(error);
    }
  },
  _current() {
      /**
    * Update the currency switcher to the current currency
    * @private
    */
    const switchers = document.querySelectorAll(this.options.switcherSelector);
    for (let i = 0; i < switchers.length; i += 1) {
      const switcher = switchers[i];
      const childrenEls = switcher.querySelectorAll('option');

      for (let j = 0; j < childrenEls.length; j += 1) {
        const optionEl = childrenEls[j];

        if (optionEl.selected && optionEl.value !== this.currentCurrency) {
          optionEl.selected = false;
        }

        if (optionEl.value === this.currentCurrency) {
          optionEl.selected = true;
        }
      }
    }

    this._convertAll(this.currentCurrency);
  },
  _convertEl(priceEl, newCurrency) {
      /**
    * Converts an individual price to the new format
    *
    * @param {Element} priceEl - Node element containing price
    * @param {String} oldCurrency - Currency of element converting from
    * @param {String} newCurrency - Currency to convert to
    * @private
    */
    const oldCurrency = this.options.shopCurrency;
    // If the amount has already been converted, we leave it alone.
    if (priceEl.getAttribute('data-currency') === newCurrency) {
      return;
    }

    // If we are converting to a currency that we have saved, we will use the saved amount.
    if (priceEl.getAttribute(`data-currency-${newCurrency}`)) {
      priceEl.innerHTML = priceEl.getAttribute(`data-currency-${newCurrency}`);
    } else {
      const oldFormat = this.moneyFormats[oldCurrency][this.options.displayFormat];
      const newFormat = this.moneyFormats[newCurrency][this.options.displayFormat];

      const moneyValue = getMoneyValue(priceEl);
      const centsValue = getCentsValue(moneyValue, oldFormat, oldCurrency);

      // Cents value is empty, but not 0. 0$ is a valid price, while empty is not
      if (centsValue === '') return;

      const cents = window.Currency.convert(centsValue, oldCurrency, newCurrency);
      const oldPriceFormatted = formatMoney(centsValue, oldFormat);
      const priceFormatted = formatMoney(cents, newFormat);

      if (!priceEl.getAttribute('data-currency-original')) {
        priceEl.setAttribute('data-currency-original', oldPriceFormatted);
      }

      priceEl.setAttribute(`data-currency-${oldCurrency}`, oldPriceFormatted);
      priceEl.setAttribute(`data-currency-${newCurrency}`, priceFormatted);
      priceEl.innerHTML = priceFormatted;
    }

    priceEl.setAttribute('data-currency', newCurrency);
  },
  _convertAll(newCurrency) {
      /**
    * Convert all prices on the page to the new currency
    *
    * @param {String} oldCurrency - Currency of element converting from
    * @param {String} newCurrency - Currency to convert to
    * @private
    */
    const priceEls = document.querySelectorAll(this.options.priceSelector);
    if (!priceEls) return;

    this.currentCurrency = newCurrency;
    this._setStoredCurrency(newCurrency);

    for (let i = 0; i < priceEls.length; i += 1) {
      this._convertEl(priceEls[i], newCurrency);
    }
  }
}

function convertCurrencies() {

  const $currencySelector = $("[data-currency-converter]");
  if ($currencySelector.val()) {
    Shopify.theme.currencyConverter.setCurrency($currencySelector.val())
  }
}
