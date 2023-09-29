<script>

  import dayjs from 'dayjs';

  import Flatpickr from 'svelte-flatpickr';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

  export let store;

  // todo, this causes 2 queries to be issued at page load

  let value = dayjs().toDate();

  let options = {
    //"dateFormat": "U",
    "onChange": function(selectedDates, dateStr) {
      store.update((params) => {
        params["start"] = dayjs(selectedDates[0]).startOf('day').unix();
        params["end"] = dayjs(selectedDates[0]).endOf('day').unix();
        console.log(params);
        return params;
      });
    },
    plugins: [
        // new monthSelectPlugin({
        //   shorthand: true, //defaults to false
        //   dateFormat: "m.y", //defaults to "F Y"
        //   altFormat: "F Y", //defaults to "F Y"
        //   theme: "dark" // defaults to "light"
        // })
    ]
};

</script>

<div class="flex items-center">
  <div class="m-2 bg-blue-200 cursor-pointer" on:click={() => value = dayjs(value).subtract(1, 'day').toDate()}>
    BACK ONE DAY
  </div>
  <div class="m-2 bg-blue-200">
    <Flatpickr {options} bind:value />
  </div>
  <div class="m-2 bg-blue-200 cursor-pointer" on:click={() => value = dayjs(value).add(1, 'day').toDate()}>
    FORWARD ONE DAY
  </div>
</div>
