"use strict";
class Game {
    constructor() {
        this.player = {
            first: 1,
            second: 2
        };
        this.field_val = {
            empty: 0,
            x: 1,
            o: 2
        };
        this.m = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.state = this.player['first'];
        /* Elements */
        this.$game = $('<div/>');
        this.$start = $('<input/>', { type: 'button', value: 'Начать игру' });
        this.$fields = [];
        for (let i = 0; i < 3; i++) {
            this.$fields[i] = [];
            for (let j = 0; j < 3; j++) {
                this.$fields[i][j] = $('<span/>', { 'data-state': this.field_val['empty'], 'data-i': i, 'data-j': j });
            }
        }
        /* Events */
        this.$start.on('click', this.Start.bind(this));
        this.$game.on('click', 'span', this.Turn.bind(this));
        /* Building DOM */
        for (let i = 0; i < 3; i++)
            this.$game.prepend(this.$fields[i]);
        $('body').append(this.$game, this.$start);
    }
    Start() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.m[i][j] = 0;
                this.Redraw(i, j);
            }
        }
        this.state = this.player['first'];
    }
    Redraw(i, j) {
        // let attr = 'empty';
        // if (state === this.field_val['x']) attr = 'x';
        // if (state === this.field_val['o']) attr = 'o';
        this.$fields[i][j].attr('data-state', this.m[i][j]);
    }
    Turn(e) {
        console.log(this.state);
        let element = $(e.currentTarget);
        let i = element.attr('data-i');
        let j = element.attr('data-j');
        if (this.m[i][j])
            return;
        switch (this.state) {
            case this.player['first']:
                this.m[i][j] = this.field_val['x'];
                this.state = this.player['second'];
                break;
            case this.player['second']:
                this.m[i][j] = this.field_val['o'];
                this.state = this.player['first'];
                break;
        }
        this.Redraw(i, j);
    }
}
//# sourceMappingURL=main.js.map