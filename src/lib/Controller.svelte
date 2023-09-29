<script>

  import dayjs from 'dayjs';

  import Flatpickr from 'svelte-flatpickr';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

  export let store;

  let value, formattedValue;

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

PICK DATE: <Flatpickr {options} bind:value bind:formattedValue name="date" />

DATE START IS {dayjs(value).startOf('day').unix()} AND END IS {dayjs(value).endOf('day').unix()}

<button on:click={() => value = "2023-08-04T04:00:00.000Z"}>button</button>
