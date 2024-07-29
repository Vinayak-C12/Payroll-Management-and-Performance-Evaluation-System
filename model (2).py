import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import json

def predict(data):
    # Load dataset from CSV file
    df = pd.read_csv('Employee-Management-System-in-React-Node-MySQL/data.csv')

    # Drop rows with missing values
    df.dropna(inplace=True)

    # Encoding 'action' column
    action_map = {'No Hike': 0, 'Hike': 1, 'Fired': 2}
    df['action'] = df['action'].map(action_map)

    # Splitting the dataset into features and target variable
    X = df.drop('action', axis=1)
    y = df['action']

    # Splitting the dataset into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Creating a Random Forest Classifier model
    model = RandomForestClassifier(n_estimators=100, random_state=42)

    # Training the model
    model.fit(X_train, y_train)

    # Making predictions
    prediction = model.predict(data)

    # Returning predictions
    return prediction

# Reading data from stdin
data = sys.stdin.readline()

# Parsing data as JSON
data_json = json.loads(data)

# Making predictions
prediction = predict(data_json)

# Sending predictions to stdout
sys.stdout.write(json.dumps(prediction.tolist()))
sys.stdout.flush()