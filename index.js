const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Define the image paths
const inputImagePath = 'input.jpg';  // Input image path
const outputImagePath = 'output.jpg'; // Output image path
const overlayImagePath = 'overlay.png'; // Overlay image path

// Define the text to add and its properties
const text = 'Hello, World!';
const fontSize = 50;
const textX = 50;
const textY = 100;
const textColor = 'white';

async function addTextAndOverlay(inputImagePath, overlayImagePath, outputImagePath, text, fontSize, textX, textY, textColor) {
    // Load the input image
    const inputImage = await loadImage(inputImagePath);
    const overlayImage = await loadImage(overlayImagePath);

    // Create a canvas with the same dimensions as the input image
    const canvas = createCanvas(inputImage.width, inputImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the input image onto the canvas
    ctx.drawImage(inputImage, 0, 0);

    // Set the font properties for the text
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;

    // Draw the text onto the canvas
    ctx.fillText(text, textX, textY);

    // Draw the overlay image onto the canvas
    ctx.drawImage(overlayImage, inputImage.width - overlayImage.width, inputImage.height - overlayImage.height);

    // Convert the canvas to a buffer and use sharp to save it as an image
    const buffer = canvas.toBuffer('image/png');
    sharp(buffer)
        .toFile(outputImagePath)
        .then(() => {
            console.log('Image processing complete');
        })
        .catch(err => {
            console.error('Error processing image:', err);
        });
}

// Run the function to add text and overlay
addTextAndOverlay(inputImagePath, overlayImagePath, outputImagePath, text, fontSize, textX, textY, textColor);
