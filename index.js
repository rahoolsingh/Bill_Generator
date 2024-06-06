const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const Jimp = require('jimp');

// Define the image paths
const inputImagePath = 'input.jpg';  // Input image path
const outputImagePath = 'output.jpg'; // Output image path

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

const signatureImages = [
    {path: 'signature.png', xCord: 60, yCord: 570},
    {path: 'signature.png', xCord: 220, yCord: 570},
    {path: 'signature.png', xCord: 390, yCord: 570}
];

const textColor = 'black';

async function addTextAndOverlay(inputImagePath, signatureImages, outputImagePath, texts, textColor) {
    try {
        // Load the input image
        const inputImage = await loadImage(inputImagePath);

        // Create a canvas with the same dimensions as the input image
        const canvas = createCanvas(inputImage.width, inputImage.height);
        const ctx = canvas.getContext('2d');

        // Draw the input image onto the canvas
        ctx.drawImage(inputImage, 0, 0);

        // Set common properties for text
        ctx.fillStyle = textColor;

        // Draw each text onto the canvas
        texts.forEach(({ text, size, xCord, yCord, style, font }) => {
            ctx.font = `${style} ${size}px ${font}`;
            ctx.fillText(text, xCord, yCord);
        });

        // Load and resize each overlay image using Jimp
        const overlayPromises = signatureImages.map(async (signature) => {
            // Load the overlay image using Jimp and resize it
            const overlay = await Jimp.read(signature.path);
            overlay.resize(110, 110);

            // Convert the resized overlay image to a buffer
            const overlayBuffer = await overlay.getBufferAsync(Jimp.MIME_PNG);

            // Load the resized overlay image onto the canvas
            const resizedOverlayImage = await loadImage(overlayBuffer);
            ctx.drawImage(
                resizedOverlayImage,
                signature.xCord,
                signature.yCord
            );
        });

        // Await all the overlay promises to complete
        await Promise.all(overlayPromises);

        // Convert the canvas to a buffer and use sharp to save it as an image
        const buffer = canvas.toBuffer('image/png');
        await sharp(buffer).toFile(outputImagePath);

        console.log('Image processing complete');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

// Run the function to add text and overlay
addTextAndOverlay(inputImagePath, signatureImages, outputImagePath, texts, textColor);
