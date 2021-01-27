<script context="module">
  export async function preload(page, session) {
    const api = session.api;
    const res = await this.fetch(`${api}/sample?rankType=underused`);

    if (res.status === 200) {
      const json = await res.json();
      return { json, api };
    }

    this.error(res.status, res.statusText);
  }
</script>

<script>
  import { onMount } from "svelte";

  import { voted } from "../../stores/voted";
  import { getVotedIds } from "../../api/local";

  import Random from "../../components/Random.svelte";

  export let json;
  export let api;

  onMount(() => {
    voted.addIds(getVotedIds(json.items));
  });
</script>

<svelte:head>
  <title>Random</title>
</svelte:head>

<Random type="underused" {json} {api} />
