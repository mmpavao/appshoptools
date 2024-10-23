import React from 'react';
import { DollarSign } from 'lucide-react';

const CurrencyWidget = () => {
  const currencies = [
    { 
      code: 'BRL', 
      name: 'Brazilian Real',
      rate: 4.95,
      change: '+0.2%',
      trend: 'up'
    },
    { 
      code: 'CNY', 
      name: 'Chinese Yuan',
      rate: 7.23,
      change: '-0.1%',
      trend: 'down'
    },
    { 
      code: 'PYG', 
      name: 'Paraguayan Guarani',
      rate: 7285.50,
      change: '+0.3%',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-4">
      {currencies.map((currency) => (
        <div
          key={currency.code}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gray-100">
              <DollarSign className="h-4 w-4 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {currency.code}
              </p>
              <p className="text-xs text-gray-500">{currency.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {currency.rate.toFixed(2)}
            </p>
            <p className={`text-xs ${
              currency.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {currency.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrencyWidget;