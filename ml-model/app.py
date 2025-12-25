from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from sklearn.cluster import KMeans
import webcolors
import base64
import io
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

class SkinToneAnalyzer:
    def __init__(self):
        self.cluster_count = 3  # Number of dominant colors to find
        # Load Haar cascade for face detection
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
    def analyze_image(self, image_path):
        # Load image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Could not load image")
            
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Resize for faster processing while maintaining aspect ratio
        height, width = image.shape[:2]
        max_dim = 500
        if max(height, width) > max_dim:
            scale = max_dim / max(height, width)
            new_width = int(width * scale)
            new_height = int(height * scale)
            image = cv2.resize(image, (new_width, new_height))
        
        # Detect faces
        faces = self.detect_faces(image)
        
        if len(faces) == 0:
            raise ValueError("No faces detected in the image")
        
        # Use the largest face found
        largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
        x, y, w, h = largest_face
        
        # Extract face region with some padding
        padding = 20  # pixels padding around the face
        y_start = max(0, y - padding)
        y_end = min(image.shape[0], y + h + padding)
        x_start = max(0, x - padding)
        x_end = min(image.shape[1], x + w + padding)
        
        face_region = image[y_start:y_end, x_start:x_end]
        
        # If face region is too small, use the original detection
        if face_region.size == 0:
            face_region = image[y:y+h, x:x+w]
        
        # Get dominant colors
        dominant_colors = self.get_dominant_colors(face_region)
        
        # Determine skin tone category
        skin_tone = self.classify_skin_tone(dominant_colors[0])  # Use most dominant color
        
        return {
            'skin_tone': skin_tone,
            'dominant_colors': [webcolors.rgb_to_hex(color) for color in dominant_colors],
            'face_detected': True,
            'face_coordinates': {
                'x': int(x),
                'y': int(y),
                'width': int(w),
                'height': int(h)
            }
        }
    
    def detect_faces(self, image):
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Detect faces with adjusted parameters for better accuracy
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )
        
        return faces
    
    def get_dominant_colors(self, image, k=3):
        # Reshape and filter out very dark/bright pixels that might not be skin
        pixels = image.reshape(-1, 3)
        
        # Filter out extreme colors (likely not skin)
        mask = np.all((pixels > 30) & (pixels < 240), axis=1)
        skin_pixels = pixels[mask]
        
        if len(skin_pixels) == 0:
            # If no pixels meet criteria, use all pixels
            skin_pixels = pixels
        
        kmeans = KMeans(n_clusters=k, n_init=10, random_state=42)
        kmeans.fit(skin_pixels)
        
        colors = kmeans.cluster_centers_
        counts = np.bincount(kmeans.labels_)
        
        # Sort by frequency
        sorted_colors = [color for _, color in sorted(zip(counts, colors), reverse=True)]
        
        return [color.astype(int) for color in sorted_colors]
    
    def classify_skin_tone(self, rgb_color):
        r, g, b = rgb_color
        
        # Convert to HSV for better color analysis
        hsv_color = cv2.cvtColor(np.uint8([[rgb_color]]), cv2.COLOR_RGB2HSV)[0][0]
        h, s, v = hsv_color
        
        # More sophisticated classification using both RGB and HSV
        if h < 30 or h > 160:  # Reddish or bluish tones (cool)
            if r > g + 15 and r > b + 15:
                return 'cool'
        elif 30 <= h <= 75:  # Yellowish tones (warm)
            if g > r and g > b:
                return 'warm'
        
        # Default to neutral if not clearly warm or cool
        return 'neutral'

analyzer = SkinToneAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_skin_tone():
    print("📸 Request received!", flush=True) # Check logs for this
    try:
        if 'image' not in request.files:
            print("❌ No image found in request", flush=True)
            return jsonify({"error": "No image"}), 400
            
        image_file = request.files['image']
        print(f"📂 File received: {image_file.filename}", flush=True)
        
        # Validate file type
        if not image_file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
            return jsonify({'error': 'Unsupported file format'}), 400
        
        # Save the uploaded file temporarily
        temp_path = f"temp_{image_file.filename}"
        image_file.save(temp_path)
        
        # Analyze image
        result = analyzer.analyze_image(temp_path)
        
        # Clean up temporary file
        os.remove(temp_path)
        
        return jsonify(result)
        
    except ValueError as e:
        return jsonify({'error': str(e), 'face_detected': False}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'face_detection_loaded': analyzer.face_cascade is not None})

if __name__ == '__main__':
    app.run(port=5001, debug=True)