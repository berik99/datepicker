//#region DATEPICKER
/**
 * Create a new Datepicker element
 * @class
 * @classdesc Represents a datepicker element 
 */
class Datepicker {
    constructor() {
        this.classToApply = "datepicker";
        this.language = "EN";
        this._months = [];
        this._days = [];
        this.yearSel;
        this.monthSel;
        this.refDateTime
        this.refMonth;
        this.refYear;
        this.selectedDay;
        this.lastSelected;
        this.inputReference;
        this.minYear = 1900;
        this.maxYear = new Date().getFullYear();
        this.format = "dd/mm/yyyy";
        this.datepicker;

        //Settings booleans
        this.useCustomSelectedValue = false;
        this.initialized = false;
        this.setLanguage(this.language);
    }
    //#region PRIVATE INTERNAL METHODS

    /**Build all datepicker's internal components
     * @private You should't use this method outside the class
     */
    #build() {
        let thisObj = this;
        this.datepicker = null;
        //Main container
        this.datepicker = document.createElement("div");
        this.datepicker.id = "datepicker";

        //Delete and close
        let inputControl = document.createElement("div");
        inputControl.classList.add("input-control");
        let resetBtn = document.createElement("div");
        resetBtn.classList.add("button");
        resetBtn.classList.add("reset");
        resetBtn.innerHTML = `<svg class="bi bi-trash" fill=currentColor height=16 viewBox="0 0 16 16" width=16 xmlns=http://www.w3.org/2000/svg><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill-rule=evenodd /></svg>`;
        inputControl.appendChild(resetBtn);

        let closeBtn = document.createElement("div");
        closeBtn.onclick = function () {
            thisObj.#hide();
        }
        closeBtn.classList.add("button");
        closeBtn.classList.add("_close");
        closeBtn.innerHTML = `<svg class="bi bi-x-lg" fill=currentColor height=14 viewBox="0 0 16 16" width=14 xmlns=http://www.w3.org/2000/svg><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" /></svg>`;
        inputControl.appendChild(closeBtn);
        this.datepicker.appendChild(inputControl);

        //next/prev and month year select
        let calendarControl = document.createElement("div");
        calendarControl.classList.add("calendar-control");
        let prevBtn = document.createElement("div");
        prevBtn.classList.add("button")
        prevBtn.classList.add("control");
        prevBtn.classList.add("prev");
        prevBtn.innerHTML = `<svg class="bi bi-arrow-left-short" fill=currentColor height=26 viewBox="0 0 16 16" width=26 xmlns=http://www.w3.org/2000/svg><path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" fill-rule=evenodd /></svg>`;
        calendarControl.appendChild(prevBtn);

        this.monthSel = document.createElement("select");
        for (let i = 0; i <= 11; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.label = this._months[i];
            this.monthSel.appendChild(opt);
        }
        this.monthSel.tabIndex = -1;
        calendarControl.appendChild(this.monthSel);
        let msel = new Select(this.monthSel, calendarControl, "month")

