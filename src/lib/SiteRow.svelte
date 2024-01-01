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

<div class="w-full h-12 mt-2 bg-{theme}-1 rounded hover:shadow-md px-4">
  <div class="h-full flex items-center justify-between">
    <div class="cursor-pointer" on:click={() => push(`/site/${site["id"]}/overview`)}>
      <b>{site["nickname"]}</b>
    </div>
    <div>
      <span>{relative}</span>
      <span>/cdot</span>
      {#if (site["deployed_sha"] && site["github_repo"])}
      <a href={`${site["github_repo"]}/commit/${site["deployed_sha"]}`} target="_blank">{site["deployed_sha"].substring(0, 7)}</a>
      {:else if site["deployed_sha"]}
      <span>{site["deployed_sha"].substring(0, 7)}</span>
      {:else}
      <span>(never deployed)</span>
      {/if}
    </div>
  </div>
</div>
