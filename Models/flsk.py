from flask import Flask, request, jsonify, render_template
import joblib
# import mysql.connector  # Assuming MySQL database

# Load model
model = joblib.load('trained_model.pkl')

# # Database connection configuration (replace with your credentials)
# DATABASE_CONFIG = {
#     'host': 'localhost',  # Adjust if MySQL is on a different machine
#     'user': 'root',
#     'password': '',
#     'database': 'payroll',
#     'port': 3307  # Replace if using a different port number (avoid conflicts)
# }

app = Flask(__name__)

# # Connect to database
# conn = mysql.connector.connect(**DATABASE_CONFIG)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        employee_data = data['data']

        # ... (Your existing data validation logic)

        predictions = []
        for employee in employee_data:

            # Extract other features and make prediction
            name= employee['name']
            leave = employee['absence']
            overtime = employee['overtime']
            salary = employee['totalPay']

            # Perform necessary data preprocessing (if needed)
            # ...

            prediction = model.predict([[leave, overtime, salary]])
            predictions.append({
                'employeeId': employee['employeeid'],
                'name' : name,
                'absence': leave,
                'overtime' : overtime,
                'salary': salary,
                'prediction': prediction.tolist()[0],  # Assuming single value prediction
                 # Add retrieved salary to the data
            })

        return jsonify({'predictions': predictions, 'success': True})
    except KeyError as e:
        return jsonify({'error': f'Missing key: {e}'}), 400
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
