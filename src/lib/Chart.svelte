<script>

  // This is the graph PLUS mechanisms to feed it data etc

  import { writable, derived, get } from "svelte/store";
  import { influxToBillboard } from "./util.js";

  import GraphCategorical from "./GraphCategorical.svelte";
  import GraphTimeseries from "./GraphTimeseries.svelte";

  import Supabase from './supabase.js'

  import { currentSite } from './global.js';

  export let title;
  export let groupby;
  export let timeseries;
  export let params;

  let rawResult = writable([]);
  let bbResult = derived(rawResult, ($res) => influxToBillboard($res, timeseries));

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_API_SERVER_URL;
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // this should maybe be $: {}, since we'll want it to run reactively when
  // the hostname prop is updated from outside this component
  // but I should look up how this works since I want to scope reactivity as small as possible

  params.subscribe(async (p) => {
    let jwt = await supa.GetAccessToken();

    console.log(`p is ${p}`)

    let query = `site=${p.siteid}&groupby=${groupby}&start=${p.start}&end=${p.end}&tz=${encodeURIComponent(tz)}`
    let url = `${apiHost}/query?${query}`

    console.log(url)

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      credentials: "include",
    });

    let json = await response.json();

    console.log(json);

    rawResult.set(json);
  })

</script>

<div class="w-full h-full flex flex-col">
  <div class="w-full h-16 pt-4 pl-4">
    <button class="text-xl">{title}</button>
  </div>
  <div class="w-full grow">
    {#if timeseries}
    <GraphTimeseries store={bbResult}/>
    {:else}
    <GraphCategorical store={bbResult}/>
    {/if}
  </div>
</div>
