import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import './CurrencySelector.css';

export default function CurrencySelector() {
  const { baseCurrency, setBaseCurrency, currencies, currencySymbols, currencyNames } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currency) => {
    setBaseCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="currency-selector">
      <button
        className="currency-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Currency"
      >
        <Globe size={18} />
        <span className="currency-symbol">{currencySymbols[baseCurrency]}</span>
        <span className="currency-code">{baseCurrency}</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          <div className="currency-header">
            <h4>Select Currency</h4>
          </div>
          <div className="currency-list">
            {currencies.map((currency) => (
              <button
                key={currency}
                className={`currency-option ${baseCurrency === currency ? 'active' : ''}`}
                onClick={() => handleCurrencyChange(currency)}
              >
                <span className="currency-flag">
                  {currencySymbols[currency]}
                </span>
                <div className="currency-info">
                  <span className="currency-code-option">{currency}</span>
                  <span className="currency-name">{currencyNames[currency]}</span>
                </div>
                {baseCurrency === currency && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
