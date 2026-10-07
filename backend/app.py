from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")


@app.route("/")
def home():
    return "Heart Risk Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # Get input values
    age = data["age"]
    sex = data["sex"]
    cp = data["cp"]
    trestbps = data["trestbps"]
    chol = data["chol"]
    fbs = data["fbs"]
    restecg = data["restecg"]
    thalach = data["thalach"]
    exang = data["exang"]
    oldpeak = data["oldpeak"]
    slope = data["slope"]
    ca = data["ca"]
    thal = data["thal"]

    # Create DataFrame
    input_data = pd.DataFrame([{
        "age": age,
        "sex": sex,
        "cp": cp,
        "trestbps": trestbps,
        "chol": chol,
        "fbs": fbs,
        "restecg": restecg,
        "thalach": thalach,
        "exang": exang,
        "oldpeak": oldpeak,
        "slope": slope,
        "ca": ca,
        "thal": thal
    }])

    # Prediction
    prediction = model.predict(input_data)[0]

    # Probability
    probability = model.predict_proba(input_data)[0][1]

    probability = round(probability * 100, 2)

    if prediction == 1:
        result = "Higher Risk"
    else:
        result = "Lower Risk"

    return jsonify({
        "prediction": int(prediction),
        "risk_percentage": probability,
        "result": result
    })


if __name__ == "__main__":
    app.run(debug=True)