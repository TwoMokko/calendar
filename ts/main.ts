class CalendarYear {
    /* Variables */
    year;
    min_year;
    max_year;

    /* Elements */
    $obj;

    $input;
    $input_year;
    $input_calendar;

    // $window;
    // $date_top;
    // $year_top;
    // $arrow_left;
    // $date_centre;
    // $year;
    // $years;
    // $arrow_right;
    // $window_year;
    // $cell_year;

    // $day_top;
    // $month_top;
    // $day;
    // $month;
    // $window_days;
    // $cell_day;
    // $window_month;
    // $cell_month;
    // $day_input;
    // $month_input;

    constructor(selector, params) {
        this.min_year = (params?.min !== undefined) ? params.min : null;
        this.max_year = (params?.max !== undefined) ? params.max : null;
        this.$obj = $(selector);
        if (this.$obj.length !== 1) { console.log('error'); return; }
        let _year = this.$obj.val();
        this.year = _year;

        /* Create elements */
        this.$input = $('<div/>');
        this.$input_year = $('<input/>').val(this.year);
        this.$input_calendar = $('<span/>');

        this.$obj.after(
            this.$input.append(
                this.$input_year,
                this.$input_calendar
            )
        );
        this.$input.prepend(
            this.$obj.hide()
        );

        /* Events */
        this.$input_year.on('keydown', this.YearKeydown.bind(this));
        this.$input_year.on('input', this.YearInput.bind(this));
    }

    YearKeydown(e) {
        let key = e.originalEvent.key;
        if (!key.match(/[0-9]|Backspace|Tab/)) return false;
    }

    YearInput() {
        let _year = Number(this.$input_year.val());
        if (_year < this.min_year || _year > this.max_year) { console.log('error'); return; }

        this.year = _year;
        this.$input_year.val(this.year);
        this.SetValue(this.year);
    }

    SetValue(value) {
        this.$obj.val(value);
    }
        // this.$window_top = $('<div/>');
        // // this.$day_input = $('<span/>');
        // // this.$month_input = $('<span/>');
        // this.$year_top_top = $('<span/>');
        // this.$year_input = $('<span/>', {class: 'hide'});
        // this.$calendar_input = $('<span/>');
        // this.$window = $('<div/>', {class: 'hide'});
        // this.$date_top = $('<span/>');
        // // this.$day_top = $('<span/>');
        // // this.$month_top = $('<span/>');
        // this.$year_top = $('<span/>');
        // this.$arrow_left = $('<span/>');
        // this.$date_centre = $('<span/>');
        // // this.$day = $('<span/>');
        // // this.$month = $('<span/>');
        // this.$year = $('<span/>');
        // this.$years = $('<span/>');
        // this.$arrow_right = $('<span/>');
        // // this.$window_days = $('<div/>');
        // // this.$cell_day = $('<span/>');
        // // this.$window_month = $('<div/>');
        // // this.$cell_month = $('<span/>');
        // this.$window_year = $('<div/>');
        // this.$cell_year = $('<span/>');

    //     /* Other */
    //
    //     /* Events */
    //     $calendar_input.on('click', this.ShowCalendar);
    //     $cell_year.on('click', this.ChangeYear());
    //     $arrow_left.on('click', this.ScrollLeft());
    //     $arrow_right.on('click', this.ScrollRight());
    //     $year_input.on('click', this.EditYear());
    //
    //     /* Building DOM */
    //     $window_top.append(
    //         // $day_input,
    //         // $month_input,
    //         $year_top_top,
    //         $year_input,
    //         $calendar_input
    //     )
    //
    //     $window.append(
    //         $date_top.append(
    //             // $day_top,
    //             // $month_top,
    //             $year_top
    //         ),
    //         $arrow_left,
    //         $date_centre.append(
    //             // $day,
    //             // $month,
    //             // $year,
    //             $years
    //         ),
    //         $arrow_right,
    //         // $window_days.append(
    //         //     $cell_day),
    //         // $window_month.append(
    //         //     $cell_month),
    //         $window_year.append(
    //             $cell_year)
    //     )
    // }
    //
    //
    // OnEdit() {};
    //
    // EditYear() {
    //
    // };
    //
    // ScrollLeft() {};
    //
    // ScrollRight() {};
    //
    // // ChangeDay() {};
    //
    // // ChangeMonth() {};
    //
    // ChangeYear() {};
    //
    // ShowCalendar() {
    //     this.$window.removeClass('hide');
    //     this.$window.addClass('show');
    // };

}