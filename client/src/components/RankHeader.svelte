<script>
  import RankVariantSelector from "./RankVariantSelector.svelte";

  export let overused = false;
  export let addFunc = () => {};
</script>

<span class="header">
  <h1>Phrases we hear <RankVariantSelector {overused} /></h1>
  <button class:overused on:click={addFunc}>+ Add a phrase</button>
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

  .overused:hover {
    color: #d35b5b;
  }

  button:hover {
    color: #79b95c;
    background-color: white;
  }
</style>
