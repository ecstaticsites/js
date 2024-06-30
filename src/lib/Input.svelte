<script>

  import { SITELESS_COLOR } from "./const.js";

  export let label;
  export let value = "";
  export let type = "text";
  export let error = false;
  export let readonly = false;
  export let placeholder = "";
  // the accent color to use, it's part of the SITE row
  export let color = SITELESS_COLOR;

</script>

<div class="mb-3">
  <label class="block text-gray-8 text-sm font-bold mb-2" for="inpoot">
    {label}
  </label>
  {#if type === "password"}
  <input type="password" readonly={readonly} class="shadow border focus:outline focus:outline-2 focus:outline-{color}-2 {error ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-10" id="inpoot" placeholder={placeholder} bind:value={value}>
  {:else if type === "text"}
  <input type="test" readonly={readonly} class="shadow border focus:outline focus:outline-2 focus:outline-{color}-2 {error ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-10" id="inpoot" placeholder={placeholder} bind:value={value}>
  {/if}
</div>
