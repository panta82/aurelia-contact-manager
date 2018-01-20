export function areEqual(obj1, obj2) {
	return Object.keys(obj1).every(
		key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
	);
}

export function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
