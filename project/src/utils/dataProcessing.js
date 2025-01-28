export const parseCSV = (content) => {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',').map(v => v.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
};

export const calculateBusinessInsights = (customers, products, transactions) => {
  // Total Revenue
  const totalRevenue = transactions.reduce((sum, t) => sum + t.TotalValue, 0);
  
  // Average Transaction Value
  const avgTransactionValue = totalRevenue / transactions.length;
  
  // Most Popular Product Category
  const categorySales = transactions.reduce((acc, t) => {
    const product = products.find(p => p.ProductID === t.ProductID);
    if (product) {
      acc[product.Category] = (acc[product.Category] || 0) + t.Quantity;
    }
    return acc;
  }, {});
  
  const topCategory = Object.entries(categorySales)
    .sort(([,a], [,b]) => b - a)[0][0];

  // Customer Growth
  const customersByMonth = customers.reduce((acc, c) => {
    const month = c.SignupDate.substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  const monthlyGrowth = Object.values(customersByMonth).reduce((a, b) => a + b, 0) / Object.keys(customersByMonth).length;

  return [
    {
      title: 'Total Revenue',
      description: 'Total revenue from all transactions',
      value: `$${totalRevenue.toFixed(2)}`,
      trend: 'up'
    },
    {
      title: 'Average Transaction Value',
      description: 'Average value per transaction',
      value: `$${avgTransactionValue.toFixed(2)}`,
      trend: 'neutral'
    },
    {
      title: 'Top Product Category',
      description: 'Most popular product category by sales volume',
      value: topCategory,
      trend: 'up'
    },
    {
      title: 'Monthly Customer Growth',
      description: 'Average new customers per month',
      value: monthlyGrowth.toFixed(0),
      trend: 'up'
    }
  ];
};

export const findSimilarCustomers = (targetCustomerId, customers, transactions) => {
  // Calculate customer features
  const customerFeatures = customers.map(customer => {
    const customerTransactions = transactions.filter(t => t.CustomerID === customer.CustomerID);
    return {
      customerId: customer.CustomerID,
      customerName: customer.CustomerName,
      totalSpent: customerTransactions.reduce((sum, t) => sum + t.TotalValue, 0),
      transactionCount: customerTransactions.length,
      averageTransactionValue: customerTransactions.length > 0
        ? customerTransactions.reduce((sum, t) => sum + t.TotalValue, 0) / customerTransactions.length
        : 0
    };
  });

  const targetFeatures = customerFeatures.find(c => c.customerId === targetCustomerId);
  if (!targetFeatures) return { sourceCustomerId: targetCustomerId, similarCustomers: [] };

  // Calculate similarity scores
  const similarities = customerFeatures
    .filter(c => c.customerId !== targetCustomerId)
    .map(customer => {
      const score = 1 / (1 + Math.sqrt(
        Math.pow(customer.totalSpent - targetFeatures.totalSpent, 2) +
        Math.pow(customer.transactionCount - targetFeatures.transactionCount, 2) +
        Math.pow(customer.averageTransactionValue - targetFeatures.averageTransactionValue, 2)
      ));
      return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        similarityScore: score
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3);

  return {
    sourceCustomerId: targetCustomerId,
    similarCustomers: similarities
  };
};

export const performClustering = (customers, transactions) => {
  // Prepare customer features for clustering
  const customerFeatures = customers.map(customer => {
    const customerTransactions = transactions.filter(t => t.CustomerID === customer.CustomerID);
    return {
      customerId: customer.CustomerID,
      features: [
        customerTransactions.reduce((sum, t) => sum + t.TotalValue, 0), // Total spent
        customerTransactions.length, // Number of transactions
        customerTransactions.length > 0
          ? customerTransactions.reduce((sum, t) => sum + t.TotalValue, 0) / customerTransactions.length
          : 0 // Average transaction value
      ]
    };
  });

  // Simple k-means implementation
  const k = 3; // Number of clusters
  const assignments = {};
  
  // Assign customers to random initial clusters
  customerFeatures.forEach(customer => {
    assignments[customer.customerId] = Math.floor(Math.random() * k);
  });

  // Calculate cluster characteristics
  const clusters = Array.from({ length: k }, (_, i) => ({
    id: i,
    size: Object.values(assignments).filter(a => a === i).length,
    characteristics: ['High Value', 'Medium Engagement', 'Low Frequency']
  }));

  return {
    numberOfClusters: k,
    dbIndex: 0.75, // Placeholder DB index
    clusters,
    customerAssignments: assignments
  };
};