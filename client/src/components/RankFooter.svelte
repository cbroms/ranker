<script>
  export let nextFunc = null;
  export let prevFunc = null;
  export let randomFunc = () => {};
</script>

<span class="footer">
  <button on:click={randomFunc}>Random phrase</button>
  <span>
    {#if prevFunc !== null}
      <button on:click={prevFunc} class="previous"> &lsaquo; Prev page </button>
    {/if}
    {#if nextFunc !== null}
      <button on:click={nextFunc}>Next page &rsaquo;</button>
    {/if}
  </span>
</span>

<style>
  .footer {
    display: flex;
    justify-content: space-between;
  }

  .previous {
    margin-right: 15px;
  }
</style>
