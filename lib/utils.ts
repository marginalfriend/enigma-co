function formatDate(date: Date) {
	let d = new Date(date);
	let year = d.getFullYear();
	let month = ('0' + (d.getMonth() + 1)).slice(-2);
	let day = ('0' + d.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}