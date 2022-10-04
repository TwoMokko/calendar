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

		/* Events */
		this.$start.on('click', this.Start.bind(this));

		/* Building DOM */
		$('body').append(
			this.$game.append(
				this.$space,
				this.$start
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

	MoveSnake() {console.log(this.snake);
		let self = this;

		let yx = GetMoveHead();
		if ( (yx[0] < 0) || (yx[0] >= this.size) || (yx[1] < 0) || (yx[1] >= this.size) || (this.space[yx[0]][yx[1]] === this.states['snake']) ) {
			this.GameOver();
			return;
		}

		for (let i = 0; i < this.snake.length; i++)	this.$field[this.snake[i][0]][this.snake[i][1]].attr({'data-state': this.states['empty']});
		for (let i = this.snake.length - 1; i > 0; i--) {
				this.snake[i][0] = this.snake[i-1][0];
				this.snake[i][1] = this.snake[i-1][1];
		}

		this.snake[0][0] = yx[0];
		this.snake[0][1] = yx[1];
		this.DrawSnake();

		function GetMoveHead() {
			let y,x;
			y = self.snake[0][0];
			x = self.snake[0][1];
			switch (self.move) {
				case self.moves['right']: x++; break;
				case self.moves['left']: x--; break;
				case self.moves['up']: y--; break;
				case self.moves['down']: y++; break;
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
		this.stop = setInterval(this.MoveSnake.bind(this), 1000);

	}

	GameOver() {
		clearInterval(this.stop);
		alert ('Игра окончена');
	}
}