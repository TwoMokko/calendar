"use strict";
class Game {
    constructor() {
        this.player = {
            first: 1,
            second: 2,
            end: 0
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
        this.$game = $('<div/>', { class: 'game' });
        this.$space = $('<div/>');
        this.$start = $('<input/>', { type: 'button', value: '' });
        this.$fields = [];
        for (let i = 0; i < 3; i++) {
            this.$fields[i] = [];
            for (let j = 0; j < 3; j++) {
                this.$fields[i][j] = $('<span/>', { 'data-state': this.field_val['empty'], 'data-i': i, 'data-j': j });
            }
        }
        this.$win_text = $('<span/>').css('display', 'none');
        /* Events */
        this.$start.on('click', this.Start.bind(this));
        this.$space.on('click', 'span', this.Turn.bind(this));
        /* Building DOM */
        for (let i = 0; i < 3; i++)
            this.$space.prepend(this.$fields[i]);
        $('body').append(this.$game.append(this.$space, this.$win_text, this.$start));
    }
    Start() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.m[i][j] = 0;
                this.Redraw(i, j);
            }
        }
        this.state = this.player['first'];
        this.$win_text.css('display', 'none');
    }
    Redraw(i, j) {
        // let attr = 'empty';
        // if (state === this.field_val['x']) attr = 'x';
        // if (state === this.field_val['o']) attr = 'o';
        this.$fields[i][j].attr('data-state', this.m[i][j]);
    }
    Turn(e) {
        let element = $(e.currentTarget);
        let i = parseInt(element.attr('data-i'));
        let j = parseInt(element.attr('data-j'));
        if (this.m[i][j])
            return;
        if (this.state === this.player['end'])
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
        let _end = '';
        if ((this.m[i][0] === 1 && this.m[i][1] === 1 && this.m[i][2] === 1) || (this.m[0][j] === 1 && this.m[1][j] === 1 && this.m[2][j] === 1) || (this.m[0][0] === 1 && this.m[1][1] === 1 && this.m[2][2] === 1) || (this.m[0][2] === 1 && this.m[1][1] === 1 && this.m[2][0] === 1))
            _end = 'first';
        else if ((this.m[i][0] === 2 && this.m[i][1] === 2 && this.m[i][2] === 2) || (this.m[0][j] === 2 && this.m[1][j] === 2 && this.m[2][j] === 2) || (this.m[0][0] === 2 && this.m[1][1] === 2 && this.m[2][2] === 2) || (this.m[0][2] === 2 && this.m[1][1] === 2 && this.m[2][0] === 2))
            _end = 'second';
        else if (CheckDraw(this.m))
            _end = 'draw';
        if (_end) {
            this.$win_text.addClass(_end);
            this.$win_text.css('display', 'block');
            this.state = this.player['end'];
        }
        function CheckDraw(m) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (m[i][j] === 0)
                        return false;
                }
            }
            return true;
        }
    }
}
class Snake {
    constructor() {
        this.states = {
            empty: 0,
            snake: 1,
            apple: 2,
        };
        this.moves = {
            up: 1,
            down: 2,
            left: 3,
            right: 4
        };
        this.snake = [];
        this.apple = [];
        /* Elements */
        this.$field = [];
        this.$game = $('<div/>', { class: 'snake' });
        this.$space = $('<div/>');
        this.$start = $('<input/>', { type: 'button', value: 'Начать игру' });
        /* Events */
        this.$start.on('click', this.Start.bind(this));
        /* Building DOM */
        $('body').append(this.$game.append(this.$space, this.$start));
        this.Restructure(10);
        this.RedrawSpace();
        this.Start();
    }
    Restructure(size) {
        this.size = size;
        this.space = [];
        for (let i = 0; i < this.size; i++) {
            this.space[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.space[i][j] = this.states['empty'];
            }
        }
        this.move = this.moves['right'];
        let head = { y: this.size / 2, x: this.size / 2 };
        let tail = { y: this.size / 2, x: this.size / 2 - 1 };
        this.snake.push([head.y, head.x]);
        this.snake.push([tail.y, tail.x]);
        this.space[head.y][head.x] = this.states['snake'];
        this.space[tail.y][tail.x] = this.states['snake'];
        let apple = this.GetApple();
        this.apple = [apple[0], apple[1]];
        this.space[apple[0]][apple[1]] = this.states['apple'];
    }
    GetApple() {
        let y, x;
        while (true) {
            y = Math.floor(Math.random() * this.size);
            x = Math.floor(Math.random() * this.size);
            if (this.space[y][x] === this.states['empty'])
                break;
        }
        return [y, x];
    }
    RedrawSpace() {
        this.$space.css({
            width: `${this.size * 30}px`,
            height: `${this.size * 30}px`
        });
        for (let i = 0; i < this.size; i++) {
            this.$field[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.$field[i][j] = $('<span/>', { 'data-state': this.states['empty'], 'data-i': i, 'data-j': j });
            }
        }
        for (let i = 0; i < this.size; i++)
            this.$space.prepend(this.$field[i]);
    }
    DrawSnake() {
        for (let i = 0; i < this.snake.length; i++)
            this.$field[this.snake[i][0]][this.snake[i][1]].attr({ 'data-state': this.states['snake'] });
    }
    DrawApple() {
        this.$field[this.apple[0]][this.apple[1]].attr({ 'data-state': this.states['apple'] });
    }
    MoveSnake() {
        console.log(this.snake);
        let self = this;
        let yx = GetMoveHead();
        if ((yx[0] < 0) || (yx[0] >= this.size) || (yx[1] < 0) || (yx[1] >= this.size) || (this.space[yx[0]][yx[1]] === this.states['snake'])) {
            this.GameOver();
            return;
        }
        for (let i = 0; i < this.snake.length; i++)
            this.$field[this.snake[i][0]][this.snake[i][1]].attr({ 'data-state': this.states['empty'] });
        for (let i = this.snake.length - 1; i > 0; i--) {
            this.snake[i][0] = this.snake[i - 1][0];
            this.snake[i][1] = this.snake[i - 1][1];
        }
        this.snake[0][0] = yx[0];
        this.snake[0][1] = yx[1];
        this.DrawSnake();
        function GetMoveHead() {
            let y, x;
            y = self.snake[0][0];
            x = self.snake[0][1];
            switch (self.move) {
                case self.moves['right']:
                    x++;
                    break;
                case self.moves['left']:
                    x--;
                    break;
                case self.moves['up']:
                    y--;
                    break;
                case self.moves['down']:
                    y++;
                    break;
            }
            return [y, x];
        }
    }
    Start() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.space[i][j] = this.states['empty'];
                this.$field[i][j].attr('data-state', this.states['empty']);
            }
        }
        this.snake.length = 0;
        this.move = this.moves['right'];
        let head = { y: this.size / 2, x: this.size / 2 };
        let tail = { y: this.size / 2, x: this.size / 2 - 1 };
        this.snake.push([head.y, head.x]);
        this.snake.push([tail.y, tail.x]);
        this.space[head.y][head.x] = this.states['snake'];
        this.space[tail.y][tail.x] = this.states['snake'];
        let apple = this.GetApple();
        this.apple = [apple[0], apple[1]];
        this.space[apple[0]][apple[1]] = this.states['apple'];
        this.DrawSnake();
        this.DrawApple();
        clearInterval(this.stop);
        this.stop = setInterval(this.MoveSnake.bind(this), 1000);
    }
    GameOver() {
        clearInterval(this.stop);
        alert('Игра окончена');
    }
}
//# sourceMappingURL=main.js.map