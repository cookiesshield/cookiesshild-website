const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to extract main points (simple example)
function extractMainPoints(text) {
    // Split text into sentences and return the first few as main points
    const sentences = text.split('.').map(sentence => sentence.trim()).filter(Boolean);
    return sentences.slice(0, 3); // Return the first 3 sentences as main points
}

// Endpoint to handle file and text uploads
app.post('/analyze', upload.single('file'), (req, res) => {
    const text = req.body.text; // Get text input
    const file = req.file; // Get uploaded file

    let fileContent = '';

    // If a file is uploaded, read its content
    if (file) {
        const filePath = path.join(__dirname, file.path);
        fileContent = fs.readFileSync(filePath, 'utf-8');
        fs.unlinkSync(filePath); // Delete the file after reading
    }

    // Combine text input and file content
    const combinedText = text + ' ' + fileContent;

    // Extract main points
    const mainPoints = extractMainPoints(combinedText);

    // Return the main points as a response
    res.json({ summary: mainPoints });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});