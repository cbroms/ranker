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
		margin: 0 auto;
		border: 1px solid black;
		max-width: 600px;
		width: 100%;
		
	}

    .overused {
        background-color: indianred;
    }

	header {
		padding: 20px;
		border-bottom: 1px solid black;
        background-color: teal;
	}

	main {
		padding: 20px;
	}

	footer {
		padding: 20px;
		border-top: 1px solid black;
	}
</style>
