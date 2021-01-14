<script>
    export let nextFunc = () => {};
    export let prevFunc = null;
    export let randomFunc = () => {};
</script>

<span class="footer">
    {#if prevFunc !== null}
    <button on:click="{prevFunc}">&larr; Prev page</button>
    {:else}
    <span />
    {/if}
    <span>
        <button on:click="{randomFunc}">Random</button>
        <button on:click="{nextFunc}">Next page &rarr;</button>
    </span>
</span>

<style>
    .footer {
        display: flex;
        justify-content: space-between;
    }
</style>
