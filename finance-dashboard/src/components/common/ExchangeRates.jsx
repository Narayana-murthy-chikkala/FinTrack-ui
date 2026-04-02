import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import './ExchangeRates.css';

export default function ExchangeRates() {
  const { baseCurrency, currencies, currencySymbols, currencyNames, getExchangeRate } = useCurrency();

  // Filter out the base currency from the list
  const otherCurrencies = currencies.filter(curr => curr !== baseCurrency);

  return (
    <div className="exchange-rates-container">
      <div className="exchange-header">
        <h3>💹 Exchange Rates</h3>
        <p>Rates relative to {currencyNames[baseCurrency]} ({baseCurrency})</p>
      </div>

      <div className="exchange-rates-grid">
        {otherCurrencies.map((currency) => {
          const rate = getExchangeRate(currency, baseCurrency);
          const displayRate = 1 / rate; // Reverse to show how much of target currency you get
          
          return (
            <div key={currency} className="exchange-rate-card">
              <div className="rate-header">
                <span className="rate-symbol">{currencySymbols[currency]}</span>
                <div className="rate-info">
                  <h4>{currency}</h4>
                  <p>{currencyNames[currency]}</p>
                </div>
              </div>
              
              <div className="rate-value">
                <p className="rate-amount">{displayRate.toFixed(4)}</p>
                <p className="rate-unit">per {baseCurrency}</p>
              </div>

              <div className="rate-comparison">
                <span className="rate-inverse">
                  1 {currency} = {rate.toFixed(4)} {baseCurrency}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="exchange-note">
        <p>Exchange rates are updated in real-time and based on current market data.</p>
      </div>
    </div>
  );
}
