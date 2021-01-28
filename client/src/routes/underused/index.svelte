<script context="module">
  export async function preload(page, session) {
    // this is the results page that's been paginated, so we have a num parameter
    const pageNum = parseInt(page.query.page || 0);
    const api = session.api;

    // get that page's results
    const res = await this.fetch(
      `${api}/ranking/${pageNum}?rankType=underused`
    );

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
  <link rel="canonical" href="https://phraseranker.com/underused/" />
  <title>Underused Phrases Ranking — PhraseRanker Pro</title>
  <meta name="title" content="Underused Phrases Ranking — PhraseRanker Pro" />
  <meta
    name="description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://phraseranker.com/underused/" />
  <meta
    property="og:title"
    content="Underused Phrases Ranking — PhraseRanker Pro" />
  <meta
    property="og:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="og:image" content="https://phraseranker.com/cover.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://phraseranker.com/underused/" />
  <meta
    property="twitter:title"
    content="Underused Phrases Ranking — PhraseRanker Pro" />
  <meta
    property="twitter:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="twitter:image" content="https://phraseranker.com/cover.png" />
</svelte:head>

<Ranking type="underused" {json} {pageNum} {api} />
