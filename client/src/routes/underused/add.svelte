<script context="module">
  export async function preload(page, session) {
    const api = session.api;
    return { api };
  }
</script>

<script>
  import Add from "../../components/Add.svelte";

  export let api;
</script>

<svelte:head>
  <link rel="canonical" href="https://phraseranker.com/underused/add/" />
  <title>Add an Underused Phrase — PhraseRanker Pro</title>
  <meta name="title" content="Add an Underused Phrase — PhraseRanker Pro" />
  <meta
    name="description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://phraseranker.com/underused/add/" />
  <meta
    property="og:title"
    content="Add an Underused Phrase — PhraseRanker Pro" />
  <meta
    property="og:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="og:image" content="https://phraseranker.com/cover.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:url"
    content="https://phraseranker.com/underused/add/" />
  <meta
    property="twitter:title"
    content="Add an Underused Phrase — PhraseRanker Pro" />
  <meta
    property="twitter:description"
    content="There are plenty of phrases we don't use much. Vote on the phrases you'd like to hear more often. Submit your own phrases to the ranking." />
  <meta property="twitter:image" content="https://phraseranker.com/cover.png" />
</svelte:head>

<Add type="underused" {api} />
