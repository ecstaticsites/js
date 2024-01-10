<script>

  // todo, this all causes 3 queries to be issued at page load!

  import dayjs from 'dayjs';

  import Flatpickr from 'svelte-flatpickr';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

  import Supabase from './supabase.js';

  import ControllerButton from './ControllerButton.svelte';

  export let store;

  let dayOptions = {
    "dateFormat": "F j, Y",
  };

  let monthOptions = {
    "dateFormat": "F Y",
    "plugins": [
      new monthSelectPlugin({
        //shorthand: true, //defaults to false
        dateFormat: "F Y", //defaults to "F Y"
        //theme: "dark" // defaults to "light"
      })
    ]
  };

  let value = dayjs().toDate();
  let months = false;
  let bots = false;
  let period = 'day';

  // reactivity is below! Runs the following whenever any of the above are updated
  // (value is updated by the `bind` with the flatpickr and l/r buttons, months and
  // bots by the two controller buttons)
  $: {
    console.log(`Controller triggered update, ${value} ${months} ${bots}`)
    period = months ? "month" : "day";
    store.update((params) => {
      //params["hostname"] = selectedHostname;
      params["start"] = dayjs(value).startOf(period).unix();
      params["end"] = dayjs(value).endOf(period).unix();
      params["bots"] = bots;
      return params;
    });
  }

</script>

<div class="flex justify-between items-center">
  <div class="flex items-center">
    <div class="mr-2">
      <ControllerButton text="View Month" icon="calendar-days" bind:pressed={months} action={() => months = !months}/>
    </div>
    <div class="mr-2">
      <ControllerButton text="Include Bot Requests" icon="cpu-chip" bind:pressed={bots} action={() => bots = !bots}/>
    </div>
  </div>
  <div class="flex items-center">
    <div class="mr-2">
      <ControllerButton icon="arrow-left" action={() => value = dayjs(value).subtract(1, period).toDate()}/>
    </div>
    <div class="border rounded-md cursor-pointer select-none px-2 py-1 mr-2">
      <div class:hidden={!months}>
        <Flatpickr options={monthOptions} bind:value />
      </div>
      <div class:hidden={months}>
        <Flatpickr options={dayOptions} bind:value />
      </div>
    </div>
    <div>
      <ControllerButton icon="arrow-right" action={() => value = dayjs(value).add(1, period).toDate()}/>
    </div>
  </div>
</div>
