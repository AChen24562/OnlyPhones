from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/submit": {"origins": "http://localhost:63342"}})

def connect_to_database():
    """Connects to the MySQL database and returns the connection object."""
    connection = None
    try:
        connection = mysql.connector.connect(
            host='54.160.154.98',
            database='phone_db',
            user='user_355',
            password='CS355!'
        )
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def insert_phone_data(user, phone_model, capacity, wear, unlocked, carrier_lock, price):
    """Inserts phone data into the phone_table in the MySQL database."""
    connection = connect_to_database()
    if connection is not None:
        cursor = connection.cursor()
        query = """
        INSERT INTO phone_table (user, phone_model, capacity, wear, unlocked, carrier_lock, price)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        try:
            cursor.execute(query, (user, phone_model, capacity, wear, unlocked, carrier_lock, price))
            connection.commit()
            return True
        except Error as e:
            print(f"The error '{e}' occurred")
            return False
        finally:
            cursor.close()
            connection.close()
    else:
        return False

@app.route('/submit', methods=['POST'])
def submit():
    if request.is_json:
        data = request.get_json()
        user = data.get('user')
        phone_model = data.get('phone_model')
        capacity = data.get('capacity')
        wear = data.get('wear')
        unlocked = data.get('unlocked')
        carrier_lock = data.get('carrier_lock')
        price = data.get('price')

        # Insert the data into the database
        success = insert_phone_data(user, phone_model, capacity, wear, unlocked, carrier_lock, price)

        if success:
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Data insertion failed'}), 500
    else:
        return jsonify({'status': 'error', 'message': 'Request must be JSON'}), 400

@app.route('/phones', methods=['GET'])
@cross_origin(origin="http://local:63342")
def get_phones():
    username = request.args.get('username', default=None, type=str)
    connection = connect_to_database()
    if connection is not None:
        cursor = connection.cursor(dictionary=True)
        if username:
            query = "SELECT * FROM phone_table WHERE user = %s"
            cursor.execute(query, (username,))
        phones = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(phones), 200
    else:
        return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500

@app.route('/login', methods=['POST'])
@cross_origin(origins=["http://localhost:63342"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = connect_to_database()
    if connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        if user and password:
            return jsonify({'status': 'success', 'message': 'Login successful'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500

@app.route('/register', methods=['POST'])
@cross_origin(origins=["http://localhost:63342"])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = connect_to_database()
    if connection:
        cursor = connection.cursor(dictionary=True)
        try:
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password)
)
            connection.commit()
            return jsonify({'status': 'success', 'message': 'Registration successful'}), 201
        except Error as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port =5000, debug=True)