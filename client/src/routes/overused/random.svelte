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
  import Random from "../../components/Random.svelte";

  export let json;
  export let api;
</script>

<svelte:head>
  <title>Random</title>
</svelte:head>

<Random type="overused" {json} {api} />
