<script>

  import { theme } from "./usersettings.js";

  export let label;
  export let value = "";
  export let error = false;
  export let readonly = false;

</script>

<label class="block text-gray-8 font-bold mb-2" for="inpoot">
  {label}
</label>
<input readonly={readonly} class="shadow border focus:outline focus:outline-2 focus:outline-{theme}-3 {error ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-8" id="inpoot" type="text" bind:value={value}>
