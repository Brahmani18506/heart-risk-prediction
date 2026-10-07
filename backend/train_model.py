import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load cleaned dataset
data = pd.read_csv("heart_clean.csv")

# Separate input and output
X = data.drop("target", axis=1)
y = data["target"]

# Convert target into binary classification
# 0 = No heart disease
# 1,2,3,4 = Heart disease
y = y.apply(lambda value: 1 if value > 0 else 0)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create model
model = LogisticRegression(max_iter=1000)

# Train model
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, predictions)

print("Model trained successfully!")
print("Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, predictions))

# Save model
joblib.dump(model, "model.pkl")

print("\nmodel.pkl created successfully!")