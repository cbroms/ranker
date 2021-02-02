<script>
  import { goto } from "@sapper/app";

  import RankVariantSelector from "./RankVariantSelector.svelte";

  export let overused = false;
  export let addPage = "";

  const options = [
    { text: "too much", id: 1 },
    { text: "too little", id: 2 },
  ];

  const onChangedValue = (selected) => {
    if (selected.id === 1) {
      goto("/overused/");
    } else {
      goto("/underused/");
    }
  };
</script>

<span class="header">
  <h1>
    Phrases we hear <RankVariantSelector
      {options}
      {onChangedValue}
      selectedOption={overused ? 1 : 2} />
  </h1>
  <a href={addPage}>
    <button class:overused>+ Add a phrase</button>
  </a>
</span>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  button {
    border: 1px solid white;
    color: white;
  }

  .overused:hover {
    color: #d35b5b;
  }

  button:hover {
    color: #79b95c;
    background-color: white;
  }
</style>
