class Game {
	field_val;
	m;
	player;
	state;

	$start;
	$fields;
	$game;
	$win_text;

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
		this.$game = $('<div/>');
		this.$start = $('<input/>', {type: 'button', value: 'Начать игру'});
		this.$fields = [];
		for (let i = 0; i < 3; i++) {
			this.$fields[i] = [];
			for (let j = 0; j < 3; j++) {
				this.$fields[i][j] = $('<span/>', {'data-state': this.field_val['empty'], 'data-i': i, 'data-j': j});
			}
		}
		this.$win_text = $('<span/>').css('display', 'none');
		/* Events */
		this.$start.on('click', this.Start.bind(this));
		this.$game.on('click', 'span', this.Turn.bind(this));

		/* Building DOM */
		for (let i = 0; i < 3; i++) this.$game.prepend(this.$fields[i]);

		$('body').append(
			this.$game,
			this.$win_text,
			this.$start
		);
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
		let i = element.attr('data-i');
		let j = element.attr('data-j');

		if (this.m[i][j]) return;

		if (this.state === this.player['end']) return;

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

		if ((this.m[i][0] === 1 && this.m[i][1] === 1 && this.m[i][2] === 1) || (this.m[0][j] === 1 && this.m[1][j] === 1 && this.m[2][j] === 1) || (this.m[0][0] === 1 && this.m[1][1] === 1 && this.m[2][2] === 1) || (this.m[0][2] === 1 && this.m[1][1] === 1 && this.m[2][0] === 1)) _end = 'Выиграл первый игрок';
		else if ((this.m[i][0] === 2 && this.m[i][1] === 2 && this.m[i][2] === 2) || (this.m[0][j] === 2 && this.m[1][j] === 2 && this.m[2][j] === 2) || (this.m[0][0] === 2 && this.m[1][1] === 2 && this.m[2][2] === 2) || (this.m[0][2] === 2 && this.m[1][1] === 2 && this.m[2][0] === 2)) _end = 'Выиграл второй игрок';
		else if (CheckDeadHeat(this.m)) _end = 'Ничья';

		if (_end) {
			this.$win_text.text(_end);
			this.$win_text.css('display', 'block');
			this.state = this.player['end'];
		}

		function CheckDeadHeat(m): boolean {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (m[i][j] === 0) return false;
				}
			}
			return true;
		}
	}
}