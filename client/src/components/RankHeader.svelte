<script>
  import RankVariantSelector from "./RankVariantSelector.svelte";

  export let overused = false;
  export let addPage = "";
</script>

<span class="header">
  <h1>Phrases we hear <RankVariantSelector {overused} /></h1>
  <a href={addPage}>
    <button class:overused>+ Add a phrase</button>
  </a>
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
