# backend/utils/shap_explain.py
import shap
import numpy as np
import pandas as pd

def explain_shap(model, X, preprocessors=None, top_k=5, return_summary=False):
    """
    Returns top_k SHAP contributions for a single-row DataFrame X.
    If X has multiple rows, it samples up to 100 rows for summarization.
    """
    try:
        # If X is single-row, do local explanation; else sample
        if X.shape[0] == 1:
            sample = X
        else:
            sample = X.sample(min(100, X.shape[0]), random_state=42)

        # Use TreeExplainer for tree models
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(sample)

        # shap_values shape: (n_samples, n_features) for regressor (list or np array)
        # For LightGBM regressor explainer.shap_values returns array
        if isinstance(shap_values, list):
            # multiclass returns list; pick first
            shap_vals = shap_values[0]
        else:
            shap_vals = shap_values

        # For single row, return top contributions
        if sample.shape[0] == 1:
            # Ensure shap_vals is 2D (1, n_features) or 1D (n_features)
            # We need a 1D array for the row
            if len(shap_vals.shape) > 1:
                row_vals = shap_vals[0]
            else:
                row_vals = shap_vals

            feature_names = sample.columns.tolist()
            df_shap = pd.DataFrame({
                "feature": feature_names,
                "shap_value": row_vals,
                "abs_shap": np.abs(row_vals)
            }).sort_values("abs_shap", ascending=False)
            top = df_shap.head(top_k).to_dict(orient="records")
            return top
        else:
            # Return summary: average absolute shap per feature
            mean_abs_shap = np.abs(shap_vals).mean(axis=0)
            feature_names = sample.columns.tolist()
            df_sum = pd.DataFrame({
                "feature": feature_names,
                "mean_abs_shap": mean_abs_shap
            }).sort_values("mean_abs_shap", ascending=False)
            if return_summary:
                return df_sum.head(top_k).to_dict(orient="records")
            else:
                # For predict route return top_k of last row (if route requested)
                return df_sum.head(top_k).to_dict(orient="records")
    except Exception as e:
        print(f"SHAP Error: {e}")
        # In case SHAP fails (time/memory), return empty
        return []
