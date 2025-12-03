import gradio as gr
import pandas as pd
from services.model_loader import model, preprocessors
from utils.preprocess import preprocess_input

# Prediction function
def predict_yield(crop, state, season, year, rainfall, fertilizer, pesticide):
    try:
        # Create input DataFrame
        input_data = {
            "Crop": crop,
            "State": state,
            "Season": season,
            "Year": int(year),
            "Annual_Rainfall": float(rainfall),
            "Fertilizer": float(fertilizer),
            "Pesticide": float(pesticide)
        }
        
        df = pd.DataFrame([input_data])
        
        # Preprocess and predict
        X_proc = preprocess_input(df, preprocessors)
        prediction = model.predict(X_proc)
        
        return f"🌾 Predicted Yield: {prediction[0]:.2f} tons/hectare"
        
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# Gradio Interface
demo = gr.Interface(
    fn=predict_yield,
    inputs=[
        gr.Dropdown(
            choices=["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Jowar", "Bajra", "Ragi", "Groundnut"],
            label="🌾 Crop Type"
        ),
        gr.Dropdown(
            choices=["Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "Uttar Pradesh", 
                    "Gujarat", "Madhya Pradesh", "Punjab", "Haryana", "West Bengal"],
            label="📍 State"
        ),
        gr.Dropdown(
            choices=["Kharif", "Rabi", "Summer", "Winter", "Whole Year"],
            label="🗓️ Season"
        ),
        gr.Number(label="📅 Year", value=2024, minimum=2000, maximum=2030),
        gr.Number(label="🌧️ Annual Rainfall (mm)", value=1100, minimum=0),
        gr.Number(label="💊 Fertilizer (kg/hectare)", value=120, minimum=0),
        gr.Number(label="🧪 Pesticide (kg/hectare)", value=0.27, minimum=0, step=0.01)
    ],
    outputs=gr.Textbox(label="Prediction Result", lines=2),
    title="🌾 AI Agriculture Yield Predictor",
    description="Predict crop yields using advanced machine learning algorithms trained on 12,000+ data points with 88% R² accuracy.",
    examples=[
        ["Rice", "Maharashtra", "Kharif", 2024, 1100, 120, 0.27],
        ["Wheat", "Uttar Pradesh", "Rabi", 2024, 800, 100, 0.20],
        ["Cotton", "Gujarat", "Kharif", 2024, 650, 90, 0.15],
    ],
    theme=gr.themes.Soft(),
    css="""
        .gradio-container {
            font-family: 'Inter', sans-serif;
        }
    """
)

if __name__ == "__main__":
    demo.launch()
