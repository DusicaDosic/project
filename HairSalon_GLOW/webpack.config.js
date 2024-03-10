const path = require('path');

module.exports = {
  mode: 'development',
  entry: 'GLOW/app.js', // Replace with the path to your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'), // Replace with the desired output directory
  },
};
