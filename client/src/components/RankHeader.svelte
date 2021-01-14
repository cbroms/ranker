<script>
    import RankVariantSelector from "./RankVariantSelector.svelte";

    export let overused = false;
    export let addFunc = () => {};
</script>

<span class="header">
    <h1>Phrases we use <RankVariantSelector overused="{overused}" /></h1>
    <button on:click="{addFunc}">+ Add a phrase</button>
</span>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }

    button {
        border: 1px solid white;
        color: white;
    }
</style>
