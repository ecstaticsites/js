<script>

  import dayjs from 'dayjs';

  import Flatpickr from 'svelte-flatpickr';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

  export let store;

  // todo, this causes 2 queries to be issued at page load

  let value = dayjs().toDate();

  let months = false;

  $: period = months ? "month" : "day";

  let options = {
    //"dateFormat": "U",
    "onChange": function(selectedDates, dateStr) {
      store.update((params) => {
        params["start"] = dayjs(selectedDates[0]).startOf(period).unix();
        params["end"] = dayjs(selectedDates[0]).endOf(period).unix();
        console.log(params);
        return params;
      });
    },
  };

  let monthOptions = {
    //"dateFormat": "U",
    "onChange": function(selectedDates, dateStr) {
      store.update((params) => {
        params["start"] = dayjs(selectedDates[0]).startOf(period).unix();
        params["end"] = dayjs(selectedDates[0]).endOf(period).unix();
        console.log(params);
        return params;
      });
    },
    "plugins": [
      new monthSelectPlugin({
        shorthand: true, //defaults to false
        dateFormat: "m.y", //defaults to "F Y"
        altFormat: "F Y", //defaults to "F Y"
        theme: "dark" // defaults to "light"
      })
    ]
  };

</script>

<div class="flex items-center">
  <div class="m-2 bg-blue-200 cursor-pointer" on:click={() => value = dayjs(value).subtract(1, period).toDate()}>
    ⬅️
  </div>
  {#if months}
  <div class="m-2 bg-blue-200">
    <Flatpickr options={monthOptions} bind:value />
  </div>
  {:else}
  <div class="m-2 bg-blue-200">
    <Flatpickr options={options} bind:value />
  </div>
  {/if}
  <div class="m-2 bg-blue-200 cursor-pointer" on:click={() => value = dayjs(value).add(1, period).toDate()}>
    ➡️
  </div>
</div>

<div class="flex items-center">
  MONTHS: <input type="checkbox" bind:checked={months} />
</div>
