<script>
  import { post } from "../api/remote";
  import { goto } from "@sapper/app";

  import Panel from "./Panel.svelte";

  export let api;
  export let type;

  let content = "";
  let error = "";
  let added = false;

  const onSubmit = async () => {
    if (content !== "") {
      await post(`${api}/new?rankType=${type}`, { content: content });
      added = true;
    } else {
      error = "Enter a phrase";
    }
  };
</script>

<Panel>
  <header class:overused={type === "overused"}>
    <h1>Add an {type} phrase</h1>
  </header>
  <main>
    <div>
      {#if added}
        <p class="success">Added "{content}" to the list.</p>
      {:else}
        <input
          bind:value={content}
          placeholder={type === "overused"
            ? "A phrase you're tired of hearing..."
            : "A phrase you want to hear more..."} />
        {#if error !== ""}
          <p class="error">{error}</p>
        {/if}
      {/if}
    </div>
  </main>
  <nav>
    {#if added}
      <button
        on:click={() => {
          content = "";
          added = false;
        }}>Add another phrase</button>
      <button class="primary" on:click={() => goto(`/${type}/`)}
        >Return to ranking</button>
    {:else}
      <button on:click={() => goto(`/${type}/`)}>Return to ranking</button>
      <button class="primary" on:click={onSubmit}>Add phrase</button>
    {/if}
  </nav>
</Panel>

<style>
  .error {
    color: #d35b5b;
  }

  .success {
    color: #79b95c;
  }

  .overused {
    background-color: #d35b5b;
  }

  header {
    grid-column: 1 / 1;
    grid-row: 1 / 2;
    border: 1px solid black;
    border-bottom: none;
    color: white;
    background-color: #79b95c;
    padding: 20px;
  }

  main {
    grid-column: 1 / 1;
    grid-row: 2 / 3;
    border: 1px solid black;
    border-bottom: none;
    background-color: white;
    padding: 20px;
  }

  nav {
    padding: 20px;
    grid-column: 1 / 1;
    grid-row: 3 / 4;
    border: 1px solid black;
    border-top: none;
    background-color: white;

    display: flex;
    justify-content: flex-end;
  }

  main > div {
    margin-top: 40px;
  }

  input {
    width: 100%;
    height: 50px;
  }

  input:focus {
    background-color: #3f3f3f;
    color: #f3f2f1;
    outline: none;
  }

  button {
    margin-left: 15px;
  }
</style>
