<script>

  import { influxToBillboard, randomInt } from "./util.js";

  import { onMount } from 'svelte';

  import bb, { bar, areaSpline } from 'billboard.js';
  import dayjs from 'dayjs';

  import Supabase from './supabase.js';

  export let groupby;
  // a store which contains hostname and timespan for query
  export let params;

  let chart;
  let chartId = `chart-${randomInt(10000)}`;

  let loading = false;

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_API_SERVER_URL;
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  onMount(() => {

    params.subscribe(async (p) => {

      loading = true;

      let jwt = await supa.GetAccessToken();

      console.log(`p is ${p}`)

      let timespanIsDay = (p.end - p.start <= 86400) ? true : false;

      let query = `site=${p.siteid}&groupby=${groupby}&start=${p.start}&end=${p.end}&bots=${p.bots}&tz=${encodeURIComponent(tz)}`
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

      let bbResponse = influxToBillboard(json);

      console.log(bbResponse);

      chart = bb.generate({
        "bindto": `#${chartId}`,
        "data": {
          "x" : "x",
          "columns": bbResponse,
          "groups": [bbResponse.map(x => x[0])],
          "type": bar(),
        },
        "axis": {
          "x": {
            "type": "timeseries",
            "tick": {
              "format": (s) => dayjs.unix(s).format(timespanIsDay ? 'H:mm' : 'MMM D'),
            }
          }
        },
        "legend": {
          "show": true,
        },
      });

      loading = false;
    });
  });

</script>

<div class="w-full h-full flex flex-col mt-4">
  <div class="grid w-full grow">
    {#if loading}
    <div class="flex justify-center items-center overlay h-96 w-full bg-opacity-50 backdrop-blur z-10">
      <div role="status">
        <svg aria-hidden="true" class="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
        </svg>
      </div>
    </div>
    {/if}
    <div class="content h-96 w-full z-0" id={chartId}></div>
  </div>
</div>

<style>
.content, .overlay {
  grid-area: 1 / 1;
}
</style>
