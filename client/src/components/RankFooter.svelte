<script>
  export let nextPage = "";
  export let prevPage = "";
  export let randomPage = "";
</script>

<span class="footer">
  <a href={randomPage}>
    <button class="random">Random selection</button>
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
