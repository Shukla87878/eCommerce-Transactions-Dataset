export interface Customer {
  CustomerID: string;
  CustomerName: string;
  Region: string;
  SignupDate: string;
}

export interface Product {
  ProductID: string;
  ProductName: string;
  Category: string;
  Price: number;
}

export interface Transaction {
  TransactionID: string;
  CustomerID: string;
  ProductID: string;
  TransactionDate: string;
  Quantity: number;
  TotalValue: number;
  Price: number;
}

export interface DataState {
  customers: Customer[];
  products: Product[];
  transactions: Transaction[];
}

export interface BusinessInsight {
  title: string;
  description: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface LookalikeResult {
  sourceCustomerId: string;
  similarCustomers: Array<{
    customerId: string;
    customerName: string;
    similarityScore: number;
  }>;
}

export interface ClusteringResult {
  numberOfClusters: number;
  dbIndex: number;
  clusters: Array<{
    id: number;
    size: number;
    characteristics: string[];
  }>;
  customerAssignments: Record<string, number>;
}