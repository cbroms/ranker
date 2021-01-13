<script>
    import { goto } from "@sapper/app";

    export let overused = false;

    const options = [
        { text: "hear too much", id: 1 },
        { text: "hear too little", id: 2 },
    ];

    let selected;

    const changedValue = () => {
        switch (selected.id) {
            case 1:
                goto("/ranking/overused/0/");
                break;
            case 2:
                goto("/ranking/underused/0/");
                break;
        }
    };
</script>

<select bind:value="{selected}" on:change="{changedValue}">
    {#each options as option}
    <option
        value="{option}"
        selected="{(option.id === 1 && overused) || (option.id === 2 && !overused)}"
    >
        {option.text}
    </option>
    {/each}
</select>
