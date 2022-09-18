class Calendar {
    $window_mini;
    $month_mini;
    $year_mini;
    $calendar_mini;
    $window;
    $arrow_left;
    $date;
    $month;
    $year;
    $arrow_right;
    $window_days;

    constructor($window_mini, $month_mini, $year_mini, $calendar_mini, $window, $arrow_left, $date, $month, $year, $arrow_right, $window_days) {

        /* Elements */
        this.$window_mini = $('<div/>');
        this.$month_mini = $('<span/>');
        this.$year_mini = $('<span/>');
        this.$calendar_mini = $('<span/>');
        this.$window = $('<div/>', {class: 'hide'});
        this.$arrow_left = $('<span/>');
        this.$date = $('<span/>');
        this.$month = $('<span/>');
        this.$year = $('<span/>');
        this.$arrow_right = $('<span/>');
        this.$window_days = $('<div/>');

        /* Other */

        /* Events */
        $calendar_mini.on('click', this.DoEdit);

        /* Building DOM */
        $window_mini.append(
            $month_mini,
            $year_mini,
            $calendar_mini
        )

        $window.append(
            $arrow_left,
            $date.append(
                $month,
                $year
            ),
            $arrow_right,
            $window_days
        )
    }


    OnEdit(){};

    ScrollLeft(){};

    ScrollRight(){};

    ChangeMonth(){};

    ChangeYear(){};

    DoEdit(){};

}