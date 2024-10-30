from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)

CORS(app)

# Configuración de la conexión a la base de datos
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='skrapp_db',
    cursorclass=pymysql.cursors.DictCursor
)

# Ruta para login


@app.route("/")
def home():
    return "Bienvenido a la API"


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        username = data.get("username")  # Tomamos el username del request
        password = data.get("password")    # Tomamos el password del request

        with connection.cursor() as cursor:
            # Usamos el nombre de las columnas correctas de tu tabla
            sql = "SELECT * FROM usuarios WHERE username=%s AND password=%s"
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()
            print(f"Consulta: {username}, {password} - Resultado: {result}")

        if result:
            # Si el usuario existe, devolvemos un mensaje de éxito
            return jsonify({"message": "Acceso permitido", "role": result['role']}), 200
        else:
            # Si no hay coincidencias, devolvemos un mensaje de error
            return jsonify({"message": "Usuario o contraseña incorrectos"}), 401

    except Exception as e:
        print(f"Error: {e}")  # Imprimir el error en la consola para depuración
        return jsonify({"error": str(e)}), 500


# Iniciar la app en el puerto 5000
if __name__ == "__main__":
    app.run(port=5000)
