export const post = (path, data) => {
	return fetch(path, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((result) => result);
};
