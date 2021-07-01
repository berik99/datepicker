const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

minify({
    compressor: uglifyJS,
    input: '../dist/datepicker.js',
    output: '../dist',
    callback: function (err, min) {
        console.log(err);
    }
});