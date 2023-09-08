<script>
  import { onMount } from 'svelte';

  import bb, { pie } from 'billboard.js';
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
        "type": pie(),
      },
      // "axis": {
      //   "x": {
      //     "type": 'category',
      //   },
      //   "rotated": true,
      // },
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
