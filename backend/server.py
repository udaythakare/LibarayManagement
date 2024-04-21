from flask import Flask, request, jsonify,send_file,url_for,send_from_directory
from flask_cors import CORS
from PIL import Image
from datetime import datetime
import base64
import io
import mysql.connector
from datetime import timedelta
app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"/addEntry": {"origins": "http://localhost:3000"}})
CORS(app)
import barcode
from barcode.writer import ImageWriter
import os
from pyzbar.pyzbar import decode

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="uday",
  database="sblc"
)


@app.route('/bookReturned', methods=['POST'])
def bookReturned():
    data = request.get_json()
    student_id = data['student_id']
    book_id = data['book_id']
    current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    current_date = current_datetime.split()[0]

    cursor = mydb.cursor()
    cursor.execute("UPDATE student_has_books SET return_date = %s WHERE student_id = %s AND book_id = %s", (current_date, student_id, book_id))
    mydb.commit()
    cursor.close()
    return "Book returned"


@app.route('/fetchAllIssuedBook', methods=['GET'])
def fetchAllIssuedBook():
    cursor = mydb.cursor()
    cursor.execute(
        "SELECT book.*, student_has_books.issue_date, student_has_books.return_date, student.name, student.branch FROM book LEFT JOIN student_has_books ON book.id = student_has_books.book_id LEFT JOIN student ON student.id = student_has_books.student_id")
    rows = cursor.fetchall()

    # Convert rows to list of dictionaries
    result = []
    for row in rows:
        result.append({
            'book_id': row[0],
            'name': row[1],
            'author': row[3],
            'issued_date':row[5],
            'returned_date':row[6],
            'student_name':row[7],
            'student_branch':row[8]
        })

    print(result)

    return jsonify(result)


@app.route('/login', methods=['POST'])  # Changed endpoint to /authenticate
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM user_table WHERE user_name=%s AND user_password=%s", (email, password))
    result = cursor.fetchone()
    if result is not None:
        cursor.close()
        return "Login Successfull"
    cursor.close()
    return "Failed to Login"

@app.route('/addBook', methods=['POST'])
def addBook():
    data = request.get_json()
    book_name = data['book_name']
    book_description = data['book_description']
    quantity = data['quantity']
    isAvailable = "yes"
    book_author = data['book_author']
    cursor = mydb.cursor()
    for i in range(int(quantity)):
        cursor.execute("INSERT INTO book (name, description, author, isAvailable) VALUES (%s, %s, %s, %s)", (book_name, book_description, book_author,isAvailable))
        mydb.commit()


    if cursor.rowcount > 0:
        cursor.close()
        return "Book Added Successfully"
    else:
        cursor.close()
        return "Failed to add book"


@app.route('/getBooks', methods=['GET'])
def getBooks():
    print("hello")
    cursor = mydb.cursor()
    cursor.execute('''SELECT name, author, COUNT(*) AS total_books
                      FROM book
                      GROUP BY name, author ''')
    rows = cursor.fetchall()

    if len(rows) <= 0:
        return jsonify({'message': "No books entered"})

    books = []
    for row in rows:
        book = {
            'name': row[0],
            'author': row[1],
            'total_books': row[2]
        }
        books.append(book)

    cursor.close()

    return jsonify(books)


@app.route('/getAllBooks', methods=['GET'])
def getAllBooks():
    name = request.args.get('name')
    author = request.args.get('author')

    cursor = mydb.cursor()
    cursor.execute('SELECT * FROM book where name=%s and author=%s',[name,author])
    rows = cursor.fetchall()

    if len(rows) <= 0:
        return jsonify({'message': "No books entered"})

    books = []
    for row in rows:
        book = {
            'id':row[0],
            'name': row[1],
            'description': row[2],
            'author': row[3],
            'isAvailable':row[4]
        }
        books.append(book)

    cursor.close()

    return jsonify(books)


@app.route('/getStudentInfo', methods=['GET'])
def getStudentInfo():
    id = request.args.get('studentId')

    cursor = mydb.cursor()
    cursor.execute('SELECT * FROM student where id=%s',[id])
    rows = cursor.fetchall()

    if len(rows) <= 0:
        return jsonify({'message': "No Student Exists"})

    student = []
    for row in rows:
        book = {
            'id':row[0],
            'name': row[1],
            'branch': row[2],
            'gender': row[3],
            'year':row[4]
        }
        student.append(book)

    cursor.close()

    return jsonify(student)


@app.route('/issueBook', methods=['GET'])
def issueBook():
    try:
        student_id = request.args.get('studentId')
        book_id = request.args.get('bookId')
        current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        current_date = current_datetime.split()[0]

        print("Received request for issuing book with student ID:", student_id, "and book ID:", book_id)

        cursor = mydb.cursor()

        cursor.execute('SELECT * FROM student_has_books WHERE book_id=%s',(str(book_id),))
        rows = cursor.fetchall()

        if len(rows) > 0:
            return "Book already Issued"

        cursor.execute('INSERT INTO student_has_books(student_id,book_id,issue_date) values(%s,%s,%s)',[student_id,book_id,current_date])
        cursor.execute('UPDATE book SET isAvailable="no" WHERE id=%s',(book_id,))
        mydb.commit()
        cursor.close()

        return "Book Issued"
    except Exception as e:
        return "Error: " + str(e)


