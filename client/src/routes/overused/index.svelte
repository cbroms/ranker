<script context="module">
	export async function preload(page, session) {
		// this is the results page that's been paginated, so we have a num parameter
		const num = page.query.page || 0;
		const api = session.api;

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
	import { onMount } from "svelte";

	import { voted } from "../../stores/voted";
	import { getVotedIds } from "../../api/local";
	import { post } from "../../api/remote";

	import Ranking from "../../components/Ranking.svelte";
	import RankHeader from "../../components/RankHeader.svelte";
	import RankFooter from "../../components/RankFooter.svelte";

	export let json;
	export let num;
	export let api;

	onMount(() => {
		// get the list of ids we've voted up
		voted.addIds(getVotedIds(json.items));
	});

	const onVote = async (which) => {
		await post(`${api}/vote`, { id: which });
		voted.addVote(which);
	};

	const onUnvote = async (which) => {
		await post(`${api}/unvote`, { id: which });
		voted.removeVote(which);
	};
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

<Ranking overused>
	<span slot="header">
		<RankHeader overused addFunc={() => goto("/overused/add/")}/>
	</span>
	<span slot="ranking">
		<div class="items">
			{#each json.items as item, i}
				<div class="item" class:selected={$voted.includes(item._id)} class:first={i === 0}>
					<div class="item-vote">
						{#if $voted.includes(item._id)}
					 	<span on:click={() => onUnvote(item._id)} 
					 		  class="voted vote-box" 
					 		  title={`remove your vote for the phrase "${item.content}"`}>✓</span>
					 	{:else}
					 	<span on:click={() => onVote(item._id)} 
					 		class="unvoted vote-box" 
					 		title={`add a vote for the phrase "${item.content}"`}></span>
					 	{/if}
					 </div>
					 <div class="item-content">{item.content}</div>
				</div>
			{/each}
		</div>
	</span>
	<span slot="footer">
		<RankFooter nextFunc={() => goto(`/overused/?page=${parseInt(num) +
		1}`)} prevFunc={num > 0 ? () => goto(`/overused/?page=${parseInt(num) -
		1}`) : null} randomFunc={() => goto("/overused/random")} />
	</span>
</Ranking>


<style>
	.items {
		display: flex;
		flex-wrap: wrap;
	}
	.item {
		display: flex;
		width: 100%;
		margin: 10px;
	}

	.first {
		font-size: 2rem;
		margin: 20px 10px;
	}

	.item-vote {
		cursor: pointer;
		margin-right: 50px;
		width: 23px;
	}

	.selected {
		color: #D35B5B;
	}

	.vote-box {
		box-sizing: border-box;
		border: 1px solid;
		width: 23px;
		height: 23px;
		display: inline-block;
	}

	.voted {
		line-height: 10px;
		font-family: monospace;
		font-size: 50px;

	}

	
</style>