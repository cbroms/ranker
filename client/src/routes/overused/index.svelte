<script context="module">
  export async function preload(page, session) {
    // this is the results page that's been paginated, so we have a num parameter
    const pageNum = parseInt(page.query.page || 0);
    const api = session.api;

    // get that page's results
    const res = await this.fetch(`${api}/ranking/${pageNum}?rankType=overused`);

    if (res.status === 200) {
      const json = await res.json();
      return { json, api, pageNum };
    }

    this.error(res.status, res.statusText);
  }
</script>

<script>
  import { onMount, afterUpdate } from "svelte";

  import { voted } from "../../stores/voted";
  import { getVotedIds } from "../../api/local";

  import Ranking from "../../components/Ranking.svelte";

  export let json;
  export let pageNum;
  export let api;
  export let lastItems = null;

  onMount(() => {
    // get the list of ids we've voted up
    voted.addIds(getVotedIds(json.items));
    lastItems = json.items;
  });

  afterUpdate(() => {
    if (JSON.stringify(json.items) !== JSON.stringify(lastItems)) {
      voted.addIds(getVotedIds(json.items));
      lastItems = json.items;
    }
  });
</script>

<svelte:head>
  <title>Overused</title>
</svelte:head>

<Ranking type="overused" {json} {pageNum} {api} />
