<script>
  import { goto } from "@sapper/app";
  import { flip } from "svelte/animate";

  import { voted } from "../stores/voted";
  import { post } from "../api/remote";

  import Panel from "./Panel.svelte";
  import RankHeader from "./RankHeader.svelte";
  import RankFooter from "./RankFooter.svelte";

  export let type;
  export let json;
  export let num;
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
    <RankHeader
      overused={type == "overused"}
      addFunc={() => goto(`/${type}/add/`)} />
  </header>
  <main>
    <div class="items">
      {#if json.items.length === 0}
        <p>No phrases yet!</p>
      {/if}
      {#each json.items.sort((a, b) => b.votes - a.votes) as item, i (item._id)}
        <div
          class="item"
          class:selected={$voted.includes(item._id)}
          class:overused-selected={type === "overused"}
          class:first={i === 0 && num === 0}
          animate:flip>
          {#if $voted.includes(item._id)}
            <span
              on:click={() => onUnvote(item._id, i)}
              class="voted vote-box"
              title={`remove your vote for the phrase "${item.content}"`}
              >▣</span>
          {:else}
            <span
              on:click={() => onVote(item._id, i)}
              class="unvoted vote-box"
              title={`add a vote for the phrase "${item.content}"`}>□</span>
          {/if}
          <span class="vote-number">{item.votes}</span>
          <div class="item-content">{item.content}</div>
        </div>
      {/each}
    </div>
  </main>
  <nav>
    <RankFooter
      nextFunc={json.nextPage ? () => goto(`/${type}/?page=${num + 1}`) : null}
      prevFunc={num > 0 ? () => goto(`/${type}/?page=${num - 1}`) : null}
      randomFunc={() => goto(`${type}/random`)} />
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
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    height: 510px;
    align-items: flex-start;
    align-content: flex-start;
  }
  .item {
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin: 10px;
    min-height: 30px;
  }

  .first {
    font-size: 1.65rem;
    margin: 20px 10px;
  }

  /* .item-vote {
    margin-right: 25px;
    min-width: 80px;
  } */

  .item-content {
    align-self: flex-end;
  }

  .selected {
    color: #79b95c;
  }

  .selected.overused-selected {
    color: #d35b5b;
  }

  .vote-number {
    font-size: 12px;
    line-height: 26px;
    width: 70px;
  }

  .vote-box {
    cursor: pointer;
    font-family: monospace;
    font-size: 26px;
    text-align: center;
    width: 40px;
    margin-right: 15px;
  }
</style>
