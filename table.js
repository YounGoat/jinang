'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	, parseOptions = require('./parseOptions')
	, uncolors = require('./uncolors')

	/* in-file */
	, if2 = (a, b) => { return a ? a : b; }

	, getSize = text => {
		return uncolors(text).length;
	}

	, BORDER = {
		thin: [
			'┌─┬┐',
			'│ ││',
			'├─┼┤',
			'└─┴┘',
		],
		none: '-',
	}

	, SPACE = ' '
	;

function table(rows, options) {
	options = parseOptions(options, {
		columns: [
			{ name: 'displayHead', default: true },
			{ name: 'border', default: 'thin' },
			{ name: 'indent', default: 0 },
			{ name: 'padding', default: 1 },
		],
		caseSensitive: false,
		keepNameCase: true,
	});

	// 输出容器。
	let lines = [];

	// 格式化单元格内容。
	const formatCell = (column, value) => {
		let text = value;
		let size = getSize(text);
		switch (column.align) {
			case 'right':
				text = SPACE.repeat(column.size - size) + text;
				break;
			
			case 'center':
				let spaceSize = column.size - size;
				let left = Math.ceil(spaceSize / 2);
				let right = spaceSize - left;
				text = SPACE.repeat(left) + text + SPACE.repeat(right);
				break;
		
			case 'left':
			default:
				text = text + SPACE.repeat(column.size - size)
				break;
		}	
		
		let padding = SPACE.repeat(options.padding);
		return padding + text + padding;
	};

	let columns = options.columns;

	// ---------------------------
	// 参数规范化及参数补全。

	// 补全列定义。
	if (1) {
		if (!columns) {
			let names = [];
			rows.forEach(row => names = names.concat(Object.keys(row)));
			names.sort();

			// uniq.
			let map = {};
			names.forEach(name => map[name] = 1 );
			
			columns = [];
			Object.keys(map).forEach(name => columns.push({ name }));
		}

		columns = columns.map(column => typeof column == 'string' ? { name: column } : column);

		columns.forEach(column => {
			if (!column.hasOwnProperty('title')) {
				column.title = column.name;
			}
		});
	}

	// 数据转化为字符串。
	if (1) {
		let stringifiedRows = [];
		rows.forEach(row => {
			let stringifiedRow = {};
			columns.forEach(column => {
				if (column.formatter) {
					stringifiedRow[column.name] = column.formatter(row[column.name]);
				}
				else {
					stringifiedRow[column.name] = row[column.name] + '';
				}
			});
			stringifiedRows.push(stringifiedRow);
		});
		rows = stringifiedRows;
	}

	// 自动列宽。
	columns.forEach(function(column) {
		if (typeof column.size == 'undefined') {
			let size = 0;
			if (options.displayHead) {
				size = getSize(column.title);
			}
			rows.forEach(row => {
				size = Math.max(size, getSize(row[column.name]))
			});
			column.size = size;
		}
	});

	if (options.border == 'thin') {
		let printBorder = (I, row) => {
			let parts = [];
			parts.push(BORDER.thin[I][0]);
			columns.forEach((column, index) => {
				if (index > 0) parts.push(BORDER.thin[I][2]);
				if (row) {
					parts.push(formatCell(column, row[column.name]));
				}
				else {
					parts.push(BORDER.thin[I][1].repeat(column.size + options.padding * 2));
				}
			})
			parts.push(BORDER.thin[I][3]);
			lines.push(parts.join(''));
		};

		// 顶部边框。
		printBorder(0);

		// 输出表头。
		if (options.displayHead) {
			let row = {};
			columns.forEach(column => {
				row[column.name] = column.title;
			});
			printBorder(1, row);
			printBorder(2);
		}

		// 逐行输出。
		rows.forEach((row, index) => {
			if (index > 0) printBorder(2);
			printBorder(1, row);
		});

		// 底部边框。
		printBorder(3);
	}

	else {
		const printline = fields => {
			lines.push(fields.join(' '));
		};

		// 输出表头。
		if (options.displayHead) {
			let ths = [], tls = [];
			columns.forEach(column => {
				let text = if2(column.title, column.name);
				ths.push(formatCell(column, text));
				tls.push(BORDER.none.repeat(column.size + options.padding * 2));
			});

			// 输出表头行。
			printline(ths);
			// 输出分隔线行。
			printline(tls);
		}
		// 逐行输出。
		rows.forEach(row => {
			let tds = [];
			columns.forEach(column => {
				tds.push(formatCell(column, row[column.name]));
			})
			printline(tds);
		});
	}

	if (options.indent > 0) {
		let indent = SPACE.repeat(options.indent);
		lines = lines.map(line => indent + line);
	}

	return lines;
}

table.print = function() {
	table.apply(null, arguments).forEach(line => {
		console.log(line);
	});
};

module.exports = table;