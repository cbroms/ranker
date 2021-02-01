<script>
  import { goto } from "@sapper/app";

  import { post } from "../api/remote";
  import { voted } from "../stores/voted";

  import Panel from "./Panel.svelte";
  import RankVariantSelector from "./RankVariantSelector.svelte";
  import ItemRow from "./ItemRow.svelte";

  export let api;
  export let type;

  let content = "";
  let error = "";
  let added = false;
  let forceAdd = false;
  let items = null;

  const options = [
    { text: "overused", id: 1 },
    { text: "underused", id: 2 },
  ];

  const onChangedValue = (selected) => {
    if (selected.id === 1) {
      goto("/overused/add/");
    } else {
      goto("/underused/add/");
    }
  };

  const onSubmit = async () => {
    if (content !== "") {
      content = content.trim();
      const res = await post(`${api}/new?rankType=${type}`, {
        content: content,
        forceAdd: forceAdd,
      });

      if (Object.keys(res).includes("items")) {
        // there were similar items
        error =
          "There are already some similar phrases in the ranking. Check that none of these are too much like yours before continuing.";
        forceAdd = true;
        items = res.items;
      } else {
        voted.addVote(res._id);
        added = true;
      }
    } else {
      error = "Can't add a phrase if you haven't entered one!";
    }
  };

  const onVote = async (which, i) => {
    post(`${api}/vote?rankType=${type}`, { id: which });
    voted.addVote(which);
  };

  const onUnvote = async (which, i) => {
    post(`${api}/unvote?rankType=${type}`, { id: which });
    voted.removeVote(which);
  };
</script>

<Panel>
  <header class:overused={type === "overused"}>
    <h1>
      Add an <RankVariantSelector
        {onChangedValue}
        {options}
        selectedOption={type === "overused" ? 1 : 2} /> phrase
    </h1>
  </header>
  <main>
    <div>
      {#if added}
        <p class="success">Added &ldquo;{content}&rdquo; to the list.</p>
      {:else}
        <input
          bind:value={content}
          on:keypress={() => {
            if (forceAdd || error !== "") {
              forceAdd = false;
              error = "";
            }
          }}
          placeholder={type === "overused"
            ? "A phrase you're tired of hearing..."
            : "A phrase you want to hear more..."} />
        {#if error !== ""}
          <p class="error">{error}</p>
        {/if}
        {#if items && forceAdd}
          {#each items as item, i (item._id)}
            <ItemRow {item} {i} {type} {onVote} {onUnvote} />
          {/each}
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
      <a href="/{type}/"> <button class="primary">Return to ranking</button></a>
    {:else}
      <a href="/{type}/">
        <button class="return">&lsaquo; Return to ranking</button></a>
      <button class="primary" on:click={onSubmit}
        >Add your phrase {forceAdd ? "anyway" : ""}</button>
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
    border-bottom: none;
    background-color: white;

    display: flex;
    justify-content: space-between;
  }

  input {
    width: 100%;
    height: 50px;
    margin-top: 20px;
  }

  input:focus {
    background-color: #3f3f3f;
    color: #f3f2f1;
    outline: none;
  }

  .return {
    margin-right: 15px;
  }

  button {
    height: 100%;
  }
</style>
