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
  <link rel="canonical" href="https://phraseranker.com/underused/random/" />
  <title>Vote on Underused Phrases — PhraseRanker Pro</title>
  <meta name="title" content="Vote on Underused Phrases — PhraseRanker Pro" />
  <meta
    name="description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />

  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://phraseranker.com/underused/random/" />
  <meta
    property="og:title"
    content="Vote on Underused Phrases — PhraseRanker Pro" />
  <meta
    property="og:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="og:image" content="https://phraseranker.com/cover.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:url"
    content="https://phraseranker.com/underused/random/" />
  <meta
    property="twitter:title"
    content="Vote on Underused Phrases — PhraseRanker Pro" />
  <meta
    property="twitter:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="twitter:image" content="https://phraseranker.com/cover.png" />
</svelte:head>

<Random type="underused" {json} {api} />