        this.yearSel = document.createElement("select");
        for (let i = this.maxYear; i >= this.minYear; i--) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.label = i;
            this.yearSel.appendChild(opt);
        }
        this.yearSel.tabIndex = -1;
        calendarControl.appendChild(this.yearSel);
        let ysel = new Select(this.yearSel, calendarControl, "year")

        let nextBtn = document.createElement("div");
        nextBtn.classList.add("button");
        nextBtn.classList.add("control");
        nextBtn.classList.add("next");
        nextBtn.innerHTML = `<svg class="bi bi-arrow-right-short" fill=currentColor height=26 viewBox="0 0 16 16" width=26 xmlns=http://www.w3.org/2000/svg><path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" fill-rule=evenodd /></svg>`;
        calendarControl.appendChild(nextBtn);
        this.datepicker.appendChild(calendarControl);

        //days grid
        let calendar = document.createElement("div");
        calendar.classList.add("calendar");

        let calRowHd = document.createElement("div");
        calRowHd.classList.add("cal-row");
        calRowHd.classList.add("header");
        for (let i = 0; i < 7; i++) {
            let hCell = document.createElement("div");
            hCell.classList.add("button");
            hCell.classList.add("cell");
            hCell.classList.add("hcell");
            hCell.innerHTML = this._days[i];
            calRowHd.appendChild(hCell);
        }
        calendar.appendChild(calRowHd);

        calendar.appendChild(document.createElement("hr"));

        let calRowRw = document.createElement("div");
        calRowRw.classList.add("cal-row");
        for (let i = 0; i < 6; i++) {
            let calRowRw = document.createElement("div");
            calRowRw.classList.add("cal-row");
            for (let j = 0; j < 7; j++) {
                let rCell = document.createElement("div");
                rCell.classList.add("button");
                rCell.classList.add("cell");
                rCell.classList.add("rcell");
                calRowRw.appendChild(rCell);
            }
            calendar.appendChild(calRowRw);
        }
        this.datepicker.appendChild(calendar);

        //#region BUTTON ACTIONS
        resetBtn.onclick = function () {
            thisObj.yearSel.value = thisObj.refYear;
            thisObj.monthSel.value = thisObj.refMonth;
            thisObj.monthSel.dispatchEvent(new Event("change"));
            thisObj.yearSel.dispatchEvent(new Event("change"));
            thisObj.selectedDay = null;
            if (thisObj.lastSelected != null) thisObj.lastSelected.classList.remove("selected");
            thisObj.inputReference.value = null;
            thisObj.lastSelected = null;
            thisObj.#updateCalendar();
        }

        nextBtn.onclick = function () {
            if (!(thisObj.yearSel.value >= thisObj.maxYear && thisObj.monthSel.value === "11")) {
                if (thisObj.monthSel.value === "11") {
                    thisObj.monthSel.value = 0;
                    thisObj.yearSel.value++;
                    thisObj.monthSel.dispatchEvent(new Event("change"));
                    thisObj.yearSel.dispatchEvent(new Event("change"));
                } else
                    thisObj.monthSel.value++;
                thisObj.monthSel.dispatchEvent(new Event("change"));
            }
            thisObj.#updateCalendar();
        }

        prevBtn.onclick = function () {
            if (!(thisObj.yearSel.value <= thisObj.minYear && thisObj.monthSel.value === "0")) {
                if (thisObj.monthSel.value === "0") {
                    thisObj.monthSel.value = 11;
                    thisObj.yearSel.value--;
                    thisObj.monthSel.dispatchEvent(new Event("change"));
                    thisObj.yearSel.dispatchEvent(new Event("change"));
                } else
                    thisObj.monthSel.value--;
                thisObj.monthSel.dispatchEvent(new Event("change"));
            }
            thisObj.#updateCalendar();
        }

        this.monthSel.onchange = function () { thisObj.#updateCalendar(); }
        this.yearSel.onchange = function () { thisObj.#updateCalendar(); }
        //#endregion
    }

    /**Shows the datepicker above the specified input
     * @param {Element} input - Represent a element of the page where you want to show the datepicker
     * @private You should't use this method outside the class
     */
    #show(input) {
        let thisObj = this;
        if (!this.useCustomSelectedValue) {
            this.refMonth = this.maxYear == new Date().getFullYear() ? new Date().getMonth() : 0;
            this.refYear = this.maxYear;
        }
        this.lastSelected = null;
        this.inputReference = input;
        window.onresize = function () { thisObj.#setPosition(); }
        window.onclick = function (ev) { thisObj.#autoCloseDatapicker(ev); }
        if (this.inputReference.value != "") {

            this.selectedDay = this.#parseDateFormat(input.value);
            this.yearSel.value = this.selectedDay.getFullYear();
            this.monthSel.value = this.selectedDay.getMonth();
            this.monthSel.dispatchEvent(new Event("change"));
            this.yearSel.dispatchEvent(new Event("change"));
        } else {
            this.selectedDay = null;
            this.yearSel.value = this.refYear;
            this.monthSel.value = this.refMonth;
            this.monthSel.dispatchEvent(new Event("change"));
            this.yearSel.dispatchEvent(new Event("change"));
        }
        this.#updateCalendar();

        this.#setPosition();
        this.datepicker.style.display = "block";
    }

    /**Hide the datepicker from the page
     * @private You should't use this method outside the class
     */
    #hide() {
        this.datepicker.style.display = "none";
    }

    /**Detect input position and place datepicker just above it
     * @private You should't use this method outside the class
     */
    #setPosition() {
        let measures = this.inputReference.getBoundingClientRect();
        this.datepicker.style.top = `${measures.top + this.inputReference.offsetHeight + 10}px`;
        this.datepicker.style.left = `${measures.left + this.datepicker.style.width}px`;
    }

    /**Updates the datepicker's internal calendar
     * @private You should't use this method outside the class
     */
    #updateCalendar() {
        const dayPerMont = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let cells = this.datepicker.getElementsByClassName("rcell");
        let firstOfMonth = new Date(this.yearSel.value, this.monthSel.value, 1).getDay();

        //Cleaning old cells
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = "";
            cells[i].classList.remove("today");
            cells[i].classList.remove("selected")
            cells[i].classList.add("unavailable")
            cells[i].onclick = null;
            cells[i].value = "";
        }

        //fill calendar days
        let j = firstOfMonth == 0 ? 6 : firstOfMonth - 1;

        //month before days
        let monthBefore = this.monthSel.value != 0 ? dayPerMont[this.monthSel.value - 1] : 11;
        for (let i = firstOfMonth != 0 ? firstOfMonth - 2 : 5; i >= 0; i--) {
            cells[i].innerHTML = monthBefore;
            monthBefore--;
        }

        //days of selected month
        let iteraions = isLeap(this.yearSel.value) ? dayPerMont[this.monthSel.value] + 1 : dayPerMont[this.monthSel.value];
        for (let i = 1; i <= iteraions; i++) {
            cells[j].classList.remove("unavailable")
            let thisObj = this;
            cells[j].onclick = function () {
                if (this != thisObj.lastSelected) {
                    if (thisObj.lastSelected != null)
                        thisObj.lastSelected.classList.remove("selected");
                    this.classList.add("selected");
                    thisObj.selectedDay = thisObj.#parseDateFormat(this.value);
                    thisObj.inputReference.value = this.value;
                    thisObj.lastSelected = this;
                    thisObj.#hide();
                }
            }
            cells[j].innerHTML = i;
            let month = parseInt(this.monthSel.value) + 1;
            let day = i;

            cells[j].value = this.#applyFormat(day, month, this.yearSel.value);
            j++;
        }

        //Set today
        let today = new Date();
        if (this.monthSel.value == today.getMonth() && this.yearSel.value == today.getFullYear()) {
            cells[today.getDate() + firstOfMonth - 2].classList.add("today");
        }
        if (this.selectedDay != null)
            if (this.monthSel.value == this.selectedDay.getMonth() && this.yearSel.value == this.selectedDay.getFullYear()) {
                cells[this.selectedDay.getDate() + firstOfMonth - 2].classList.add("selected");
            }

        //month after days
        let i = 1;
        for (j; j < cells.length; j++) {
            cells[j].innerHTML = i;
            i++;
        }
    }

    /**close the datepicker only if click is outside the control or the input
     * @param {Event} ev - The event which trigger datepicker closing
     * @private You should't use this method outside the class
     */
    #autoCloseDatapicker(ev) {
        //TODO: Implement dynamic closing for IE10 - 11
        if (!isExplorer()) {
            let dpX1 = this.datepicker.getBoundingClientRect().x;
            let dpX2 = dpX1 + this.datepicker.getBoundingClientRect().width;
            let dpY1 = this.datepicker.getBoundingClientRect().y;
            let dpY2 = dpY1 + this.datepicker.getBoundingClientRect().height;

            let ibX1 = this.inputReference.getBoundingClientRect().x;
            let ibX2 = ibX1 + this.inputReference.getBoundingClientRect().width;
            let ibY1 = this.inputReference.getBoundingClientRect().y;
            let ibY2 = ibY1 + this.inputReference.getBoundingClientRect().height;

            if (!isInside(ev.clientX, ev.clientY, dpX1, dpX2, dpY1, dpY2) && !isInside(ev.clientX, ev.clientY, ibX1, ibX2, ibY1, ibY2)) {
                if (ev.target != this.yearSel && ev.target != this.monthSel) {
                    this.#hide();
                }
            }
        }
    }

    /**apply the format on the specified date
     * @param {number} day
     * @param {number} month
     * @param {number} year
     * @return {string} date formatted in preset format
     * @private You should't use this method outside the class
     */
    #applyFormat(day, month, year) {
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;
        return this.format.replace("dd", day).replace("mm", month).replace("yyyy", year);
    }


    /**Parse a formatted date to a js Date
     * @private You should't use this method outside the class
     */
    #parseDateFormat(formattedDate) {
        let separator = this.format.replace("dd", "").replace("mm", "").replace("yyyy", "")[0];
        let positions = this.format.split(separator);
        let dateValues = formattedDate.split(separator);
        let parsedDate = new Date(parseInt(dateValues[positions.indexOf("yyyy")]), parseInt(dateValues[positions.indexOf("mm")]) - 1, parseInt(dateValues[positions.indexOf("dd")]));
        return parsedDate;
    }
    //#endregion

    //#region PUBLIC METHODS
    /**Insert datepicker inside the html and map all availabe inputs making them readonly and setting pointer cursor
     * @public
     */
    init() {
        let thisObj = this;
        document.body.appendChild(this.datepicker);
        let inputs = document.getElementsByClassName(this.classToApply);
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].nodeName == "INPUT" && inputs[i].getAttribute("type") == "text") {
                inputs[i].readOnly = true;
                inputs[i].style.cursor = "pointer";
                inputs[i].onfocus = function () { thisObj.#show(this) }
            }
        }
        this.initialized = true;
    }

    /**Set the datepicker language; if is not present sets english
     * @param {string} language - Two char language identifier (EN, DE, ES, IT, etc.)
     * @public
     */
    setLanguage(language) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (language.length != 2) {
            throw "Only 2 characters allowed to set language";
        }
        this.language = this.language;
        switch (language) {
            case "IT":
                this._days = [
                    "LUN",
                    "MAR",
                    "MER",
                    "GIO",
                    "VEN",
                    "SAB",
                    "DOM"
                ];

                this._months = [
                    "Gennaio",
                    "Febbraio",
                    "Marzo",
                    "Aprile",
                    "Maggio",
                    "Giugno",
                    "Luglio",
                    "Agosto",
                    "Settembre",
                    "Ottobre",
                    "Novembre",
                    "Dicembre"
                ]
                break;
            case "EN":
                this._days = [
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                    "SUN"
                ];

                this._months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
                break;
            // TODO: Implements more language
            default:
                console.error("This language may not exixst or is not yet implemented. Setted as default to english");
                break;
        }
        this.#build();
    }

    /**Sets minimum year available inside the datepicker. Default is 1900
     * @param {number} minYear - 4 digit year number
     * @public
     */
    setMinYear(minYear) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (this.useCustomSelectedValue)
            throw "Can't set minYear after custom selected values";
        if (typeof (minYear) != "number")
            throw "Invalid minimum year";
        if (minYear > this.maxYear)
            throw `Can't set minimum year uppter than maximum year(${this.maxYear})`;
        this.minYear = minYear;
        this.#build();
    }

    /**Sets maximum year available inside the datepicker. Default is current Year
     * @param {number} maxYear - 4 digit year number
     * @public
     */
    setMaxYear(maxYear) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (this.useCustomSelectedValue)
            throw "Can't set maxYear after custom selected values";
        if (typeof (maxYear) != "number")
            throw "Invalid maximum year";
        if (maxYear < this.minYear)
            throw `Can't set maximum year lower than minimum year(${this.minYear})`;
        this.maxYear = maxYear;
        this.#build();
    }

    /**Sets a date range. Default is 1900-current
     * @param {number} minYear - minimum year, 4 digit year number
     * @param {number} maxYear - maximum year, 4 digit year number
     * @public
     */
    setYearsRange(minYear, maxYear) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (this.useCustomSelectedValue)
            throw "Can't set range after custom selected values";
        if (typeof (maxYear) != "number" || typeof (minYear) != "number")
            throw "Invalid date range";
        if (maxYear < minYear)
            throw "`Can't set maximum year lower than minimum year";
        this.minYear = minYear;
        this.maxYear = maxYear;
        this.#build();
    }

    /**Sets the month of the specified year which you want to show at datepicker open. Default is current date
     * @param {number} month - month number (1-12)
     * @param {number} year - 4 digit year number
     * @public
     */
    setDefaultDate(month, year) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (typeof (year) != "number" && typeof (month) != "number")
            throw "Invalid type. only numbers available for years and month";
        if (year < this.minYear || year > this.maxYear)
            throw `Years out of range. Current range is ${this.minYear} - ${this.maxYear}`;
        if (month < 1 || month > 12)
            throw "Months out of range. Choose a month between 1 and 12";
        this.useCustomSelectedValue = true;
        this.refYear = year;
        this.refMonth = month - 1;
        this.#build();
    }

    /**Sets the cssClass to which will be applied this datepicker instance
     * @param {string} cssClass - The css class  
     * @public
     */
    setCssClass(cssClass) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (typeof (cssClass) != "string")
            throw "ERROR: cssClass must be a string";
        this.classToApply = cssClass;
    }

    /**Sets the date format to display inside the form
     * @param {string} cssClass - The css class  
     * @public
     */
    setDateFormat(format) {
        if (this.initialized)
            throw "Can't apply settings after initialization";
        if (typeof (format) != "string")
            throw "ERROR: date format must be a string";
        if (format.length != 10 || !format.includes("dd") || !format.includes("mm") || !format.includes("yyyy"))
            throw "ERROR: Invalid date format"
        this.format = format;
    }

    //#endregion
}
//#endregion

