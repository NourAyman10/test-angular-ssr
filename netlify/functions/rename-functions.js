const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, '../../dist/angular-ssr-app/server');

// Function to ensure browser directory exists
function ensureBrowserDirectory() {
  const browserDir = path.join(__dirname, '../../dist/angular-ssr-app/browser');
  const distDir = path.join(__dirname, '../../dist/angular-ssr-app');
  
  // If browser directory doesn't exist but other files do, create it and move files
  if (!fs.existsSync(browserDir) && fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    
    // Create browser directory
    fs.mkdirSync(browserDir, { recursive: true });
    
    // Move browser files to browser directory (excluding server and prerendered-routes.json)
    files.forEach(file => {
      const filePath = path.join(distDir, file);
      if (file !== 'server' && file !== 'prerendered-routes.json' && file !== 'browser') {
        const destPath = path.join(browserDir, file);
        fs.renameSync(filePath, destPath);
        console.log(`Moved ${file} to browser directory`);
      }
    });
  }
}

// Function to rename files and update all references
function renameServerFiles() {
  try {
    // Rename the main files first
    const oldMainFile = path.join(serverDir, 'main.server.mjs');
    const newMainFile = path.join(serverDir, 'main_server.mjs');
    const oldPolyfillsFile = path.join(serverDir, 'polyfills.server.mjs');
    const newPolyfillsFile = path.join(serverDir, 'polyfills_server.mjs');

    if (fs.existsSync(oldMainFile)) {
      fs.renameSync(oldMainFile, newMainFile);
      console.log('Renamed main.server.mjs to main_server.mjs');
    }

    if (fs.existsSync(oldPolyfillsFile)) {
      fs.renameSync(oldPolyfillsFile, newPolyfillsFile);
      console.log('Renamed polyfills.server.mjs to polyfills_server.mjs');
    }

    // Process all .mjs files in the server directory to update references
    const files = fs.readdirSync(serverDir);
    
    files.forEach(file => {
      if (file.endsWith('.mjs')) {
        const filePath = path.join(serverDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace all occurrences of the old filenames with the new ones
        let hasChanges = false;
        
        if (content.includes('./main.server.mjs')) {
          content = content.replace(/\.\/main\.server\.mjs/g, './main_server.mjs');
          hasChanges = true;
        }
        
        if (content.includes('./polyfills.server.mjs')) {
          content = content.replace(/\.\/polyfills\.server\.mjs/g, './polyfills_server.mjs');
          hasChanges = true;
        }
        
        // If there were any changes, write the updated content back to the file
        if (hasChanges) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated references in ${file}`);
        }
      }
    });

    console.log('Server files successfully renamed for Netlify deployment');
  } catch (error) {
    console.error('Error renaming server files:', error);
    process.exit(1);
  }
}

// Run functions
ensureBrowserDirectory();
renameServerFiles(); 