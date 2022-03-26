
from flask import Flask, render_template, request
from PyPDF2 import PdfFileWriter, PdfFileReader
from flask_wtf.csrf import CSRFProtect
import pdfkit
import secrets
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET KEY HERE'
csrf = CSRFProtect(app)

options = {
    'page-size': 'A4',
    'margin-top': '0.75in',
    'margin-right': '0.75in',
    'margin-bottom': '0.75in',
    'margin-left': '0.75in',
    'header-spacing': '3.95',
    'header-font-size': '14'
}


def encrypt_pdf(pdf, filename, password):
    ''' Copy PDF passed to the function and encrypt the new version '''
    pdf = PdfFileReader(pdf)
    pdfwrite = PdfFileWriter()
    _ = [pdfwrite.addPage(pdf.getPage(page)) for page in range(pdf.numPages)]
    pdfwrite.encrypt(password)
    with open(f'pdf/{filename}.pdf', 'wb') as encrypted_pdf:
        pdfwrite.write(encrypted_pdf)


def remove_pdf(folder):
    ''' remove all pdfs that begin with an underscore character '''
    for filename in os.listdir(folder):
        if filename.startswith('_', 0):
            os.remove(f'{folder}/{filename}')


@app.route('/', methods=['GET', 'POST'])
def index():
    password = secrets.token_hex(8)
    if request.method == 'POST':
        data = request.json
        data.pop(0)
        filename = data[1]['value']
        options['header-center'] = data[2]['value']
        data.pop(2)
        pdf_body = [value['value'] for count,
                    value in enumerate(data) if count > 1]
        pdf = f'pdf/_{filename}.pdf'
        pdfkit.from_string(render_template('pdf.j2', body=pdf_body),
                           pdf, options=options)
        encrypt_pdf(pdf, filename, data[0]['value'])
        remove_pdf('pdf')
    return render_template('index.j2', password=password)


if __name__ == '__main__':
    app.run(port=5900, debug=True)
