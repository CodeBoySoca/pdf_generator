from flask import Flask, render_template, flash, redirect, url_for, request
from flask_wtf.csrf import CSRFProtect
import PyPDF2



app = Flask(__name__)
app.config['SECRET_KEY'] = ''
csrf = CSRFProtect(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file_name = request.form.get('filename')
        body_text = request.form.get('body')
        print(file_name)
    return render_template('index.j2')


if __name__ == '__main__':
    app.run(port=5900, debug=True)