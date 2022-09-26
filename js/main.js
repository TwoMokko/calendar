"use strict";
class Game {
    constructor() {
        this.states = {
            run: 0,
            first: 1,
            second: 2
        };
        this.field_val = ['', 'x', 'o'];
        this.m = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        /* Elements */
        this.$game = $('<div/>');
        this.$start = $('<input/>', { type: 'button', value: 'Начать игру' });
        this.$fields = [
            [$('<span/>'), $('<span/>'), $('<span/>')],
            [$('<span/>'), $('<span/>'), $('<span/>')],
            [$('<span/>'), $('<span/>'), $('<span/>')]
        ];
        /* Events */
        this.$start.on('click', this.Start);
        /* Building DOM */
        for (let i = 0; i < 3; i++)
            this.$game.prepend(this.$fields[i]);
        $('body').append(this.$game, this.$start);
    }
    Start() {
    }
    ;
    FirstRun() { }
    ;
    SecondRun() { }
    ;
}
//# sourceMappingURL=main.js.map