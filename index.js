const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Define the image paths
const inputImagePath = 'input.jpg';  // Input image path
const outputImagePath = 'output.jpg'; // Output image path
const overlayImagePath = 'overlay.png'; // Overlay image path

// Define an array of text objects
const texts = [
    { text: '025484', size: 25, xCord: 110, yCord: 195, style: '900', font:"sans-serif" },
    { text: 'Site Name Here', size: 14, xCord: 145, yCord: 147, style: '600', font:"Arial" },
    { text: '21/09/2002', size: 14, xCord: 400, yCord: 147, style: '600', font:"Arial" },
    { text: '01:00 PM', size: 14, xCord: 400, yCord: 185, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 200, yCord: 225, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 190, yCord: 280, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 160, yCord: 335, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 155, yCord: 390, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 230, yCord: 443, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 150, yCord: 498, style: '600', font:"Arial" },
    { text: 'Lorem Ipsum India Is Great', size: 14, xCord: 150, yCord: 550, style: '600', font:"Arial" },
];

const textColor = 'black';

async function addTextAndOverlay(inputImagePath, overlayImagePath, outputImagePath, texts, textColor) {
    try {
        // Load the input image
        const inputImage = await loadImage(inputImagePath);
        const overlayImage = await loadImage(overlayImagePath);

        // Create a canvas with the same dimensions as the input image
        const canvas = createCanvas(inputImage.width, inputImage.height);
        const ctx = canvas.getContext('2d');

        // Draw the input image onto the canvas
        ctx.drawImage(inputImage, 0, 0);

        // Set common properties for text
        ctx.fillStyle = textColor;

        // Draw each text onto the canvas
        texts.forEach(({ text, size, xCord, yCord, style, font }) => {
            console.log(font);
            ctx.font = `${style} ${size}px ${font}`;
            ctx.fillText(text, xCord, yCord);
        });

        // Draw the overlay image onto the canvas
        ctx.drawImage(overlayImage, inputImage.width - overlayImage.width, inputImage.height - overlayImage.height);

        // Convert the canvas to a buffer and use sharp to save it as an image
        const buffer = canvas.toBuffer('image/png');
        await sharp(buffer).toFile(outputImagePath);

        console.log('Image processing complete');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

// Run the function to add text and overlay
addTextAndOverlay(inputImagePath, overlayImagePath, outputImagePath, texts, textColor);
