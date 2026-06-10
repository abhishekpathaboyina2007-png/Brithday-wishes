import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    upload_folder = app.config['UPLOAD_FOLDER']
    photos = []
    if os.path.exists(upload_folder):
        for f in sorted(os.listdir(upload_folder)):
            if allowed_file(f):
                photos.append(url_for('static', filename='uploads/' + f))
    return render_template('index.html', photos=photos)


@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'photos' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    files = request.files.getlist('photos')
    uploaded = []

    for file in files:
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(save_path)
            uploaded.append(url_for('static', filename='uploads/' + filename))

    if not uploaded:
        return jsonify({'error': 'No valid files uploaded'}), 400

    return jsonify({'success': True, 'photos': uploaded})


@app.route('/delete-photo', methods=['POST'])
def delete_photo():
    data = request.get_json()
    filename = data.get('filename', '')
    if filename:
        path = os.path.join(app.config['UPLOAD_FOLDER'], os.path.basename(filename))
        if os.path.exists(path):
            os.remove(path)
            return jsonify({'success': True})
    return jsonify({'error': 'File not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
