<script>
  import Panel from "../components/Panel.svelte";
</script>

<Panel>
  <header>
    <h1>Welcome to PhraseRanker Pro!</h1>
  </header>
  <main>
    <h2>What is PhraseRanker Pro?</h2>
    <p>
      There are certain phrases we hear <em>ad nauseum</em>, and others that we
      just don't hear very much at all. PhraseRanker Pro is a webpage that
      collects these under and overused phrases from visitors and ranks them
      according to the number of votes each receives.
    </p>
    <h2>How is PhraseRanker Pro Constructed?</h2>
    <p>
      It is built with JavaScript, specifically <a href="https://svelte.dev"
        >Svelte</a
      >, using the
      <a href="https://sapper.svelte.dev/">Sapper</a> application framework.
    </p>
    <p>
      PhraseRanker Pro is typeset in <a
        href="http://scootergraphics.com/virtue/index.html">Virtue</a
      >.
    </p>
    <h2>Other PhraseRanker Pro Queries</h2>
    <p>
      Questions? Concerns? Comments? Direct any correspondence to <a
        href="mailto:webmaster@phraseranker.com">webmaster@phraseranker.com</a>
    </p>
    <a href="/overused/"><button>Overused ranking</button></a>
    <a href="/underused"><button>Underused ranking</button></a>
  </main>
</Panel>

<svelte:head>
  <link rel="canonical" href="https://phraseranker.com/info/" />
  <title>PhraseRanker Pro</title>
  <meta name="title" content="PhraseRanker Pro" />
  <meta
    name="description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://phraseranker.com/info/" />
  <meta property="og:title" content="PhraseRanker Pro" />
  <meta
    property="og:description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />
  <meta property="og:image" content="https://phraseranker.com/cover.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://phraseranker.com/info/" />
  <meta property="twitter:title" content="PhraseRanker Pro" />
  <meta
    property="twitter:description"
    content="Sometimes there are phrases we all hear much too often. Vote on the phrases you're tired of hearing everyday. Submit your own phrases to the ranking." />
  <meta property="twitter:image" content="https://phraseranker.com/cover.png" />
</svelte:head>

<style>
  header {
    grid-column: 1 / 1;
    grid-row: 1 / 2;
    border: 1px solid black;
    border-bottom: none;
    background-color: white;
    padding: 20px;
    background-color: #3f3f3f;
    color: white;
  }

  main {
    grid-column: 1 / 1;
    grid-row: 2 / 4;
    border: 1px solid black;
    border-bottom: none;
    background-color: white;
    padding: 20px;
  }

  h2 {
    margin-top: 40px;
  }
</style>
