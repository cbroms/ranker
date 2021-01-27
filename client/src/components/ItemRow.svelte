<script>
  import { voted } from "../stores/voted";

  export let item;
  export let i;
  export let type;
  export let onVote;
  export let onUnvote;
  export let pageNum = 0;

  export let includeVotes = false;

  const handleClick = () => {
    if ($voted.includes(item._id)) {
      onUnvote(item._id, i);
    } else {
      onVote(item._id, i);
    }
  };
</script>

<div
  on:click={handleClick}
  class="item-row"
  class:selected={$voted.includes(item._id)}
  class:overused={type === "overused"}
  class:first={i === 0 && pageNum === 0 && includeVotes}>
  {#if $voted.includes(item._id)}
    <span
      class="voted vote-box"
      title={`remove your vote for the phrase "${item.content}"`}>▣</span>
  {:else}
    <span
      class="unvoted vote-box"
      title={`add a vote for the phrase "${item.content}"`}>□</span>
  {/if}
  <span
    class="vote-number"
    title={includeVotes
      ? `${item.votes} vote${item.votes === 1 ? "" : "s"}`
      : null}>
    {#if includeVotes}
      {i + 1 + pageNum * 10}
    {/if}
  </span>
  <div class="item-content">{item.content}</div>
</div>

<style>
  .item-row {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin: 5px 10px;
    min-height: 30px;
    cursor: pointer;
  }

  .item-row:hover {
    background-color: #79b95c21;
  }

  .item-row.overused:hover {
    background-color: #d35b5b21;
  }

  .first {
    font-size: 1.65rem;
    margin: 20px 10px;
  }

  .item-content {
    line-height: 26px;
    min-height: 30px;
  }

  .selected {
    color: #79b95c;
    background-color: #79b95c21;
  }

  .selected.overused {
    color: #d35b5b;
    background-color: #d35b5b21;
  }

  .vote-number {
    font-size: 12px;
    line-height: 26px;
    min-width: 40px;
  }

  .vote-box {
    font-family: monospace;
    font-size: 26px;
    line-height: 22px;
    text-align: center;
    min-width: 30px;
    margin-right: 15px;
  }
</style>
