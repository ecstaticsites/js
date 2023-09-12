<script>

  // This is the graph PLUS mechanisms to feed it data etc

  import { writable, derived, get } from "svelte/store";
  import { influxToBillboard } from "./util.js";

  import GraphCategorical from "./GraphCategorical.svelte";
  import GraphTimeseries from "./GraphTimeseries.svelte";

  import Supabase from './supabase.js'

  import { currentSite } from './global.js';

  export let title;
  export let hostname;
  export let groupby;
  export let bucketby;

  let isTimeseries = (bucketby == "") ? false : true;

  let rawResult = writable([]);
  let bbResult = derived(rawResult, ($res) => influxToBillboard($res, isTimeseries));

  // this should maybe be $: {}, since we'll want it to run reactively when
  // the hostname prop is updated from outside this component
  // but I should look up how this works since I want to scope reactivity as small as possible
  async function update() {

    let supa = new Supabase();

    let { data, error } = await supa.client.auth.getSession();

    if (error) {
      throw new Error(`getSession returned error: ${error}`)
    }

    if (!data["session"]) {
      throw new Error("getSession returned no session, maybe not logged in?")
    }

    if (!data["session"]["access_token"]) {
      throw new Error("getSession returned no access token, maybe not logged in?")
    }

    let apiHost = import.meta.env.VITE_API_SERVER_URL;
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!get(currentSite)) {
      throw new Error("can't issue a query with no site")
    }

    let query = `site=${get(currentSite)}&groupby=${groupby}&bucketby=${bucketby}&tz=${encodeURIComponent(tz)}`
    let url = `${apiHost}/query?${query}`

    console.log(url)

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data["session"]["access_token"]}`
      },
      credentials: "include",
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
    <GraphTimeseries store={bbResult}/>
    {:else}
    <GraphCategorical store={bbResult}/>
    {/if}
  </div>
</div>
