import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const { currencies, currencySymbols, currencyNames, convertCurrency, getExchangeRate } = useCurrency();
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromAmount, setFromAmount] = useState(1000);

  const toAmount = convertCurrency(fromAmount, fromCurrency, toCurrency);
  const exchangeRate = getExchangeRate(fromCurrency, toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h3>💱 Currency Converter</h3>
        <p>Real-time currency conversion</p>
      </div>

      <div className="converter-body">
        <div className="converter-group from">
          <label>From</label>
          <div className="converter-input-wrapper">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter amount"
              className="converter-input"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="converter-select"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {currencyNames[curr]}
                </option>
              ))}
            </select>
          </div>
          <p className="converter-symbol">{currencySymbols[fromCurrency]}</p>
        </div>

        <button className="swap-button" onClick={handleSwap} title="Swap currencies">
          <ArrowRightLeft size={20} />
        </button>

        <div className="converter-group to">
          <label>To</label>
          <div className="converter-input-wrapper">
            <input
              type="number"
              value={toAmount.toFixed(2)}
              readOnly
              className="converter-input"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="converter-select"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {currencyNames[curr]}
                </option>
              ))}
            </select>
          </div>
          <p className="converter-symbol">{currencySymbols[toCurrency]}</p>
        </div>
      </div>

      <div className="converter-rate">
        <p>
          1 <strong>{fromCurrency}</strong> = <strong>{exchangeRate.toFixed(4)}</strong> <strong>{toCurrency}</strong>
        </p>
      </div>

      <div className="converter-info">
        <p>
          {currencySymbols[fromCurrency]}{fromAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} {fromCurrency} ≈ {currencySymbols[toCurrency]}{toAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} {toCurrency}
        </p>
      </div>
    </div>
  );
}
