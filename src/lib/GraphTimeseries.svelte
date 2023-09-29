<script>
  import { onMount } from 'svelte';

  import bb, { bar } from 'billboard.js';
  import dayjs from 'dayjs';

  import { randomInt } from './util.js';

  export let store;

  let chart;
  let chartId = `chart-${randomInt(10000)}`;

  onMount(() => {

    // set up the billboard chart
    chart = bb.generate({
      "bindto": `#${chartId}`,
      "data": {
        "x" : "x",
        "columns": [],
        "type": bar(),
      },
      "axis": {
        "x": {
          "type": "timeseries",
          "tick": {
            "format": (s) => dayjs.unix(s).format('h A'),
            // "culling": {
            //   "max": 0,
            // }
          }
        }
      },
      "legend": {
        "show": false,
      },
    });

    // subscribe to the store so whenever there IS data, we get it
    store.subscribe((value) => {
      chart.unload({
        "done": () => {
          chart.groups([value.map(x => x[0])]);
          chart.load({"columns": value});
        }
      });
    });
  });

</script>

<div class="h-full w-full" id={chartId}></div>
