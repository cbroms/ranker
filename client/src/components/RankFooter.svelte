<script>
  export let nextFunc = null;
  export let prevFunc = null;
  export let randomFunc = () => {};
</script>

<span class="footer">
  <button class="random" on:click={randomFunc}>Random phrase</button>
  <span class="navigation">
    <button on:click={prevFunc} class="previous" disabled={prevFunc === null}>
      &lsaquo; Prev page
    </button>

    <button on:click={nextFunc} disabled={nextFunc === null}
      >Next page &rsaquo;</button>
  </span>
</span>

<style>
  .footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  @media (max-width: 460px) {
    .footer {
      justify-content: center;
    }

    .navigation {
      order: 1;
    }

    .random {
      order: 2;
    }
  }

  .random {
    margin-top: 15px;
  }

  .previous {
    margin-right: 15px;
  }

  .random {
    margin-right: 15px;
  }

  button:disabled {
    color: grey;
    border-color: grey;
  }

  button:disabled:hover {
    background-color: white;
    cursor: default;
  }
</style>
