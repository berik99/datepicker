# Datepicker 

Datepicker is a customizable web component which allows you to pick a date inside HTML forms

## Features

This datepicker is a pure-javascript and css component which has the same function as the browser's default datepicker, but gives you the option to customize settings, such as date range, date format, etc.

## Motivation

This project was born with the idea of providing a datepicker adaptable to different situations in which the default one cannot work properly.
Additionally ths component allows you to simplify graphic design of your website by providing a datepicker with the same layout on each browser, differently from what happens with default one.

## Getting Started
    
#### Installation 
Download the latest <a href="www.google.it">release</a> and reference in your project datepicker.min.js and datepicker.min.css or use one of the boilerplate inside the dist folder.


#### Build 
If you want to build your version download the source code you need NodeJS and NPM. if you don't have them, you can download from <a href="https://nodejs.org/en/">NodeJS official page</a>.
Now open a terminal, move into project root and type `npm install` to download the necessary packages.
Then type `npm run build` to transpile javascript code into IE10-compatible with <a href="https://babeljs.io/">babelJS</a>.
Afther that, the use of a minifier is recommended, but not strictly necessary.
If you are using vscode you can use <a href="https://marketplace.visualstudio.com/items?itemName=olback.es6-css-minify">this</a> minifier extension.

## Usage
To use this component you need only to put in your html file head this css link 
```html
    <link rel="stylesheet" href="datepicker.min.css">
```
and at the bottom of your body this javascript reference
```html
    <script src="datepicker.min.js"></script>
    <script>
        var datepicker = new Datepicker();
        //add here eventual additional setting
        datepicker.init();
    </script>
```
If you need use this simple basic boilerplate or choose the one you prefer inside the dist folder 
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- css reference -->
    <link rel="stylesheet" href="datepicker.min.css">
    <title>datepicker</title>
</head>

<body>
    <!-- input example -->
    <input type="text" class="datepicker" id="testDatepicker">
    <!-- js reference -->
    <script src="datepicker.min.js"></script>
    <!-- datepicker initialization -->
    <script>
        var datepicker = new Datepicker();
        //add here eventual additional setting
        datepicker.init();
    </script>
</body>

</html>
```
As you can see, is not enough to reference javascript and css files, but you also have to instanciate a `new Datepicker()` and run `init()` method on your instace. This allows you to create different instaces of datepicker with different settings.
```html

    //it will use datepicker1
    <input type="text" class="datepicker" id="testDatepicker">

    //it will use datepicker2 
    <input type="text" class="datepicker2" id="testDatepicker"> 
    ...
    <script>
        var datepicker1 = new Datepicker();
        datepicker.init();

        var datepicker2 = new Datepicker();
        datepicker2.setCssClass("datepicker2")
        datepicker.init();
    </script>
```

#### Settings available
* `setCssClass()`
As default datepicker will be applied only on html text inputs with css class "datepicker", but like shown above in the example you can choose the class which will trigger the datepicker.
    ```javascript
    var datepicker = new Datepicker();
    datepicker.setCssClass("customClass"); 
    //now only input with class="customClass" will be affected
    datepicker.init();
    ```
* `setLanguage()`
  This method allows you to set the language used inside the calendar, for the monts and the days name. it allows only a string parameter with a 2 digit language identifier (EN, IT, DE, ES, etc.). Default is English.
    ```javascript
    var datepicker = new Datepicker();
    datepicker.setLanguage("IT"); //Set italian language
    datepicker.init();
    ```
* `setMinYear() - setMaxYear() - setYearsRange()`
  These methods you chan set minimum date, maximum date or the range of years which will be available inside the datepicker. 
  The default range is 1900 - current.
    ```javascript
    var datepicker = new Datepicker();
    //you can set individually
    datepicker.setMinYear(2005) //Set 2005 as minimum year
    datepicker.setMaxYear(2018) //Set 2018 as maximum year
    //or with a range
    datepicker.setYearsRange(2000, 2010) //Set the renge between 2000 and 2010
    datepicker.init();
    ```
* `setDefaultDate(month, year)`
  This method allows you to set a month of the sepcified year to be displayed at datepicker opening. By default it will show current month of current year.
    ```javascript
    var datepicker = new Datepicker();
    datepicker.setDefaultDate(11, 2009) //Set november 2009 as default date 
    datepicker.init();
    ```
## License

Copyright 2021 Erik Barale, Licensed under <a href="LICENSE.txt">MIT License</a>