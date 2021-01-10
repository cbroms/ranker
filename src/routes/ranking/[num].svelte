<script context="module">
	export async function preload(page, session) {
		// this is the results page that's been paginated, so we have a num parameter
		const { num } = page.params;
		const api = session.api

		// get that page's results
		const res = await this.fetch(`${api}/ranking/${num}`);

		if (res.status === 200) {
			const json = await res.json();
			return { json, api, num };
		}

		this.error(res.status);
	}
</script>

<script>
	import { goto } from "@sapper/app";
	import { onMount } from "svelte"

	import { voted } from "../../stores/voted"
	import { getVotedIds } from "../../api/local"
	import { post } from "../../api/remote"

	export let json;
	export let num;
	export let api;

	onMount(() => {
		// get the list of ids we've voted up 
		voted.addIds(getVotedIds(json.items))
	})


	const onVote = async (which) => {
		await post(`${api}/vote`, { id: which });
		voted.addVote(which)
	};

	const onUnvote = async (which) => {
		await post(`${api}/unvote`, { id: which });
		voted.removeVote(which)
	}
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

{#each json.items as item}
 <div>
 	{#if $voted.includes(item._id)}
 	<span on:click={() => onUnvote(item._id)}>▲</span>
 	{:else}
 	<span on:click={() => onVote(item._id)}>△</span>
 	{/if}
 {item.content}
</div>
{/each}

<button on:click={() => goto("/add")}>Add one</button>
