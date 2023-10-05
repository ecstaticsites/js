<script>

  import dayjs from 'dayjs';

  import Flatpickr from 'svelte-flatpickr';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

  import Supabase from './supabase.js';

  import ControllerButton from './ControllerButton.svelte';

  export let siteid;
  export let store;

  let supa = new Supabase();

  let aliases = supa.GetAliases(siteid);
  let defaultAlias = aliases.then((arr) => arr.find((e) => e["is_default"]))

  // todo, this causes 2 queries to be issued at page load

  let value = dayjs().toDate();

  let months = false;

  $: period = months ? "month" : "day";

  let options = {
    "dateFormat": "F j, Y",
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
        //shorthand: true, //defaults to false
        dateFormat: "F Y", //defaults to "F Y"
        //theme: "dark" // defaults to "light"
      })
    ]
  };

</script>

<div class="flex justify-between items-center mt-4 px-2">
  <div class="flex items-center">
    <div class="text-2xl border rounded-md cursor-pointer select-none px-2 mr-2">
      {#await defaultAlias}
      Loading...
      {:then alias}
      {alias["hostname"]}
      {/await}
    </div>
    <ControllerButton icon="calendar-days" bind:pressed={months} action={() => months = !months}/>
    <ControllerButton icon="cpu-chip"/>
  </div>
  <div class="flex items-center">
    <ControllerButton icon="arrow-left" action={() => value = dayjs(value).subtract(1, period).toDate()}/>
    {#if months}
    <div class="border rounded-md cursor-pointer select-none px-2 py-1 mr-2">
      <Flatpickr options={monthOptions} bind:value />
    </div>
    {:else}
    <div class="border rounded-md cursor-pointer select-none px-2 py-1 mr-2">
      <Flatpickr options={options} bind:value />
    </div>
    {/if}
    <ControllerButton icon="arrow-right" action={() => value = dayjs(value).add(1, period).toDate()}/>
  </div>
</div>

<style>

.flatpickr-input {
  width: 24rem;
}

</style>
