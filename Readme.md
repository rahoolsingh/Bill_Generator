Sure, here's a basic README for your script:

---

# Image Text and Signature Overlay

This script allows you to add text and multiple signature overlays onto an image.

## Requirements

- Node.js (v14 or later)
- Canvas library
- Sharp library
- Jimp library

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/rahoolsingh/Bill_Generator
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

Modify the script parameters according to your requirements:

- **Input Image**: Specify the path to your input image (`inputImagePath`).
- **Output Image**: Specify the desired path for the output image (`outputImagePath`).
- **Texts**: Define an array of text objects (`texts`), each containing the text content, size, position, style, and font.
- **Signature Images**: Define an array of signature image objects (`signatureImages`), each containing the path to the signature image and its position on the canvas.
- **Text Color**: Define the color for the text (`textColor`).

Run the script using Node.js:

```bash
node script.js
```

## Example

```javascript
const inputImagePath = 'input.jpg';
const outputImagePath = 'output.jpg';

const texts = [
    { text: 'Hello World', size: 25, xCord: 100, yCord: 100, style: 'normal', font: 'Arial' },
    // Add more text objects as needed
];

const signatureImages = [
    { path: 'signature1.png', xCord: 200, yCord: 200 },
    { path: 'signature2.png', xCord: 300, yCord: 300 },
    // Add more signature image objects as needed
];

const textColor = 'black';

addTextAndOverlay(inputImagePath, signatureImages, outputImagePath, texts, textColor);
```
