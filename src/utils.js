export function getDateTimeString(date) {
	if (!(date instanceof Date))
		throw TypeError(
			`Ecpected type Date, got type: ${Object.prototype.toString.call(date)}`,
		);
	return (
		[date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
		' ' +
		[date.getHours(), date.getMinutes()].join(':')
	);
}
