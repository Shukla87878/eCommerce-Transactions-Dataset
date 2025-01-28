import React, { useState } from 'react';
import { Upload, FileText, BarChart2, Users } from 'lucide-react';
import { parseCSV, calculateBusinessInsights, findSimilarCustomers, performClustering } from './utils/dataProcessing';
import { EDASection } from './components/EDASection';
import { LookalikeSection } from './components/LookalikeSection';
import { ClusteringSection } from './components/ClusteringSection';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [data, setData] = useState({
    customers: [],
    products: [],
    transactions: []
  });

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files) return;

    const newData = {};
    
    for (const file of files) {
      const content = await file.text();
      const parsedData = parseCSV(content);
      
      if (file.name.toLowerCase().includes('customer')) {
        newData.customers = parsedData;
      } else if (file.name.toLowerCase().includes('product')) {
        newData.products = parsedData;
      } else if (file.name.toLowerCase().includes('transaction')) {
        newData.transactions = parsedData;
      }
    }

    setData(prev => ({
      customers: newData.customers || prev.customers,
      products: newData.products || prev.products,
      transactions: newData.transactions || prev.transactions
    }));
  };

  const hasAllData = data.customers.length > 0 && data.products.length > 0 && data.transactions.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">eCommerce Data Science Project</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'upload'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Data
          </button>
          <button
            onClick={() => setActiveTab('eda')}
            disabled={!hasAllData}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'eda'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            } ${!hasAllData && 'opacity-50 cursor-not-allowed'}`}
          >
            <FileText className="w-5 h-5 mr-2" />
            EDA
          </button>
          <button
            onClick={() => setActiveTab('lookalike')}
            disabled={!hasAllData}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'lookalike'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            } ${!hasAllData && 'opacity-50 cursor-not-allowed'}`}
          >
            <Users className="w-5 h-5 mr-2" />
            Lookalike Model
          </button>
          <button
            onClick={() => setActiveTab('clustering')}
            disabled={!hasAllData}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'clustering'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            } ${!hasAllData && 'opacity-50 cursor-not-allowed'}`}
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Clustering
          </button>
        </nav>

        {/* Content Area */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'upload' && (
            <div className="text-center py-12">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Upload Dataset Files</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your Customers.csv, Products.csv, and Transactions.csv files
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Select Files
                </label>
              </div>
              {hasAllData && (
                <div className="mt-4 text-sm text-green-600">
                  All required files have been uploaded successfully!
                </div>
              )}
            </div>
          )}

          {activeTab === 'eda' && hasAllData && (
            <EDASection
              insights={calculateBusinessInsights(data.customers, data.products, data.transactions)}
            />
          )}

          {activeTab === 'lookalike' && hasAllData && (
            <LookalikeSection
              onFindSimilar={(customerId) => findSimilarCustomers(customerId, data.customers, data.transactions)}
              customerIds={data.customers.map(c => c.CustomerID)}
            />
          )}

          {activeTab === 'clustering' && hasAllData && (
            <ClusteringSection
              result={performClustering(data.customers, data.transactions)}
            />
          )}

          {!hasAllData && activeTab !== 'upload' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Please upload all required data files first.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;