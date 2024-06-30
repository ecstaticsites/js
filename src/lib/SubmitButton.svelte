<script>

  import { SITELESS_COLOR } from "../lib/const.js";

  // used so clients can disable the button while a req is in flight
  export let thinking;
  // the accent color to use, it's part of the SITE row
  export let color = SITELESS_COLOR;

</script>

<button class="bg-{color}-10 {thinking ? `cursor-not-allowed` : `hover:bg-${color}-11 active:bg-${color}-12`} text-white font-bold py-2 px-4 rounded" type="submit" disabled={thinking}>
  <div class="grid w-full grow">
  {#if thinking}
    <div class="flex justify-center items-center overlay h-full w-full bg-{color}-10 z-10">
      <div role="status">
        <svg aria-hidden="true" class="w-6 h-6 animate-spin fill-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
        </svg>
      </div>
    </div>
  {/if}
  <div class="content">
    <slot>Button Text</slot>
  </div>
  </div>
</button>

<style>
.content, .overlay {
  grid-area: 1 / 1;
}
</style>
