<script>
    import RankVariantSelector from "./RankVariantSelector.svelte";

    export let overused = false;
    export let addFunc = () => {};
</script>

<span class="header">
    <span class="header-title"
        >Phrases we <RankVariantSelector overused="{overused}"
    /></span>
    <button on:click="{addFunc}">+ Add a phrase</button>
</span>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }

    .header-title {
        font-size: 1.25rem;
    }

    button {
        border: 1px solid white;
        color: white;
    }
</style>
