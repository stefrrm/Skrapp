from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)
CORS(app)


connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='skrapp_db',
    cursorclass=pymysql.cursors.DictCursor
)
print("Conexión exitosa a la base de datos.")


@app.route("/")
def home():
    return "Yo soy API"


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    print(f"Email: {email}, Password: {password}")

    with connection.cursor() as cursor:
        # Validacion profe
        cursor.execute(
            "SELECT * FROM profesor WHERE email=%s AND password=%s", (email, password))
        profesor = cursor.fetchone()
        print(f"Profesor encontrado: {profesor}")

        if profesor:
            return jsonify({"role": "profesor", "id": profesor['id']}), 200

        # Validacion alumno
        cursor.execute(
            "SELECT * FROM alumno WHERE email=%s AND password=%s", (email, password))
        alumno = cursor.fetchone()
        print(f"Alumno encontrado: {alumno}")

        if alumno:
            return jsonify({"role": "alumno", "id": alumno['id']}), 200

    return jsonify({"error": "Credenciales incorrectas"}), 401


@app.route('/profesor/<int:id_profesor>', methods=['GET'])
def obtener_profesor_y_cursos(id_profesor):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM profesor WHERE id=%s", (id_profesor,))
        profesor = cursor.fetchone()

        cursor.execute(
            "SELECT * FROM curso WHERE id_profesor=%s", (id_profesor,))
        cursos = cursor.fetchall()

        if profesor:
            resultado = {
                "profesor": {
                    "id": profesor['id'],
                    "nombre": profesor['nombre'],
                    "email": profesor['email'],
                },
                "curso": [
                    {
                        "id": curso['id'],
                        "nombre": curso['nombre'],
                        "codigo": curso['codigo'],
                        "seccion": curso['seccion'],
                        "institucion": curso['institucion']
                    } for curso in cursos
                ]
            }
            return jsonify(resultado), 200

    return jsonify({"error": "Profesor no encontrado"}), 404


@app.route('/alumno/<int:id_alumno>', methods=['GET'])
def obtener_datos_alumno(id_alumno):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM alumno WHERE id=%s", (id_alumno,))
        alumno = cursor.fetchone()

        if alumno:
            resultado = {
                "alumno": {
                    "id": alumno['id'],
                    "nombre": alumno['nombre'],
                    "email": alumno['email'],
                    "institucion": alumno['institucion'],
                }
            }
            return jsonify(resultado), 200

    return jsonify({"error": "Alumno no encontrado"}), 404


if __name__ == "__main__":
    app.run(port=5000)
