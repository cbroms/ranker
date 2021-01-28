<script context="module">
  export async function preload(page, session) {
    const api = session.api;
    const res = await this.fetch(`${api}/sample?rankType=overused`);

    if (res.status === 200) {
      const json = await res.json();
      return { json, api };
    }

    this.error(res.status, res.statusText);
  }
</script>

<script>
  import Random from "../components/Random.svelte";

  export let json;
  export let api;
</script>

<svelte:head>
  <link rel="canonical" href="https://phraseranker.com/" />
  <title>Vote on Overused Phrases — PhraseRanker Pro</title>
  <meta name="title" content="Vote on Overused Phrases — PhraseRanker Pro" />
  <meta
    name="description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://phraseranker.com/" />
  <meta
    property="og:title"
    content="Vote on Overused Phrases — PhraseRanker Pro" />
  <meta
    property="og:description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />
  <meta property="og:image" content="https://phraseranker.com/cover.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://phraseranker.com/" />
  <meta
    property="twitter:title"
    content="Vote on Overused Phrases — PhraseRanker Pro" />
  <meta
    property="twitter:description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />
  <meta property="twitter:image" content="https://phraseranker.com/cover.png" />
</svelte:head>

<Random type="overused" {json} {api} redirect />
