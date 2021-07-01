# Datepicker

Datepicker is a customizable web component which allows you to pick a date inside HTML forms

## Features

This datepicker is a pure-javascript and css component which has the same function as the browser's default datepicker, but gives you the option to customize settings, such as date range, date format, etc.

## Motivation

This project was born with the idea of providing a datepicker adaptable to different situations in which the default one cannot work properly.
Additionally ths component allows you to simplify graphic design of your website by providing a datepicker with the same layout on each browser, differently from what happens with default one.

## Getting Started

#### Installation

Download the latest <a href="https://github.com/berik99/datepicker/releases/">release</a>, inside the dist folder there are javascript (datepicker.min.js) and css themes (datepicker-_themeName_.min.css) files to reference in your project.
There are also four boilerplate for valilla html, bootstrap 3, b-4 and b-5;

#### Build

To build from source code you need NodeJS and NPM. if you don't have them, you can download them from <a href="https://nodejs.org/en/">NodeJS official page</a>.
Now open a terminal, move into project root and type `npm install` to download the necessary packages.
To build necessary files, type `npm run build`. This command will transpile javascript code with <a href="https://babeljs.io/">babelJS</a>, build css theme files and minify all.
To test datepicker in the browser run `npm test`.

## Usage

To use this component you need to insert the reference to the desired CSS theme in the head of HTML

```html
<link rel="stylesheet" href="datepicker-light.min.css" />
```

and the javascript reference at the end of body.

```html
<script src="datepicker.min.js"></script>
<script>
  var datepicker = new Datepicker();
  //add here your additional setting
  datepicker.init();
</script>
```

If you want to use this datepicker also on Internet Explorer, you need to reference this polyfill just before datepicker's js. Thanks to: <a href="https://polyfill.io/v3/">Polyfill.io</a>

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=WeakSet%2CCustomEvent%2CDOMTokenList.prototype.replace"></script>
```

You can use this boilerplate or choose the one you prefer inside the dist folder

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Datepicker css theme -->
    <link rel="stylesheet" href="../datepicker-light.min.css" />
    <title>Standard - Datepicker</title>
</head>

<body>
    <form>
        <label for="customDatepicker">Custom datepicker</label>
        <input type="text" class="datepicker" id="customDatepicker" />
        <label for="defaultDatepicker">Browser default datepicker</label>
        <input type="date" id="defaultDatepicker" />
    </form>
    <!-- Datepicker js -->
    <script src="../datepicker.min.js"></script>
    <!-- Datepicker initialization -->
    <script>
        var datepicker = new Datepicker();
        //add here your additional setting
        datepicker.init();
    </script>
</body>

</html>
</body>

</html>
```

To make datepicker working, is not enough to reference javascript and css files, but is also required to instanciate a `new Datepicker()` and run `init()` method on the instance. This allows you to create different instances of datepicker with different settings.
By default datepicker will be applied only on html text inputs with css class "datepicker"

```html
//it will use datepicker1
<input type="text" class="datepicker" id="testDatepicker" />

//it will use datepicker2
<input type="text" class="datepicker2" id="testDatepicker" />
...
<script>
  var datepicker1 = new Datepicker();
  datepicker.init();

  var datepicker2 = new Datepicker();
  datepicker2.setCssClass("datepicker2");
  datepicker.init();
</script>
```

#### Settings available

- `setCssClass()`
  This method allows you to set another CSS class to which dateppicker will be applied.
  ```javascript
  var datepicker = new Datepicker();
  datepicker.setCssClass("customClass"); //now only input with class="customClass" will be affected
  datepicker.init();
  ```
- `setLanguage()`
  This method allows you to set the language used inside the calendar, for the monts and the days name. it allows only a string parameter with a 2 digit language identifier (EN, IT, DE, ES, etc.). Default is English.
  ```javascript
  var datepicker = new Datepicker();
  datepicker.setLanguage("IT"); //Set italian language
  datepicker.init();
  ```
- `setMinYear() - setMaxYear() - setYearsRange()`
  These methods you chan set minimum date, maximum date or the range of years which will be available inside the datepicker.
  The default range is 1900 - current.
  ```javascript
  var datepicker = new Datepicker();
  //you can set individually
  datepicker.setMinYear(2005); //Set 2005 as minimum year
  datepicker.setMaxYear(2018); //Set 2018 as maximum year
  //or with a range
  datepicker.setYearsRange(2000, 2010); //Set the renge between 2000 and 2010
  datepicker.init();
  ```
- `setDefaultDate(month, year)`
  This method allows you to set a month of the sepcified year to be displayed at datepicker opening. By default it will show current month of current year.
  ```javascript
  var datepicker = new Datepicker();
  datepicker.setDefaultDate(11, 2009); //Set november 2009 By default date
  datepicker.init();
  ```
- `setDefaultDate(month, year)`
  This method set the format used to show the date inside the form.
  Use `dd` as day placeholder, `mm` for months and `yyyy` for years.
  Set the one-char divider as you prefer.
  By default date format is `dd/mm/yyyy`.
  ```javascript
  var datepicker = new Datepicker();
  datepicker.setDateFormat("yyyy-mm-dd"); //E.G. 1st january 1970 will displayed as 1970-01-01
  datepicker.init();
  ```

## Supported browser

#### _tested support_

- Chromium >= 62
- Firefox >= 52.9
- Safari >= 10
- Edge (chromium)

#### _partial support: work in progress_

- Chromium < 62
  - datepicker disappear a few moments after its appearance
- Internet explorer >= 10
  - datepicker will not close when click outside; only close button will work

#### _not tested_

- Edge (old version)
- Opera
- Safari < 10

## Exteral resource

<a href="https://babeljs.io/">BabelJS</a>
<a href="https://node-minify.2clics.net/">node-minify</a>
<a href="https://polyfill.io/v3/">Polyfill.io</a>
<a href="https://icons.getbootstrap.com/">bootstrap-icons</a>

## License

Copyright 2021 Erik Barale, Licensed under <a href="/dist/LICENSE">MIT License</a>
