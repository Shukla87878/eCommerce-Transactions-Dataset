import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from typing import List, Tuple, Dict

def preprocess_customer_features(
    customers_df: pd.DataFrame,
    transactions_df: pd.DataFrame
) -> Tuple[pd.DataFrame, StandardScaler]:
    """
    Preprocess customer features for modeling.
    
    Args:
        customers_df: Customer DataFrame
        transactions_df: Transactions DataFrame
        
    Returns:
        Tuple of (preprocessed features DataFrame, fitted scaler)
    """
    # Calculate customer transaction statistics
    customer_stats = transactions_df.groupby('CustomerID').agg({
        'TotalValue': ['sum', 'mean', 'count'],
        'Quantity': ['sum', 'mean']
    }).reset_index()
    
    customer_stats.columns = [
        'CustomerID',
        'total_spend',
        'avg_transaction_value',
        'transaction_count',
        'total_quantity',
        'avg_quantity'
    ]
    
    # Merge with customer data
    features_df = customers_df.merge(customer_stats, on='CustomerID', how='left')
    
    # Fill missing values for customers with no transactions
    features_df = features_df.fillna(0)
    
    # Create days since signup feature
    features_df['days_since_signup'] = (
        pd.Timestamp.now() - features_df['SignupDate']
    ).dt.days
    
    # Select numerical features for scaling
    numerical_features = [
        'total_spend',
        'avg_transaction_value',
        'transaction_count',
        'total_quantity',
        'avg_quantity',
        'days_since_signup'
    ]
    
    # Scale numerical features
    scaler = StandardScaler()
    features_df[numerical_features] = scaler.fit_transform(
        features_df[numerical_features]
    )
    
    return features_df, scaler

def calculate_davies_bouldin_index(
    features: np.ndarray,
    labels: np.ndarray
) -> float:
    """
    Calculate Davies-Bouldin Index for clustering evaluation.
    
    Args:
        features: Feature matrix
        labels: Cluster labels
        
    Returns:
        Davies-Bouldin Index score
    """
    from sklearn.metrics import davies_bouldin_score
    return davies_bouldin_score(features, labels)