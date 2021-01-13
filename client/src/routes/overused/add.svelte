<script context="module">
	export async function preload(page, session) {

		const api = session.api;
		return {api}
	}
</script>

<script>

	import { post } from "../../api/remote"
	import { goto } from "@sapper/app"

	export let api;

	let content = "";
	let error = ""

	const onSubmit = async () => {
		if (content !== "") {
			await post(`${api}/new`, {content: content})
			goto("/ranking/0/")
		}
	}


</script>

<h1>Add a phrase</h1>
<input bind:value="{content}" placeholder="Enter a phrase" />
<button on:click={onSubmit}>Add it!</button>
