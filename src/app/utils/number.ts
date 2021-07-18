const toFixed = (number:string | number, decimals = 2, delimiter = '.') => {
	number = `${number}`;
	const accDelimiter:string[] = ['.', ','];
	if (!(accDelimiter.includes(delimiter))) {
		throw Error('Delimitador inválido');
	}
	if ((delimiter === '.') && (number.includes(','))) {
		number = number.split(',').join('');
	}
	if ((delimiter === ',') && (number.includes('.'))) {
		number = number.split('.').join('');
	}
	if (Number.isInteger(parseFloat(number))) {
		number = `${number}${delimiter}0`;
	}
	const aux = number.split(delimiter);

	if ((aux[1].length > decimals) && (parseInt(aux[1][decimals]) === 5)) {
		aux[1] = `${parseInt(aux[1]) + 1}`;
	}
	return (parseFloat((aux.join('.')))).toFixed(decimals);
};

export default {
	toFixed
};
