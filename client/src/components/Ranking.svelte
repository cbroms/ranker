<script>
    export let overused = false;
</script>

<div class="panel">
	<header class:overused>
		<slot name="header"></slot>
	</header>
	<main>
		<slot name="ranking"></slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</div>

<style>
	.panel {
		position: relative;
		margin: 0 auto;
		max-width: 900px;
		z-index: 1;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 100%;
  		grid-template-rows: 80px 1fr 80px;
	}

	@media (min-width: 500px) {
		.panel {
			width: calc(100% - 40px);
			height: 75vh;
		}

		.panel::before {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background: #f3f2f1 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Ccircle cx='2.5' cy='2.5' r='.5' fill='%23242a49'/%3E%3C/svg%3E") repeat bottom right;
			transform: translate(9px, 9px);
			z-index: -1;
		}
	}

    .overused {
        background-color: #D35B5B;
    }

	header {
		grid-column: 1 / 1;
		grid-row: 1 / 2;
		border: 1px solid black;
		border-bottom: none;
		background-color: white;
		padding: 20px;
        background-color: #79B95C;
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
