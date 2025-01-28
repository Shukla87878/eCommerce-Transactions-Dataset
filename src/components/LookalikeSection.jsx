import React, { useState } from 'react';

export const LookalikeSection = ({ onFindSimilar, customerIds }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (selectedCustomerId) {
      const similarCustomers = onFindSimilar(selectedCustomerId);
      setResult(similarCustomers);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a customer</option>
          {customerIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={!selectedCustomerId}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Find Similar Customers
        </button>
      </div>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Similar Customers</h3>
          <div className="space-y-4">
            {result.similarCustomers.map((similar) => (
              <div
                key={similar.customerId}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{similar.customerName}</p>
                    <p className="text-sm text-gray-500">{similar.customerId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Similarity Score</p>
                    <p className="font-medium">{(similar.similarityScore * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};