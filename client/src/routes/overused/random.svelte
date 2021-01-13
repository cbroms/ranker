<script context="module">
    export async function preload(page, session) {

        const redir  = page.query.redir === "true"
        const api = session.api;
        const res = await this.fetch(`${api}/sample`);

        if (res.status === 200) {
            const json = await res.json();
            return { json, api, redir };
        }

        this.error(json.status);
    }
</script>

<script>
    import { goto } from "@sapper/app"

    import { post } from "../../api/remote"
    import { voted } from "../../stores/voted"

    export let json;
    export let api;
    export let redir;

    const onClick = async (which) => {
        voted.addVote(which)
        await post(`${api}/vote`, {id: which});

        if (redir)
            goto("/overused/")
        else 
            window.location.reload()
    }   
</script>

<svelte:head>
    <title>Overused Random</title>
</svelte:head>

<div>
    <h1>Which?</h1>
    <button on:click={() => onClick(json.thing1._id)}>{json.thing1.content}</button>
    <button on:click={() => onClick(json.thing2._id)}>{json.thing2.content}</button>
</div>
