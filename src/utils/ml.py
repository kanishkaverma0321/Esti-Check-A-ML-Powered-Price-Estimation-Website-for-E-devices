import pandas as pd # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier # type: ignore
from sklearn.metrics import mean_squared_error, r2_score, classification_report # type: ignore
import numpy as np # type: ignore

# Load your dataset
url = "ED_dataset.csv"  # Replace with your dataset path
data = pd.read_csv(url)

# Preprocessing
data['condition'] = data['condition'].map({'fair': 0, 'good': 1})  # Example mapping
data.fillna(data.median(), inplace=True)  # Fill missing values

# Features and target variable
X = data[['location', 'tech_specs', 'brand', 'condition']]  # Add relevant features
y_price = data['price']  # Target variable for regression
y_class = data['deal_classification']  # Target variable for classification

# Split the data into training and testing sets
X_train, X_test, y_train_price, y_test_price, y_train_class, y_test_class = train_test_split(
    X, y_price, y_class, test_size=0.2, random_state=42)

# Random Forest for Price Estimation
rf_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
rf_regressor.fit(X_train, y_train_price)

# Predictions and evaluation for price estimation
y_pred_price = rf_regressor.predict(X_test)
mse = mean_squared_error(y_test_price, y_pred_price)
r2 = r2_score(y_test_price, y_pred_price)

print(f"Mean Squared Error for Price Estimation: {mse:.2f}")
print(f"R-squared Score for Price Estimation: {r2:.2f}")

# Random Forest for Deal Classification
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train_class)

# Predictions and evaluation for deal classification
y_pred_class = rf_classifier.predict(X_test)
classification_rep = classification_report(y_test_class, y_pred_class)

print("\nClassification Report for Deal Classification:\n", classification_rep)

# Factors influencing price predictions
feature_importances = rf_regressor.feature_importances_
importance_df = pd.DataFrame({
    'Feature': X.columns,
    'Importance': feature_importances
}).sort_values(by='Importance', ascending=False)

print("\nFeature Importances:\n", importance_df)
