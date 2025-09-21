// Simple script to create app icons
const fs = require('fs');

// Create a simple HTML file that will generate the icons
const iconHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>App Icon Generator</title>
</head>
<body>
    <canvas id="icon192" width="192" height="192"></canvas>
    <canvas id="icon512" width="512" height="512"></canvas>
    
    <script>
        function createIcon(canvasId, size) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            
            // Add rounded corners
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.roundRect(0, 0, size, size, size * 0.1);
            ctx.fill();
            
            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';
            
            // Add emoji
            ctx.font = size * 0.4 + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🍎', size/2, size/2);
            
            // Download the image
            const link = document.createElement('a');
            link.download = canvasId === 'icon192' ? 'logo192.png' : 'logo512.png';
            link.href = canvas.toDataURL();
            link.click();
        }
        
        // Generate both icons
        setTimeout(() => {
            createIcon('icon192', 192);
            setTimeout(() => createIcon('icon512', 512), 500);
        }, 100);
    </script>
</body>
</html>
`;

fs.writeFileSync('icon-generator.html', iconHTML);
console.log('Icon generator created! Open icon-generator.html in your browser to generate icons.');
