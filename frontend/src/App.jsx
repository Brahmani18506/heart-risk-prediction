import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictRisk = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      alert("Please enter all the details.");
      return;
    }

    try {
      const response = await fetch(
        "https://heart-risk-backend-i3dh.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            age: Number(formData.age),
            sex: Number(formData.sex),
            cp: Number(formData.cp),
            trestbps: Number(formData.trestbps),
            chol: Number(formData.chol),
            fbs: Number(formData.fbs),
            restecg: Number(formData.restecg),
            thalach: Number(formData.thalach),
            exang: Number(formData.exang),
            oldpeak: Number(formData.oldpeak),
            slope: Number(formData.slope),
            ca: Number(formData.ca),
            thal: Number(formData.thal)
          })
        }
      );

      const data = await response.json();
      setResult(data);

    } catch (error) {
      alert("Unable to connect to the prediction server.");
      console.log(error);
    }
  };

  return (
    <div className="page">

      <div className="container">

        <h1>❤️ Heart Risk Prediction</h1>

        <p className="subtitle">
          Enter the required health information to estimate heart disease risk.
        </p>

        <div className="form">

          <div className="field">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Example: 45"
            />
          </div>

          <div className="field">
            <label>Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>

          <div className="field">
            <label>Chest Pain Type</label>
            <select name="cp" value={formData.cp} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Typical Angina</option>
              <option value="2">Atypical Angina</option>
              <option value="3">Non-anginal Pain</option>
              <option value="4">Asymptomatic</option>
            </select>
          </div>

          <div className="field">
            <label>Resting Blood Pressure</label>
            <input
              type="number"
              name="trestbps"
              value={formData.trestbps}
              onChange={handleChange}
              placeholder="Example: 120"
            />
          </div>

          <div className="field">
            <label>Cholesterol</label>
            <input
              type="number"
              name="chol"
              value={formData.chol}
              onChange={handleChange}
              placeholder="Example: 200"
            />
          </div>

          <div className="field">
            <label>Fasting Blood Sugar</label>
            <select name="fbs" value={formData.fbs} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Greater than 120 mg/dl</option>
              <option value="0">Less than or equal to 120 mg/dl</option>
            </select>
          </div>

          <div className="field">
            <label>Resting ECG</label>
            <select
              name="restecg"
              value={formData.restecg}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">ST-T Wave Abnormality</option>
              <option value="2">Left Ventricular Hypertrophy</option>
            </select>
          </div>

          <div className="field">
            <label>Maximum Heart Rate</label>
            <input
              type="number"
              name="thalach"
              value={formData.thalach}
              onChange={handleChange}
              placeholder="Example: 150"
            />
          </div>

          <div className="field">
            <label>Exercise Induced Angina</label>
            <select name="exang" value={formData.exang} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="field">
            <label>Oldpeak</label>
            <input
              type="number"
              step="0.1"
              name="oldpeak"
              value={formData.oldpeak}
              onChange={handleChange}
              placeholder="Example: 1.0"
            />
          </div>

          <div className="field">
            <label>Slope</label>
            <select name="slope" value={formData.slope} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Upsloping</option>
              <option value="2">Flat</option>
              <option value="3">Downsloping</option>
            </select>
          </div>

          <div className="field">
            <label>Number of Major Vessels (CA)</label>
            <select name="ca" value={formData.ca} onChange={handleChange}>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="field">
            <label>Thal</label>
            <select name="thal" value={formData.thal} onChange={handleChange}>
              <option value="">Select</option>
              <option value="3">Normal</option>
              <option value="6">Fixed Defect</option>
              <option value="7">Reversible Defect</option>
            </select>
          </div>

          <button onClick={predictRisk}>
            Predict Heart Risk
          </button>

        </div>

        {result && (
          <div className="result">

            <h2>Prediction Result</h2>

            <div className="score">
              {result.risk_percentage}%
            </div>

            <p>Estimated model risk</p>

            <h3>{result.result}</h3>

            <div className="recommendations">

              <h2>❤️ Heart Health Suggestions</h2>

              <ul>
                <li>Maintain a healthy and balanced diet.</li>
                <li>Include regular physical activity appropriate for your health.</li>
                <li>Avoid smoking and tobacco products.</li>
                <li>Limit alcohol consumption.</li>
                <li>Maintain a healthy body weight.</li>
                <li>Monitor blood pressure, cholesterol and blood sugar regularly.</li>
                <li>Get adequate sleep and manage stress.</li>
                <li>Discuss concerning results or risk factors with a qualified healthcare professional.</li>
              </ul>

              <div className="warning">
                <strong>Important:</strong> This prediction is only a machine-learning
                estimate and is not a medical diagnosis.
              </div>

              <div className="emergency">
                <strong>🚨 Emergency:</strong> If someone is currently experiencing
                severe or persistent chest pain/pressure, difficulty breathing,
                fainting, or pain spreading to the arm, jaw or back, seek emergency
                medical care immediately rather than relying on this prediction.
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;