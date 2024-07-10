<script>

  import { randomInt } from "./util.js";
  import { renderBillboard } from './munging.js'

  import { onMount, onDestroy } from 'svelte';

  import bb, { bar, areaSpline } from 'billboard.js';
  import dayjs from 'dayjs';

  import Supabase from './supabase.js';

  // one of "timeseries", "donut", or "categorical"
  export let variety;
  export let groupby;
  // a store which contains hostname and timespan for query
  export let params;
  // the accent color to use, it's part of the SITE row
  export let color;

  let chart;
  let chartId = `chart-${randomInt(10000)}`;

  let loading = false;

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_QUERY_SERVER_URL;
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  onMount(() => {

    params.subscribe(async (p) => {

      if (p.hostname == "") {
        console.log("Hostname is not set yet, skipping chart update");
        return;
      }

      loading = true;

      let jwt = await supa.GetAccessToken();

      // categorical charts don't have time buckets, timeseries charts do
      let bucketby = "";
      if (variety == "timeseries") {
        bucketby = (p.end - p.start <= 86400) ? "hour" : "day";
      }

      let query = `hostname=${p.hostname}&groupby=${groupby}&bucketby=${bucketby}&start=${p.start}&end=${p.end}&bots=${p.bots}&tz=${encodeURIComponent(tz)}`
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

      let bbResponse = renderBillboard(chartId, variety, p.start, p.end, bucketby, json);

      console.log(bbResponse);

      chart = bb.generate(bbResponse);

      loading = false;
    });
  });

  onDestroy(() => {
    console.log('the chart is being destroyed');
    if (chart) {
      chart.destroy();
    }
  });

</script>

<div class="w-full h-full flex flex-col">
  <div class="grid w-full grow">
    {#if loading}
    <div class="flex justify-center items-center overlay h-[200px] w-full bg-opacity-50 backdrop-blur z-10">
      <div role="status">
        <svg aria-hidden="true" class="w-20 h-20 animate-spin fill-{color}-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
        </svg>
      </div>
    </div>
    {/if}
    <div class="content h-[200px] w-full z-0" id={chartId}></div>
  </div>
</div>

<style>
.content, .overlay {
  grid-area: 1 / 1;
}
</style>
