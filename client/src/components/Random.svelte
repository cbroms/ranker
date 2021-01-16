<script>
  import { goto } from "@sapper/app";

  import { post } from "../api/remote";
  import { voted } from "../stores/voted";

  import Panel from "./Panel.svelte";

  export let type;
  export let json;
  export let api;
  export let redirect = false;

  const handleComplete = () => {
    if (redirect) goto(`${type}`);
    else window.location.reload();
  };

  const onClick = async (which) => {
    voted.addVote(which);
    await post(`${api}/vote?rankType=${type}`, { id: which });
    handleComplete();
  };

  const onNeither = async () => {
    handleComplete();
  };

  const onBoth = async () => {
    voted.addVote(json.thing1._id);
    voted.addVote(json.thing2._id);
    await post(`${api}/vote?rankType=${type}`, { id: json.thing1._id });
    await post(`${api}/vote?rankType=${type}`, { id: json.thing2._id });
    handleComplete();
  };
</script>

<Panel>
  <header class:overused={type === "overused"}>
    <h1>
      Which phrase do you hear too {type === "overused" ? "much" : "little"}?
    </h1>
  </header>

  <main>
    <div class="options">
      <div>
        <button on:click={() => onClick(json.thing1._id)}
          >{json.thing1.content}</button>
      </div>
      <div>
        <button on:click={() => onClick(json.thing2._id)}
          >{json.thing2.content}</button>
      </div>
    </div>

    <button on:click={onBoth}>Both</button>
    <button on:click={onNeither}>Neither</button>
  </main>
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
    grid-row: 2 / 4;
    border: 1px solid black;
    background-color: white;
    padding: 20px;
  }

  .options > div {
    margin-bottom: 15px;
  }

  main > button {
    margin-right: 15px;
  }

  .options {
    margin: 40px 0;
  }

  div > button {
    width: 100%;
    font-size: 1.5rem;
  }
</style>
