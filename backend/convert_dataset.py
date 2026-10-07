import pandas as pd

columns = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
    "target"
]

data = pd.read_csv(
    "processed.cleveland.data",
    names=columns
)

data.to_csv("heart.csv", index=False)

print("Dataset converted successfully!")
print(data.head())
print("\nShape:", data.shape)