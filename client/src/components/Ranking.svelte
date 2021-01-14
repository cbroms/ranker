<script>
	import Panel from "./Panel.svelte";

	export let overused = false;
</script>

<Panel>
	<header class:overused>
		<slot name="header"></slot>
	</header>
	<main>
		<slot name="ranking"></slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</Panel>

<style>
	.overused {
		background-color: #d35b5b;
	}

	header {
		grid-column: 1 / 1;
		grid-row: 1 / 2;
		border: 1px solid black;
		border-bottom: none;
		background-color: white;
		padding: 20px;
		background-color: #79b95c;
		color: white;
	}

	main {
		grid-column: 1 / 1;
		grid-row: 2 / 3;
		border: 1px solid black;
		background-color: white;
		padding: 20px;
	}

	footer {
		grid-column: 1 / 1;
		grid-row: 3 / 4;
		background-color: white;
		padding: 20px;
		border: 1px solid black;
		border-top: none;
	}
</style>
