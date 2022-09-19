class CalendarYear {
    $window_top;
    $day_input;
    $month_input;
    $year_top_top;
    $year_input;
    $calendar_input;
    $window;
    $date_top;
    $day_top;
    $month_top;
    $year_top;
    $arrow_left;
    $date_centre;
    $day;
    $month;
    $year;
    $years;
    $arrow_right;
    $window_days;
    $cell_day;
    $window_month;
    $cell_month;
    $window_year;
    $cell_year;

    constructor($window_top, $day_input, $month_input, $year_top_top, $year_input, $calendar_input, $window, $date_top, $day_top, $month_top, $year_top, $arrow_left, $date_centre, $day, $month, $year, $years, $arrow_right, $window_days, $cell_day, $window_month, $cell_month,$window_year, $cell_year) {

        /* Elements */
        this.$window_top = $('<div/>');
        // this.$day_input = $('<span/>');
        // this.$month_input = $('<span/>');
        this.$year_top_top = $('<span/>');
        this.$year_input = $('<span/>', {class: 'hide'});
        this.$calendar_input = $('<span/>');
        this.$window = $('<div/>', {class: 'hide'});
        this.$date_top = $('<span/>');
        // this.$day_top = $('<span/>');
        // this.$month_top = $('<span/>');
        this.$year_top = $('<span/>');
        this.$arrow_left = $('<span/>');
        this.$date_centre = $('<span/>');
        // this.$day = $('<span/>');
        // this.$month = $('<span/>');
        this.$year = $('<span/>');
        this.$years = $('<span/>');
        this.$arrow_right = $('<span/>');
        // this.$window_days = $('<div/>');
        // this.$cell_day = $('<span/>');
        // this.$window_month = $('<div/>');
        // this.$cell_month = $('<span/>');
        this.$window_year = $('<div/>');
        this.$cell_year = $('<span/>');

        /* Other */

        /* Events */
        $calendar_input.on('click', this.ShowCalendar);
        $cell_year.on('click', this.ChangeYear());
        $arrow_left.on('click', this.ScrollLeft());
        $arrow_right.on('click', this.ScrollRight());
        $year_input.on('click', this.EditYear());

        /* Building DOM */
        $window_top.append(
            // $day_input,
            // $month_input,
            $year_top_top,
            $year_input,
            $calendar_input
        )

        $window.append(
            $date_top.append(
                // $day_top,
                // $month_top,
                $year_top
            ),
            $arrow_left,
            $date_centre.append(
                // $day,
                // $month,
                // $year,
                $years
            ),
            $arrow_right,
            // $window_days.append(
            //     $cell_day),
            // $window_month.append(
            //     $cell_month),
            $window_year.append(
                $cell_year)
        )
    }


    OnEdit() {};

    EditYear() {

    };

    ScrollLeft() {};

    ScrollRight() {};

    // ChangeDay() {};

    // ChangeMonth() {};

    ChangeYear() {};

    ShowCalendar() {
        this.$window.removeClass('hide');
        this.$window.addClass('show');
    };

}