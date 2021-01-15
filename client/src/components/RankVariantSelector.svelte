<script>
  import { goto } from "@sapper/app";

  export let overused = false;

  const options = [
    { text: "too much", id: 1 },
    { text: "too little", id: 2 },
  ];

  let selected;

  const changedValue = () => {
    if (selected.id === 1) {
      goto("/overused/");
    } else {
      goto("/underused/");
    }
  };
</script>

<select bind:value={selected} on:change={changedValue} on:blur={changedValue}>
  {#each options as option}
    <option
      value={option}
      selected={(option.id === 1 && overused) ||
        (option.id === 2 && !overused)}>
      {option.text}
    </option>
  {/each}
</select>

<style>
  select {
    font-size: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    padding-right: 1.5rem;
  }
</style>
