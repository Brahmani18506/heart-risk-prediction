import pandas as pd

data = pd.read_csv("heart.csv")

# Replace ? with missing values
data = data.replace("?", pd.NA)

print("Missing values before cleaning:")
print(data.isnull().sum())

# Remove rows containing missing values
data = data.dropna()

# Convert all columns to numbers
data = data.apply(pd.to_numeric)

# Save cleaned dataset
data.to_csv("heart_clean.csv", index=False)

print("\nCleaning completed!")
print("New dataset shape:", data.shape)

print("\nMissing values after cleaning:")
print(data.isnull().sum())