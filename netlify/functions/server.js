const { createServerRenderer } = require('../../dist/angular-ssr-app/server/server');

exports.handler = async (event, context) => {
  const renderer = createServerRenderer();
  
  try {
    const response = await renderer(event);
    return {
      statusCode: response.statusCode || 200,
      headers: response.headers || {},
      body: response.body || '',
    };
  } catch (error) {
    console.error('Error rendering page:', error);
    return {
      statusCode: 500,
      body: 'Server Error'
    };
  }
};