//#region SELECT
class Select {
    constructor(referenceSelect, parent, className) {
        let thisObj = this;
        if (referenceSelect.nodeName != "SELECT")
            throw "HTMLElementError: only select elements are allowed";
        this.referenceSelect = referenceSelect;
        this.referenceSelect.addEventListener("change", function () {
            thisObj.#updateFromReference();
        });
        // this.referenceSelect.onchange = function () {
        //     thisObj.updateFromReference();
        // }
        this.className = className;
        this.optionsNames = [];
        this.optionsValues = [];
        for (let i = 0; i < referenceSelect.options.length; i++) {
            this.optionsNames.push(referenceSelect.options[i].label);
            this.optionsValues.push(referenceSelect.options[i].value);
        }
        this.select;
        this.selectValue;
        this.selectArrow;
        this.#build();
        this.referenceSelect.style.display = "none";
        this.#updateFromReference();
        parent.appendChild(this.select);
    }

    #build() {
        let thisObj = this;
        this.select = document.createElement("div");
        this.select.classList.add("custom-dp-select");
        this.select.classList.add("closesel");
        this.select.classList.add(this.className);

        let selectValueContainer = document.createElement("div");
        selectValueContainer.classList.add("select-value-container")
        selectValueContainer.style.display = "flex";

        this.selectValue = document.createElement("div");
        this.selectValue.classList.add("select-value");
        selectValueContainer.onclick = function (e) {
            e.stopImmediatePropagation();
            thisObj.#openSelect();
        }
        document.onclick = function (e) {
            thisObj.#closeAllSelect(e);
        }

