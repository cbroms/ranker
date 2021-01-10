export const getVotedIds = (objs) => {
	const ids = [];

	for (const obj of objs) {
		const id = obj._id;

		// check if the id is in localstorage as upvoted
		const res = localStorage.getItem(id);

		if (res !== null) ids.push(id);
	}

	return ids;
};

export const markIdAsVoted = (id) => {
	localStorage.setItem(id, new Date().toISOString());
};

export const unmarkIdAsVoted = (id) => {
	localStorage.removeItem(id);
};
