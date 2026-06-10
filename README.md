# 🎂 Advance Happy Birthday Website

A beautiful, romantic, and elegant single-page birthday website built with Flask + Python.

## ✨ Features

- 💖 Full-screen hero with animated text
- ⏳ Live countdown timer to her birthday
- 📸 Auto-advancing photo carousel
- 🖼️ Polaroid-style memories gallery with hover effects
- 📤 Photo upload (drag & drop or click)
- 💌 Hidden romantic letter with typewriter effect
- 🎊 Confetti animation
- 🎵 Background music with play/pause
- 🌸 Floating hearts + particle effects
- 📱 Fully mobile responsive
- 🪟 Glassmorphism design (pink + lavender + white)

## 🚀 Quick Start

### 1. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 2. Customize your birthday date

Open `templates/index.html` and find this line (around line 57):

```html
<div id="birthday-date" data-date="2025-12-25" hidden></div>
```

Change `2025-12-25` to her actual birthday in `YYYY-MM-DD` format.

### 3. (Optional) Add your own background music

Replace the audio source URL in `templates/index.html`:

```html
<audio id="bg-audio" loop>
  <source src="YOUR_MUSIC_URL_OR_PATH" type="audio/mpeg" />
</audio>
```

Or copy your `.mp3` file into `static/` and change the src to `{{ url_for('static', filename='your-song.mp3') }}`.

### 4. Run the app

```bash
python app.py
```

Then open your browser at: **http://localhost:5000**

### 5. Upload your photos

Click **"Upload Our Photos"** on the page and select up to 3 photos.
They'll instantly appear in the carousel and the memories gallery!

## 📁 Project Structure

```
birthday-app/
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── README.md               # This file
├── templates/
│   └── index.html          # Main page template
└── static/
    ├── css/
    │   └── style.css       # All styles
    ├── js/
    │   └── main.js         # Interactivity & animations
    └── uploads/            # Uploaded photos (auto-created)
```

## 💝 Personalization Tips

| What to change | Where |
|---|---|
| Birthday date | `templates/index.html` → `data-date="..."` |
| Background music | `templates/index.html` → `<audio>` tag |
| The love letter text | `static/js/main.js` → `const LETTER = \`...\`` |
| Your name / her name | `templates/index.html` → "My Princess", "My Love" |
| Photo captions | `templates/index.html` → polaroid caption list |
| Nav logo text | `templates/index.html` → `.nav-logo` |

---

Made with ❤️ — because she deserves the most beautiful surprise 🌸
