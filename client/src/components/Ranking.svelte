<script>
  import { flip } from "svelte/animate";

  import { voted } from "../stores/voted";
  import { post } from "../api/remote";

  import Panel from "./Panel.svelte";
  import RankHeader from "./RankHeader.svelte";
  import RankFooter from "./RankFooter.svelte";
  import ItemRow from "./ItemRow.svelte";

  export let type;
  export let json;
  export let pageNum;
  export let api;

  let tempVotes = {};

  const onVote = async (which, i) => {
    await post(`${api}/vote?rankType=${type}`, { id: which });
    voted.addVote(which);
    tempVotes = { ...tempVotes, [which]: 1 };
    json.items[i].votes += tempVotes[which];
    json = json;
  };

  const onUnvote = async (which, i) => {
    await post(`${api}/unvote?rankType=${type}`, { id: which });
    voted.removeVote(which);
    tempVotes = { ...tempVotes, [which]: -1 };
    json.items[i].votes += tempVotes[which];
    json = json;
  };
</script>

<Panel>
  <header class:overused={type === "overused"}>
    <RankHeader overused={type == "overused"} addPage={`/${type}/add/`} />
  </header>
  <main>
    <div class="items">
      {#if json.items.length === 0}
        <p>No phrases yet!</p>
      {/if}
      {#each json.items.sort((a, b) => b.votes - a.votes) as item, i (item._id)}
        <div class="item" animate:flip={{ duration: 250 }}>
          <ItemRow
            {item}
            {i}
            {pageNum}
            {type}
            {onVote}
            {onUnvote}
            includeVotes="true" />
        </div>
      {/each}
    </div>
  </main>
  <nav>
    <RankFooter
      nextPage={json.nextPage ? `/${type}/?page=${pageNum + 1}` : ""}
      prevPage={pageNum > 0 ? `/${type}/?page=${pageNum - 1}` : ""}
      randomPage={`${type}/random/`} />
  </nav>
</Panel>

<style>
  .overused {
    background-color: #d35b5b;
  }

  header {
    grid-column: 1 / 1;
    grid-row: 1 / 2;
    border: 1px solid black;
    border-bottom: none;
    background-color: white;
    padding: 20px;
    background-color: #79b95c;
    color: white;
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
    grid-column: 1 / 1;
    grid-row: 3 / 4;
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    border-top: none;
    border-bottom: none;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    height: 430px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .item {
    width: 100%;
  }
</style>
