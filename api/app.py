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
print("Conexión exitosa a la base de datos.")


# Ruta para la página de inicio
@app.route("/")
def home():
    return "Bienvenido a la API"

# Ruta para el login


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Para verificar los datos recibidos
    print(f"Email: {email}, Password: {password}")

    with connection.cursor() as cursor:
        # Validación de profesor
        cursor.execute(
            "SELECT * FROM profesor WHERE email=%s AND password=%s", (email, password))
        profesor = cursor.fetchone()
        # Para verificar el resultado de la consulta
        print(f"Profesor encontrado: {profesor}")

        if profesor:
            return jsonify({"role": "profesor", "id": profesor['id']}), 200

        # Validación de alumno
        cursor.execute(
            "SELECT * FROM alumno WHERE email=%s AND password=%s", (email, password))
        alumno = cursor.fetchone()
        # Para verificar el resultado de la consulta
        print(f"Alumno encontrado: {alumno}")

        if alumno:
            return jsonify({"role": "alumno", "id": alumno['id']}), 200

    # Si no existe en ninguna tabla
    return jsonify({"error": "Credenciales incorrectas"}), 401


@app.route('/profesor/<int:id_profesor>', methods=['GET'])
def obtener_profesor_y_cursos(id_profesor):
    with connection.cursor() as cursor:
        # Obtener información del profesor
        cursor.execute("SELECT * FROM profesor WHERE id=%s", (id_profesor,))
        profesor = cursor.fetchone()

        # Obtener cursos del profesor
        cursor.execute(
            "SELECT * FROM curso WHERE id_profesor=%s", (id_profesor,))
        cursos = cursor.fetchall()

        # Combinar los resultados
        if profesor:
            resultado = {
                "profesor": {
                    "id": profesor['id'],
                    # Asegúrate de que este campo exista en tu tabla
                    "nombre": profesor['nombre'],
                    "email": profesor['email'],
                },
                "curso": [
                    {
                        "id": curso['id'],
                        "nombre": curso['nombre'],
                        "codigo": curso['codigo'],
                        "seccion": curso['seccion']
                    } for curso in cursos
                ]
            }
            return jsonify(resultado), 200

    return jsonify({"error": "Profesor no encontrado"}), 404


# Iniciar la app en el puerto 5000
if __name__ == "__main__":
    app.run(port=5000)
