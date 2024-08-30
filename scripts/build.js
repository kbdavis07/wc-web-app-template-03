import fs from 'fs';
import path from 'path';
const { exec } = require('child_process');

function buildProject() {
    // Compile TypeScript
    exec('tsc', (error, stdout, stderr) => {
        if (error) {
            console.error(`TypeScript compilation error: ${error}`);
            return;
        }

        console.log('TypeScript compiled successfully, now getting ready to build the project');

        // Combine CSS files
        const cssDir = path.join(__dirname, '..', 'public', 'styles');
        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        const combinedCss = cssFiles.map(file => fs.readFileSync(path.join(cssDir, file), 'utf8')).join('\n');
        fs.writeFileSync(path.join(__dirname, '..', 'dist', 'styles', 'main.css'), combinedCss);

        // Copy HTML and other necessary files
        fs.copyFileSync(
            path.join(__dirname, '..', 'public', 'index.html'),
            path.join(__dirname, '..', 'dist', 'index.html')
        );
        fs.copyFileSync(
            path.join(__dirname, '..', 'public', 'site.pages.json'),
            path.join(__dirname, '..', 'dist', 'site.pages.json')
        );
        fs.copyFileSync(
            path.join(__dirname, '..', 'public', 'manifest.json'),
            path.join(__dirname, '..', 'dist', 'manifest.json')
        );
        fs.copyFileSync(
            path.join(__dirname, '..', 'public', 'service-worker.js'),
            path.join(__dirname, '..', 'dist', 'service-worker.js')
        );

        console.log('Build completed successfully');
    });
}

buildProject();