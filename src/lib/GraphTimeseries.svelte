<script>
  import { onMount } from 'svelte';

  import c3 from 'c3';
  import dayjs from 'dayjs';

  import { randomInt } from './util.js';

  export let store;

  let chart;
  let chartId = `chart-${randomInt(10000)}`;

  onMount(() => {

    // set up the c3 chart
    chart = c3.generate({
      "bindto": `#${chartId}`,
      "data": {
        "x" : "x",
        "columns": [],
        "type": "area-spline",
      },
      "axis": {
        "x": {
          "type": "timeseries",
          "tick": {
            "format": (s) => dayjs.unix(s).format('MMM D'),
            "culling": {
              "max": 0,
            }
          }
        }
      },
      "legend": {
        "show": false,
      },
    });

    // subscribe to the store so whenever there IS data, we get it
    store.subscribe((value) => {
      chart.load({
        "columns": value,
        "unload": true,
      });
    });
  });

</script>

<div class="h-full w-full" id={chartId}></div>
