<script>
  export let nextPage = "";
  export let prevPage = "";
  export let randomPage = "";
</script>

<span class="footer">
  <a href={randomPage} class="random">
    <button>Random selection</button>
  </a>

  <span class="navigation">
    <a href={prevPage === "" ? null : prevPage}>
      <button class="previous" disabled={prevPage === ""}>
        &lsaquo; Prev page
      </button>
    </a>

    <a href={nextPage === "" ? null : nextPage}>
      <button disabled={nextPage === ""}>Next page &rsaquo;</button>
    </a>
  </span>
</span>

<style>
  .footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .random {
    margin-top: 15px;
  }

  .navigation {
    margin-top: 15px;
  }

  .previous {
    margin-right: 15px;
  }

  .random {
    margin-right: 15px;
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
      margin-right: 0;
    }
  }

  button:disabled {
    color: grey;
    border-color: grey;
  }

  button:disabled:hover {
    background-color: white;
    cursor: not-allowed;
  }
</style>
