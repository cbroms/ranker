<script context="module">
	export async function preload(page, session) {
		const api = session.api;
		return { api };
	}
</script>

<script>
	import { post } from "../../api/remote";
	import { goto } from "@sapper/app";

	import Panel from "../../components/Panel.svelte";

	export let api;

	let content = "";
	let error = "";

	const onSubmit = async () => {
		if (content !== "") {
			await post(`${api}/new`, { content: content });
			goto("/ranking/0/");
		}
	};
</script>

<Panel>
	<header>
		<h1>Add an overused phrase</h1>
	</header>
	<main>
		<div>
		<input
			bind:value="{content}"
			placeholder="A phrase you're tired of hearing..."
		/>
		<button on:click="{onSubmit}">Add it!</button>
	</div>
	</main>
</Panel>

<style>
	header {
		grid-column: 1 / 1;
		grid-row: 1 / 2;
		border: 1px solid black;
		border-bottom: none;
		color: white;
		background-color: #d35b5b;
		padding: 20px;
	}

	main {
		grid-column: 1 / 1;
		grid-row: 2 / 4;
		border: 1px solid black;
		background-color: white;
		padding: 20px;
	}

	main > div {
		margin-top: 40px;
		display: flex;
	}

	input {
		width: 100%;
		margin-right:15px;
	}

	button {
		width: 100px;
	}

</style>
