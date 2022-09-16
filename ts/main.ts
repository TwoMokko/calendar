class Calendar {
    month;
    year;
    day;

    constructor(month, year, day) {
        this.month = month;
        this.year = year;
        this.day = day;
    }

    Display() {

        /* Elements */
        let $window_mini = $('<div/>');
        let $month_mini = $('<span/>');
        let $year_mini = $('<span/>');
        let $calendar_mini = $('<span/>');
        let $window = $('<div/>');
        let $arrow_left = $('<span/>');
        let $date = $('<span/>');
        let $month = $('<span/>');
        let $year = $('<span/>');
        let $arrow_right = $('<span/>');
        let $window_days = $('<div/>');

        /* Other */
        $month.text(this.month);
        $year.text(this.year);

        /* Events */



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