import pandas as pd

data = pd.read_csv("heart.csv")

print("Dataset shape:")
print(data.shape)

print("\nData types:")
print(data.dtypes)

print("\nUnique values in ca:")
print(data["ca"].unique())

print("\nUnique values in thal:")
print(data["thal"].unique())