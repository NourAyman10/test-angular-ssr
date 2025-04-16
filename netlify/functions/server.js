const fs = require('fs');
const path = require('path');

// Path to the server bundle
const serverDir = path.join(__dirname, '../../dist/angular-ssr-app/server');
const serverBundlePath = path.join(serverDir, 'server.mjs');

exports.handler = async (event, context) => {
  try {
    console.log('Loading server module from:', serverBundlePath);
    const serverModule = await import(serverBundlePath);
    
    if (!serverModule || !serverModule.createServerRenderer) {
      throw new Error('Server module does not export createServerRenderer function');
    }
    
    const renderer = serverModule.createServerRenderer();
    
    // Create a Netlify-compatible request object
    const req = {
      headers: event.headers,
      method: event.httpMethod,
      url: event.path,
      query: event.queryStringParameters || {},
    };
    
    if (event.queryStringParameters) {
      req.url += `?${new URLSearchParams(event.queryStringParameters).toString()}`;
    }

    console.log('Rendering page for URL:', req.url);
    
    // Render the application
    const response = await renderer(req);
    
    return {
      statusCode: response.statusCode || 200,
      headers: {
        'Content-Type': 'text/html',
        ...response.headers
      },
      body: response.body || '',
    };
  } catch (error) {
    console.error('Server-side rendering error:', error);
    // Return a more detailed error message for debugging
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <html>
          <head><title>Server Error</title></head>
          <body>
            <h1>Server Error</h1>
            <p>The server encountered an error while rendering the page:</p>
            <pre>${error.stack || error.message || 'Unknown error'}</pre>
          </body>
        </html>
      `
    };
  }
};