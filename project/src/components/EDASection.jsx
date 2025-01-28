import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const EDASection = ({ insights }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Business Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                <p className="text-sm text-gray-500">{insight.description}</p>
              </div>
              {getTrendIcon(insight.trend)}
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">{insight.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};