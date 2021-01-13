<script context="module">
    export async function preload(page, session) {
        // this is the results page that's been paginated, so we have a num parameter
        const num = page.query.page || 0
        const api = session.api

        // get that page's results
        const res = await this.fetch(`${api}/ranking/${num}`);

        if (res.status === 200) {
            const json = await res.json();
            return { json, api, num };
        }

        this.error(res.status);
    }
</script>

<script>
    import { goto } from "@sapper/app";
    import { onMount } from "svelte"

    import { voted } from "../../stores/voted"
    import { getVotedIds } from "../../api/local"
    import { post } from "../../api/remote"

    import Ranking from "../../components/Ranking.svelte"
    import RankHeader from "../../components/RankHeader.svelte"

    export let json;
    export let num;
    export let api;

    onMount(() => {
        // get the list of ids we've voted up 
        voted.addIds(getVotedIds(json.items))
    })


    const onVote = async (which) => {
        voted.addVote(which)
        post(`${api}/vote`, { id: which });
    };

    const onUnvote = async (which) => {
        voted.removeVote(which)
        post(`${api}/unvote`, { id: which });
    }
</script>

<svelte:head>
    <title>Index</title>
</svelte:head>

<Ranking>
    <span slot="header">
        <RankHeader addFunc={() => goto("/underused/add/")}/>
    </span>
    <span slot="ranking">
        {#each json.items as item}
            <div>
                {#if $voted.includes(item._id)}
                <span on:click={() => onUnvote(item._id)}>▲</span>
                {:else}
                <span on:click={() => onVote(item._id)}>△</span>
                {/if}
             {item.content}
            </div>
        {/each}
    </span>
    <span slot="footer">
        <button on:click={() => goto(`/underused/?page=${parseInt(num) + 1}`)}>Next Page</button>
    </span>
</Ranking>
