const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, '../../dist/angular-ssr-app/server');

// Rename the problematic files
try {
  // Check if files exist before renaming them
  if (fs.existsSync(path.join(serverDir, 'main.server.mjs'))) {
    fs.renameSync(
      path.join(serverDir, 'main.server.mjs'),
      path.join(serverDir, 'main_server.mjs')
    );
    console.log('Renamed main.server.mjs to main_server.mjs');
  }

  if (fs.existsSync(path.join(serverDir, 'polyfills.server.mjs'))) {
    fs.renameSync(
      path.join(serverDir, 'polyfills.server.mjs'),
      path.join(serverDir, 'polyfills_server.mjs')
    );
    console.log('Renamed polyfills.server.mjs to polyfills_server.mjs');
  }

  // Update references in server.mjs
  if (fs.existsSync(path.join(serverDir, 'server.mjs'))) {
    let serverContent = fs.readFileSync(path.join(serverDir, 'server.mjs'), 'utf8');
    
    // Replace import references
    serverContent = serverContent.replace(/main\.server\.mjs/g, 'main_server.mjs');
    serverContent = serverContent.replace(/polyfills\.server\.mjs/g, 'polyfills_server.mjs');
    
    fs.writeFileSync(path.join(serverDir, 'server.mjs'), serverContent, 'utf8');
    console.log('Updated references in server.mjs');
  }

  console.log('Server files successfully renamed for Netlify deployment');
} catch (error) {
  console.error('Error renaming server files:', error);
  process.exit(1);
} 