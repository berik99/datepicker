const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const terser = require('@node-minify/terser');
const fs = require('fs');
const pjson = require('../package.json');
const { execSync } = require("child_process");

const heading = `/*!\n  * datepicker v${pjson.version}\n  * Copyright ${new Date().getFullYear()} ${pjson.author}\n  * Licensed under ${pjson.license}\n  */\n`;

fs.readdir("./src/themes", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        buildCSS(file, heading);
    });
});
buildJS(heading);

function buildJS(heading) {
    execSync("npx babel ./src/datepicker.js -o temp");

    minify({
        compressor: terser,
        input: "temp",
        output: "temp",
        callback: function (err, data) {
            if (err) throw err;
            fs.writeFileSync("./dist/datepicker.min.js", heading);
            fs.appendFileSync("./dist/datepicker.min.js", data);
        }
    });
    fs.unlinkSync("temp");
}

function buildCSS(file) {
    const style = fs.readFileSync("./src/datepicker.css", { encoding: "utf8" });
    const theme = fs.readFileSync("./src/themes/" + file, { encoding: "utf8" });
    const fileName = `./dist/datepicker-${file.replace(".dptheme", "")}.min.css`;
    fs.writeFileSync("temp", theme);
    fs.appendFileSync("temp", style);
    minify({
        compressor: cleanCSS,
        input: "temp",
        output: "temp",
        callback: function (err, data) {
            if (err) throw err;
            fs.writeFileSync(fileName, heading);
            fs.appendFileSync(fileName, data);
        }
    });
    fs.unlinkSync("temp");
}

//WORK IN PROGRESS
// function validateTheme(theme) {
//     let defaultTheme = {
//         background: "#fff",
//         backgroundSelect: "#fff",
//         hover: "#add8e6",
//         active: "#add8e6",
//         border: "#add8e6",
//         divider: "#d3d3d3",
//         shadow: "#33333360",
//         fontNormal: "#333",
//         fontContrast: "#fff",
//         fontInactive: "#7e7e7e",
//         activeCell: "#87cefa",
//         inactiveCell: "#e4e4e4",
//         selectedCell: "#6610f2",
//         hoverCell: "opacity(70%)",
//         todayCell: "#007bff",
//         transitionTime: "250ms"
//     }

//     let defaultKeys = Object.keys(defaultTheme);
//     let themeKeys = Object.keys(theme);

//     themeKeys.forEach((key) => {
//         if (defaultKeys.includes(key)) {
//             defaultTheme[key] = theme[key];
//         }
//         else {
//             console.warn("WARNING: Invalid key '" + key + "' for theme");
//         }
//     });
// }
