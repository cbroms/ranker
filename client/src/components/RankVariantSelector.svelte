<script>
  export let selectedOption;

  export let options;
  export let onChangedValue;

  let selected;
</script>

<select
  bind:value={selected}
  on:change={() => onChangedValue(selected)}
  on:blur={() => onChangedValue(selected)}>
  {#each options as option}
    <option
      value={option}
      selected={(option.id === 1 && selectedOption === 1) ||
        (option.id === 2 && selectedOption === 2)}>
      {option.text}
    </option>
  {/each}
</select>

<style>
  select {
    cursor: pointer;
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
