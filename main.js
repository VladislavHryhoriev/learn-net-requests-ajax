/// FETCH

// let response = await fetch('/assets/userAvatar.png');
// let blob = await response.blob();

// let img = document.createElement('img');

// img.style = 'position:fixed;top:10px;left:10px;width:100px';
// document.body.append(img)

// img.src = URL.createObjectURL(blob);

// setTimeout(() => {
// 	img.remove();
// 	URL.revokeObjectURL(img.src);
// }, 3000);

/// Headers

// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// console.log(response.headers.get('Content-Type'));

// for (const [key, value] of response.headers) {
// 	console.log(`${key} = ${value}`);
// }

/// POST requests

// let user = {
// 	name: 'John',
// 	surname: 'Smith'
// };

// let response = await fetch('/fetch/user', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json;charset=utf-8'
// 	},
// 	body: JSON.stringify(user),
// });

// let result = await response.json();

// console.log(result.message);

///

// async function getUsers(names) {
// 	let users = [];

// 	for (const name of names) {
// 		let user = fetch(`https://api.github.com/users/${name}`).then(
// 			successResponse => {
// 				if (successResponse.status != 200) return null;
// 				else return successResponse.json()
// 			},
// 			failResponse => null
// 		);
// 		users.push(user);
// 	}

// 	let results = await Promise.all(users);

// 	return results;
// };

// let git = await getUsers(['Ricardo', 'Alex']);

// console.log(git);

/// FETCH: loading

let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

const contentLength = +response.headers.get('Content-Length');

let receivedLength = 0;
let chunks = [];
while (true) {
	const { done, value } = await reader.read();

	if (done) break;

	chunks.push(value);
	receivedLength += value.length;

	console.log(`${receivedLength} / ${contentLength}`);
}

let chunksAll = new Uint8Array(receivedLength);
let position = 0;
for (const chunk of chunks) {
	chunksAll.set(chunk, position);
	position += chunk.length;
}

console.log(chunksAll);

let result = new TextDecoder("utf-8").decode(chunksAll);

let commits = JSON.parse(result);
console.log(commits[0].author.login);