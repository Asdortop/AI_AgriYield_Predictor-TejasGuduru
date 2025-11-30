import pandas as pd
import numpy as np
import joblib

def preprocess_input(df: pd.DataFrame, preprocessors: dict):
    """
    Final enhanced preprocessing with target encoding.
    """
    df_proc = df.copy()
    
    # Remove Year
    if "Year" in df_proc.columns:
        df_proc = df_proc.drop("Year", axis=1)
    
    # ========================================
    # CONVERT NUMERIC FIELDS (handle string inputs from frontend)
    # ========================================
    numeric_cols = ['Annual_Rainfall', 'Fertilizer', 'Pesticide']
    for col in numeric_cols:
        if col in df_proc.columns:
            df_proc[col] = pd.to_numeric(df_proc[col], errors='coerce').fillna(0)
    
    # Load target encodings from preprocessors
    target_encodings = preprocessors.get("target_encodings")
    if not target_encodings:
        # Fallback if not provided
        try:
            target_encodings = joblib.load("ml/target_encodings_final.pkl")
        except:
            target_encodings = {
                'crop_means': {},
                'state_means': {},
                'season_means': {},
                'crop_state_means': {},
                'crop_season_means': {},
                'global_mean': 1.0
            }
    
    # ========================================
    # TARGET ENCODING (before label encoding!)
    # ========================================
    # Convert to lowercase first
    df_proc['Crop'] = df_proc['Crop'].astype(str).str.lower()
    df_proc['State'] = df_proc['State'].astype(str).str.lower()
    df_proc['Season'] = df_proc['Season'].astype(str).str.lower()
    
    # Apply target encodings
    df_proc['Crop_Mean_Yield'] = df_proc['Crop'].map(target_encodings['crop_means']).fillna(target_encodings['global_mean'])
    df_proc['State_Mean_Yield'] = df_proc['State'].map(target_encodings['state_means']).fillna(target_encodings['global_mean'])
    df_proc['Season_Mean_Yield'] = df_proc['Season'].map(target_encodings['season_means']).fillna(target_encodings['global_mean'])
    
    # Combination encodings
    df_proc['Crop_State_Mean_Yield'] = df_proc.apply(
        lambda x: target_encodings['crop_state_means'].get((x['Crop'], x['State']), target_encodings['global_mean']),
        axis=1
    )
    df_proc['Crop_Season_Mean_Yield'] = df_proc.apply(
        lambda x: target_encodings['crop_season_means'].get((x['Crop'], x['Season']), target_encodings['global_mean']),
        axis=1
    )
    
    # ========================================
    # FEATURE ENGINEERING
    # ========================================
    df_proc['Rainfall_per_Fertilizer'] = df_proc['Annual_Rainfall'] / (df_proc['Fertilizer'] + 1)
    df_proc['Fertilizer_Pesticide_Ratio'] = df_proc['Fertilizer'] / (df_proc['Pesticide'] + 0.01)
    df_proc['Total_Input'] = df_proc['Fertilizer'] + df_proc['Pesticide']
    df_proc['Rainfall_Fertilizer_Product'] = df_proc['Annual_Rainfall'] * df_proc['Fertilizer']
    
    df_proc['Rainfall_Squared'] = df_proc['Annual_Rainfall'] ** 2
    df_proc['Fertilizer_Squared'] = df_proc['Fertilizer'] ** 2
    df_proc['Pesticide_Squared'] = df_proc['Pesticide'] ** 2
    
    df_proc['Log_Rainfall'] = np.log1p(df_proc['Annual_Rainfall'])
    df_proc['Log_Fertilizer'] = np.log1p(df_proc['Fertilizer'])
    df_proc['Log_Pesticide'] = np.log1p(df_proc['Pesticide'])
    
    # Binning - use same bins as training
    df_proc['Rainfall_Bin'] = pd.cut(df_proc['Annual_Rainfall'], bins=10, labels=False).astype(float).fillna(0)
    df_proc['Fertilizer_Bin'] = pd.cut(df_proc['Fertilizer'], bins=10, labels=False).astype(float).fillna(0)
    
    # ========================================
    # LABEL ENCODING
    # ========================================
    categorical_cols = ["State", "Crop", "Season"]
    encoders = preprocessors.get("encoders")
    
    if not encoders:
        raise ValueError("CRITICAL: Encoders not found!")
    
    for col in categorical_cols:
        if col in df_proc.columns:
            le = encoders[col]
            
            def encode_value(x):
                return le.transform([x])[0] if x in le.classes_ else -1
            
            df_proc[col] = df_proc[col].apply(encode_value)
            df_proc[col] = df_proc[col].astype('category')
    
    # ========================================
    # FEATURE ORDERING
    # ========================================
    feature_order = preprocessors.get("feature_order")
    if feature_order:
        for col in feature_order:
            if col not in df_proc.columns:
                df_proc[col] = 0
            
            if col not in categorical_cols:
                df_proc[col] = pd.to_numeric(df_proc[col], errors='coerce').fillna(0)
        
        df_proc = df_proc[feature_order]
    
    return df_proc