        this.selectArrow = document.createElement("div");
        this.selectArrow.classList.add("select-arrow");
        this.selectArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>`;

        selectValueContainer.appendChild(this.selectValue);
        selectValueContainer.appendChild(this.selectArrow);

        this.select.appendChild(selectValueContainer);

        let selectOptions = document.createElement("div");
        selectOptions.classList.add("select-options");

        for (let i = 0; i < this.optionsValues.length; i++) {
            let selectOption = document.createElement("div");
            selectOption.classList.add("select-option");
            selectOption.innerHTML = this.optionsNames[i];
            selectOption.value = this.optionsValues[i];
            selectOption.onclick = function () {
                thisObj.#updateFromOption(this);
            }
            selectOptions.appendChild(selectOption);
        }
        this.select.appendChild(selectOptions);
    }

    #updateReferenceSelect() {
        this.referenceSelect.value = this.selectValue.value;
        this.referenceSelect.dispatchEvent(new Event("change"));
    }

    #updateFromOption(option) {
        this.selectValue.innerHTML = option.innerHTML;
        this.selectValue.value = option.value;
        this.select.getElementsByClassName("select-selected")[0].classList.remove("select-selected");
        option.classList.add("select-selected")
        this.#updateReferenceSelect();
    }

    #updateFromReference() {
        this.selectValue.innerHTML = this.referenceSelect.options[this.referenceSelect.selectedIndex].label;
        this.selectValue.value = this.referenceSelect.value;
        let selected = this.select.getElementsByClassName("select-selected")[0];
        if (typeof (selected) != "undefined") {
            selected.classList.remove("select-selected");
        }
        this.select.getElementsByClassName("select-option")[this.referenceSelect.selectedIndex].classList.add("select-selected")
    }

    #openSelect() {
        this.#closeAllSelect(this.select);
        if (this.select.classList.contains("closesel")) {
            this.select.classList.replace("closesel", "open");
            this.selectArrow.style.transform = "rotate(180deg)";
        } else {
            this.select.classList.replace("open", "closesel");
            this.selectArrow.style.transform = "rotate(0)";
        }
    }

    #closeAllSelect(select) {
        let selects = document.getElementsByClassName("open");
        for (let i = 0; i < selects.length; i++) {
            if (selects[i] != select) {
                selects[i].getElementsByClassName("select-arrow")[0].style.transform = "rotate(0)";
                selects[i].classList.replace("open", "closesel");
            }
        }
    }
}

//#endregion



//#region COMMON FUNCTIONS
/**Detect if specified year is leap or not
 * @param  {number} year
 * @returns {boolean} true if year is leap, otherwise false
 */
function isLeap(year) {
    return new Date(year, 1, 29).getDate() === 29;
}

/**Detect if mouse is inside specified coordinates
 * @param  {number} mouseX - X coordinate o mouse
 * @param  {number} mouseY - Y coordinate o mouse
 * @param  {number} x1 - first X point of container
 * @param  {number} x2 - second X point of container
 * @param  {number} y1 - first Y point of container
 * @param  {number} y2 - second Y point of container
 * @returns {boolean} true if mouse pointer is inside specified coordinates
 */
function isInside(mouseX, mouseY, x1, x2, y1, y2) {
    if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2)
        return true;
    return false;
}
/**Detect if the website is running on IE
 * @returns {boolean} true if is running on IE, otherwise false
 */
function isExplorer() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ');
    let trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
        return true;
    }
    return false;
}
//#endregion