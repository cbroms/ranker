<script context="module">
	export async function preload(page, session) {

		const api = session.api;
		const res = await this.fetch(`${api}/sample`);

		if (res.status === 200) {
			const json = await res.json();
			return { json, api };
		}

		this.error(json.status);
	}
</script>

<script>

	import { post } from "../api/remote"
	import { goto } from "@sapper/app"

	export let json;
	export let api;

	const onClick = async (which) => {

		// vote 
		const res = await post(`${api}/vote`, {id: which});
		
		// if (res === 200) goto("/ranking")
		await goto("/ranking")
	}	
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

<div>{JSON.stringify(json)}</div>
<div>
	<button on:click={() => onClick(1)}>One</button>
	<button on:click={() => onClick(2)}>Two</button>
</div>
