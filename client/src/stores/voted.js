import { writable } from "svelte/store";
import { markIdAsVoted, unmarkIdAsVoted } from "../api/local";

const vote = writable([]);

const addIds = (ids) => {
	if (ids.length > 0) {
		vote.update((a) => [...a, ...ids]);
	}
};

const addVote = (id) => {
	markIdAsVoted(id);
	vote.update((a) => [...a, id]);
};

const removeVote = (id) => {
	unmarkIdAsVoted(id);
	vote.update((a) => {
		const newA = [...a];
		newA.splice(newA.indexOf(id), 1);
		return newA;
	});
};

export const voted = {
	subscribe: vote.subscribe,
	set: vote.set,
	update: vote.update,
	addVote,
	removeVote,
	addIds,
};
