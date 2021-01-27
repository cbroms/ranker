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
      There are certain phrases we hear ad nauseum, and others that we just
      don't hear very much at all. PhraseRanker Pro is a webpage that collects
      these under and overused phrases from visitors and ranks them according to
      the number of votes each receives.
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
        href="mailto:webmaster@phraserankerpro.net"
        >webmaster@phraserankerpro.net</a>
    </p>
  </main>
</Panel>

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
</style>