@app.route('/fetchIssuedBooks', methods=['GET'])
def fetchIssuedBooks():
    student_id = int(request.args.get('studentId'))  # Convert to integer
    print(student_id,'this is student')
    cursor = mydb.cursor()
    cursor.execute('''
        SELECT student_has_books.*, book.*
        FROM student_has_books
        LEFT JOIN book ON book.id = student_has_books.book_id
        WHERE student_has_books.student_id = %s
    ''', (student_id,))  # Pass as a tuple

    rows = cursor.fetchall()
    print(rows)

    if len(rows) <= 0:
        cursor.close()
        return jsonify({'message': "No Issued Book"})

    student = []
    for row in rows:
        book = {
            'student_id': row[0],
            'book_id': row[1],
            'issue_date': row[2],
            'return_date': row[3],
            'name': row[5],
            'description': row[6],
            'author': row[7],
            'isAvailable': row[8],
        }
        student.append(book)

    cursor.close()

    return jsonify(student)



from datetime import timedelta

@app.route('/getEntries', methods=['GET'])
def getEntries():
    cursor = mydb.cursor()
    cursor.execute("""
        SELECT entry.*, student.* 
        FROM entry 
        LEFT JOIN student ON entry.studentId = student.id 
        ORDER BY entry.id DESC
    """)
    rows = cursor.fetchall()

    entries = []
    for row in rows:
        entry = {
            'id': row[0],
            'studentId': row[1],
            'date': row[2].strftime('%Y-%m-%d'),  # Convert date to string
            'time': str(row[3]),  # Convert timedelta to string
            'name': row[5],
            'branch': row[6]
            # Add other fields from the entry and student tables as needed
        }
        entries.append(entry)

    cursor.close()

    return jsonify(entries)





@app.route('/deleteBook', methods=['POST'])
def deleteBook():
    data = request.get_json()
    bookId = data['bookId']
    print(bookId)
    cursor = mydb.cursor()
    cursor.execute("DELETE FROM book WHERE id=%s", (bookId,))
    mydb.commit()
    cursor.close()
    if cursor.rowcount > 0:
        return "Book deleted"
    else:
        return "Failed to delete book"



# @app.route('/editBook', methods=['POST'])
# def editBook():
#     data = request.get_json()
#     book_name = data['book_name']
#     book_description = data['book_description']
#     quantity = data['book_quantity']
#     book_author = data['book_author']
#     book_id = data['book_id']
#     cursor = mydb.cursor()
#     cursor.execute("UPDATE book SET name=%s, description=%s, author=%s where ", (book_name, book_description,quantity,book_author,book_id))
#     mydb.commit()
#     if cursor.rowcount > 0:
#         cursor.close()
#         return "Book Edited Successfully"
#     else:
#         cursor.close()
#         return "Failed to edit book"

@app.route('/barcodes/<path:filename>')
def serve_barcode(filename):
    return send_from_directory('barcodes', filename)


@app.route('/addStudent', methods=['POST'])
def addStudent():
    data = request.get_json()
    name = data['name']
    branch = data['branch']
    year = data['year']
    gender = data['gender']
    cursor = mydb.cursor()
    cursor.execute("INSERT INTO student (name, branch, year, gender) VALUES (%s, %s, %s, %s)",
                   (name, branch, year, gender))
    mydb.commit()
    if cursor.rowcount > 0:
        # Fetch the last insert ID
        insert_id = cursor.lastrowid
        # Generate a barcode using python-barcode library
        barcode_value = str(insert_id)  # Example barcode value
        barcode_image = barcode.Code128(barcode_value, writer=ImageWriter())

        # Ensure that the 'barcodes' directory exists, create it if not
        barcode_dir = 'barcodes'
        if not os.path.exists(barcode_dir):
            os.makedirs(barcode_dir)

        barcode_image_path = os.path.join(barcode_dir, str(insert_id) + '.png')
        barcode_image.save(barcode_image_path)

        # Return the URL of the barcode image
        return {'barcode_url': f'/barcodes/{insert_id}.png'}
    else:
        return "Failed to add student"


@app.route('/deleteStudent', methods=['POST'])
def deleteStudent():
    data = request.get_json()
    studentId = data['studentId']
    print(studentId)
    cursor = mydb.cursor()
    cursor.execute("DELETE FROM student WHERE id=%s", (studentId,))
    mydb.commit()
    cursor.close()
    if cursor.rowcount > 0:
        return "Student deleted"
    else:
        return "Failed to delete student"


def read_barcode(image_path):
    # Open the image
    with Image.open(image_path) as img:
        # Decode the barcode
        barcodes = decode(img)
        if barcodes:
            # Return the barcode value
            return barcodes[0].data.decode('utf-8')
        else:
            return "No barcode found"


@app.route('/addEntry', methods=['POST'])
def addEntry():
    # Print a message to ensure the route is being accessed
    print('hello')

    # Get the image data from the request
    image_data = request.files['image']

    # Save the image to the "barcodes" folder
    image_path = os.path.join('barcodes', 'captured_image.jpg')
    image_data.save(image_path)

    # Read barcode from the saved image
    decoded_data = read_barcode(image_path)

    if decoded_data == "no barcode found":
        return "no barcode found"

    # Get the current date and time in MySQL format
    current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Insert the data into the database
    cursor = mydb.cursor()
    cursor.execute("INSERT INTO entry (studentId, date, time) VALUES (%s, %s, %s)", (decoded_data, current_datetime.split()[0], current_datetime.split()[1]))
    mydb.commit()

    # Check if the entry was successfully added
    if cursor.rowcount > 0:
        cursor.close()
        return "Entry Added"
    else:
        return "Failed to add student"



@app.route('/getStudents', methods=['GET'])
def getStudents():
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM student ORDER BY id DESC")
    rows = cursor.fetchall()

    students = []
    for row in rows:
        book = {
            'id': row[0],
            'name': row[1],
            'branch': row[2],
            'year': row[3],
            'gender':row[4]
        }
        students.append(book)

    cursor.close()

    return jsonify(students)



@app.route('/', methods=['GET'])
def index():
    return 'Hello World'

if __name__ == '__main__':
    app.run(debug=True)
