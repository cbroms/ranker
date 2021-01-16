<script>
  import { goto } from "@sapper/app";

  import { voted } from "../stores/voted";
  import { post } from "../api/remote";

  import Panel from "./Panel.svelte";
  import RankHeader from "./RankHeader.svelte";
  import RankFooter from "./RankFooter.svelte";

  export let type;
  export let json;
  export let num;
  export let api;

  const onVote = async (which) => {
    await post(`${api}/vote?rankType=${type}`, { id: which });
    voted.addVote(which);
  };

  const onUnvote = async (which) => {
    await post(`${api}/unvote?rankType=${type}`, { id: which });
    voted.removeVote(which);
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
      {#each json.items as item, i}
        <div
          class="item"
          class:selected={$voted.includes(item._id)}
          class:overused-selected={type === "overused"}
          class:first={i === 0 && num === 0}>
          <div class="item-vote">
            {#if $voted.includes(item._id)}
              <span
                on:click={() => onUnvote(item._id)}
                class="voted vote-box"
                title={`remove your vote for the phrase "${item.content}"`}
                >✓</span>
            {:else}
              <span
                on:click={() => onVote(item._id)}
                class="unvoted vote-box"
                title={`add a vote for the phrase "${item.content}"`} />
            {/if}
          </div>
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
    width: 100%;
    margin: 10px;
  }

  .first {
    font-size: 1.65rem;
    margin: 20px 10px;
  }

  .item-vote {
    cursor: pointer;
    margin-right: 50px;
    width: 23px;
  }

  .selected {
    color: #79b95c;
  }

  .selected.overused-selected {
    color: #d35b5b;
  }

  .vote-box {
    box-sizing: border-box;
    border: 1px solid;
    width: 23px;
    height: 23px;
    display: inline-block;
  }

  .voted {
    line-height: 24px;
    font-family: monospace;
    font-size: 40px;
  }
</style>
