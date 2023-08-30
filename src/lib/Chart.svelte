<script>

  // This is the graph PLUS mechanisms to feed it data etc

  import { writable, derived } from "svelte/store";
  import { influxToC3 } from "./util.js";

  import GraphCategorical from "./GraphCategorical.svelte";
  import GraphTimeseries from "./GraphTimeseries.svelte";

  export let title;
  export let groupby;
  export let bucketby;

  let isTimeseries = (bucketby == "") ? false : true;

  let rawResult = writable([]);
  let c3result = derived(rawResult, ($res) => influxToC3($res, isTimeseries));

  async function update() {

    let apiHost = import.meta.env.VITE_API_SERVER_URL;
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let query = `groupby=${groupby}&bucketby=${bucketby}&tz=${encodeURIComponent(tz)}`
    let url = `${apiHost}/query?${query}`

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    let json = await response.json();

    console.log(json);

    rawResult.set(json);
  }

</script>

<div class="w-full h-full flex flex-col">
  <div class="w-full h-16 pt-4 pl-4">
    <button class="text-xl" on:click={update}>{title}</button>
  </div>
  <div class="w-full grow">
    {#if isTimeseries}
    <GraphTimeseries store={c3result}/>
    {:else}
    <GraphCategorical store={c3result}/>
    {/if}
  </div>
</div>
