class Snake {
	size		: number;
	space		: any;
	states		: {empty: 0, snake: 1, apple: 2};
	moves		: object;
	move		: 1|2|3|4;
	snake		: [number, number][];
	apple		: [number, number]|[];
	$field		: JQuery[][];
	$space		: JQuery;
	$game		: JQuery;
	$start		:JQuery;
	stop		: number;
	$choice		:JQuery;
	$size10;
	$size50;
	$size100;

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
		this.$game = $('<div/>', {class: 'snake'});
		this.$space = $('<div/>');
		this.$start = $('<input/>', { type: 'button', value: 'Начать игру' });
		this.$choice = $('<select/>');
		this.$size10 = $('<option/>');
		this.$size50 = $('<option/>');
		this.$size100 = $('<option/>');

		/* Events */
		this.$start.on('click', this.Start.bind(this));
		$(document).on('keydown', this.Move.bind(this));

		/* Building DOM */
		$('body').append(
			this.$game.append(
				this.$space,
				this.$start,
				this.$choice.append(
					this.$size10.text('10'),
					this.$size50.text('50'),
					this.$size100.text('100')
				)
			)
		);

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

		let head = {y: this.size / 2, x: this.size / 2};
		let tail = {y: this.size / 2, x: this.size / 2 - 1};

		this.snake.push([head.y, head.x]);
		this.snake.push([tail.y, tail.x]);

		this.space[head.y][head.x] = this.states['snake'];
		this.space[tail.y][tail.x] = this.states['snake'];

		let apple = this.GetApple();
		this.apple = [apple[0], apple[1]];
		this.space[apple[0]][apple[1]] = this.states['apple'];
	}

	GetApple(): [number, number] {
		let y, x;
		while (true) {
			y = Math.floor(Math.random() * this.size);
			x = Math.floor(Math.random() * this.size);

			if (this.space[y][x] === this.states['empty']) break;
		}

		return  [y, x];
	}

	RedrawSpace() {
		this.$space.css({
			width: `${this.size * 30}px`,
			height: `${this.size * 30}px`
		});
		for (let i = 0; i < this.size; i++) {
			this.$field[i] = [];
			for (let j = 0; j < this.size; j++) {
				this.$field[i][j] = $('<span/>', {'data-state': this.states['empty'], 'data-i': i, 'data-j': j});
			}
		}
		for (let i = 0; i < this.size; i++) this.$space.prepend(this.$field[i]);
	}

	DrawSnake() {
		for (let i = 0; i < this.snake.length; i++) this.$field[this.snake[i][0]][this.snake[i][1]].attr({'data-state': this.states['snake']});
	}

	DrawApple() {
		this.$field[this.apple[0]][this.apple[1]].attr({'data-state': this.states['apple']});
	}

	MoveSnake() {
		let self = this;

		let yx = GetMoveHead();
		console.log(yx);
		if ( (yx[0] < 0) || (yx[0] >= this.size) || (yx[1] < 0) || (yx[1] >= this.size) || (this.space[yx[0]][yx[1]] === this.states['snake']) ) {
			this.GameOver();
			return;
		}
		if (this.space[yx[0]][yx[1]] === this.states['apple']) {
			this.snake.push([this.snake[this.snake.length - 1][0], this.snake[this.snake.length - 1][1]]);
			let apple = this.GetApple();
			this.apple = [apple[0], apple[1]];
			this.space[apple[0]][apple[1]] = this.states['apple'];
			this.DrawApple();
		}

		for (let i = 0; i < this.snake.length; i++)	{
			this.space[this.snake[i][0]][this.snake[i][1]] = this.states['empty'];
			this.$field[this.snake[i][0]][this.snake[i][1]].attr({'data-state': this.states['empty']});
		}
		for (let i = this.snake.length - 1; i > 0; i--) {
			this.snake[i][0] = this.snake[i-1][0];
			this.snake[i][1] = this.snake[i-1][1];
			this.space[this.snake[i][0]][this.snake[i][1]] = this.states['snake'];
		}

		this.snake[0][0] = yx[0];
		this.snake[0][1] = yx[1];
		this.space[yx[0]][yx[1]] = this.states['snake'];
		this.DrawSnake();

		function GetMoveHead() {
			let y,x;
			y = self.snake[0][0];
			x = self.snake[0][1];
			switch (self.move) {
				case self.moves['right']: x++; break;
				case self.moves['left']: x--; break;
				case self.moves['up']: y++; break;
				case self.moves['down']: y--; break;
			}
			return [y,x];
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

		let head = {y: this.size / 2, x: this.size / 2};
		let tail = {y: this.size / 2, x: this.size / 2 - 1};

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
		this.stop = setInterval(this.MoveSnake.bind(this), 300);

	}

	Move(e) {
		let arrow = { left: 37, up: 38, right: 39, down: 40 };
		switch (e.keyCode) {
			case arrow.right : if (this.move !== this.moves['left']) this.move = this.moves['right']; break;
			case arrow.left : if (this.move !== this.moves['right']) this.move = this.moves['left']; break;
			case arrow.up : if (this.move !== this.moves['down']) this.move = this.moves['up']; break;
			case arrow.down : if (this.move !== this.moves['up']) this.move = this.moves['down']; break;
		}
	}

	GameOver() {
		clearInterval(this.stop);
		alert ('Игра окончена');
	}
}