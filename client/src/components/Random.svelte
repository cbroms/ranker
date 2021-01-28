<script>
  import { post } from "../api/remote";
  import { voted } from "../stores/voted";

  import Panel from "./Panel.svelte";
  import ItemRow from "./ItemRow.svelte";

  export let type;
  export let json;
  export let api;

  const onVote = async (which, i) => {
    await post(`${api}/vote?rankType=${type}`, { id: which });
    voted.addVote(which);
  };

  const onUnvote = async (which, i) => {
    await post(`${api}/unvote?rankType=${type}`, { id: which });
    voted.removeVote(which);
  };
</script>

<Panel>
  <header class:overused={type === "overused"}>
    <h1>
      Which phrases do you hear too {type === "overused" ? "much" : "little"}?
    </h1>
  </header>

  <main>
    <div class="options">
      {#each json.items as item, i (item._id)}
        <div class="item">
          <ItemRow {item} {i} {type} {onVote} {onUnvote} />
        </div>
      {/each}
    </div>
  </main>
  <nav>
    <a href="/{type}/"> <button class="primary">Continue to ranking</button></a>
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

  .options > div {
    margin-bottom: 15px;
  }

  .options {
    margin: 40px 0;
  }

  nav {
    grid-column: 1 / 1;
    grid-row: 3 / 4;
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    border-top: none;
    border-bottom: none;
    display: flex;
    justify-content: flex-end;
  }
</style>
