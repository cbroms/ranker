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

<Add type="underused" {api} />
