import pandas as pd
import os
from typing import Tuple

def load_datasets() -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Load the customer, product, and transaction datasets.
    Returns:
        Tuple of DataFrames (customers_df, products_df, transactions_df)
    """
    # Load datasets
    customers_df = pd.read_csv('data/Customers.csv')
    products_df = pd.read_csv('data/Products.csv')
    transactions_df = pd.read_csv('data/Transactions.csv')
    
    # Convert date columns to datetime
    customers_df['SignupDate'] = pd.to_datetime(customers_df['SignupDate'])
    transactions_df['TransactionDate'] = pd.to_datetime(transactions_df['TransactionDate'])
    
    return customers_df, products_df, transactions_df