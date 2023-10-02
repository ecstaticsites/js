<script>

  import { influxToBillboard, randomInt } from "./util.js";

  import { onMount } from 'svelte';

  import bb, { bar, areaSpline } from 'billboard.js';
  import dayjs from 'dayjs';

  import Supabase from './supabase.js'

  export let title;
  export let groupby;
  export let params;

  let chart;
  let chartId = `chart-${randomInt(10000)}`;

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_API_SERVER_URL;
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  onMount(() => {

    // set up the billboard chart


    params.subscribe(async (p) => {
      let jwt = await supa.GetAccessToken();

      console.log(`p is ${p}`)

      let timespanIsDay = (p.end - p.start <= 86400) ? true : false;

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

      let bbResponse = influxToBillboard(json);

      console.log(bbResponse);

      chart = bb.generate({
        "bindto": `#${chartId}`,
        "data": {
          "x" : "x",
          "columns": bbResponse,
          "groups": [bbResponse.map(x => x[0])],
          "type": areaSpline(),
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
        "spline": {
          "interpolation": {
            "type": "natural",
          },
        },
      });
    });
  });

</script>

<div class="w-full h-full flex flex-col">
  <div class="w-full h-16 pt-4 pl-4">
    <button class="text-xl">{title}</button>
  </div>
  <div class="w-full grow">
    <div class="h-full w-full" id={chartId}></div>
  </div>
</div>
