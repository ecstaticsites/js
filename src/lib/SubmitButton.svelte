<script>

  import { theme } from "../lib/usersettings.js";

</script>

<button class="bg-{theme}-10 hover:bg-{theme}-11 active:bg-{theme}-12 text-white font-bold py-2 px-4 rounded" type="submit">
  <slot>Button Text</slot>
</button>
