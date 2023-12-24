<script>

  import dayjs from 'dayjs';

  import relativeTime from "dayjs/esm/plugin/relativeTime";

  import { theme } from "../lib/usersettings.js";

  import { push } from 'svelte-spa-router';

  // WORKS IN DEV, BREAKS IN PROD??
  dayjs.extend(relativeTime);

  // dict representing supabase SITE row -- id, nickname, created, updated
  export let site;

  let relative = dayjs(site["last_updated_at"]).fromNow();

</script>

<div class="w-full h-12 mt-2 bg-{theme}-1 rounded hover:shadow-md grid grid-cols-3 px-4">
  <div class="flex justify-start items-center">
    📍 {site["nickname"]}
  </div>
  <div class="flex justify-center items-center">
    ⏱ {relative}
  </div>
  <div class="flex justify-end items-center">
    <div class="w-2 h-2 flex justify-center items-center ml-2 p-3">⬆️</div>
    <div class="w-2 h-2 flex justify-center items-center ml-2 p-3">
      <div on:click={() => push(`/site/${site["id"]}/overview`)}>📊</div>
    </div>
    <div class="w-2 h-2 flex justify-center items-center ml-2 p-3">⚙️</div>
  </div>
</div>
