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
  class:first={i === 0 && pageNum === 0 && includeVotes}
  title={`${
    $voted.includes(item._id) ? "remove" : "add"
  } a vote for the phrase "${item.content}"`}>
  {#if $voted.includes(item._id)}
    <span class="voted vote-box">▣</span>
  {:else}
    <span class="unvoted vote-box">□</span>
  {/if}
  <span
    class="vote-number"
    class:one={includeVotes && i + 1 + pageNum * 10 < 10}
    class:ten={includeVotes && i + 1 + pageNum * 10 < 100}
    class:hundred={includeVotes && i + 1 + pageNum * 10 < 100}
    title={includeVotes
      ? `${item.votes} vote${item.votes === 1 ? "" : "s"}`
      : null}>
    {#if includeVotes}
      #{i + 1 + pageNum * 10}
    {/if}
  </span>
  <div class="item-content">
    {item.content}
    <!-- <span class="item-vote-prompt">Vote</span> -->
  </div>
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

  /* .item-vote-prompt {
    position: absolute;
    right: 15px;
    font-size: 12px;
    display: none;
  }

  .item-row:hover .item-vote-prompt {
    display: inline-block;
  } */

  .item-content {
    line-height: 30px;
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
    font-size: 14px;
    line-height: 30px;
    min-width: 20px;
  }

  .one,
  .ten {
    min-width: 50px;
  }

  .hundred {
    min-width: 60px;
  }

  .vote-box {
    font-family: monospace;
    font-size: 26px;
    line-height: 26px;
    text-align: center;
    min-width: 30px;
    margin-right: 15px;
  }
</style>
