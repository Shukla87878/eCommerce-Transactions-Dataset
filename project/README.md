# eCommerce Data Science Project

This repository contains the analysis and modeling for an eCommerce transactions dataset.

## Project Structure

```
.
├── data/                   # Data directory (add CSV files here)
├── notebooks/             # Jupyter notebooks for analysis
│   ├── Task1_EDA.ipynb
│   ├── Task2_Lookalike.ipynb
│   └── Task3_Clustering.ipynb
├── src/                   # Source code
│   ├── data_loader.py
│   └── utils.py
├── requirements.txt       # Python dependencies
└── README.md
```

## Setup Instructions

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Download the dataset files and place them in the `data/` directory:
   - Customers.csv
   - Products.csv
   - Transactions.csv

4. Start Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

## Tasks

1. **Task 1: EDA and Business Insights**
   - Notebook: `notebooks/Task1_EDA.ipynb`
   - Performs exploratory data analysis
   - Derives business insights

2. **Task 2: Lookalike Model**
   - Notebook: `notebooks/Task2_Lookalike.ipynb`
   - Implements customer similarity model
   - Generates recommendations

3. **Task 3: Customer Segmentation**
   - Notebook: `notebooks/Task3_Clustering.ipynb`
   - Performs customer clustering
   - Calculates clustering metrics