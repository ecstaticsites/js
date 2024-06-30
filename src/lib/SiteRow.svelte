<script>

  import dayjs from 'dayjs';

  import relativeTime from "dayjs/esm/plugin/relativeTime";

  import { push } from 'svelte-spa-router';

  import Icon from './Icon.svelte';

  // WORKS IN DEV, BREAKS IN PROD??
  dayjs.extend(relativeTime);

  // dict representing supabase SITE row -- id, nickname, created, updated, color
  export let site;

  let relative = dayjs(site["last_updated_at"]).fromNow();

</script>

<button class="w-full h-36 bg-{site["color"]}-0 rounded hover:shadow-md hover:bg-{site["color"]}-1 active:bg-{site["color"]}-2 outline outline-1 outline-{site["color"]}-10 p-4 cursor-pointer" on:click={() => push(`/site/${site["id"]}/overview`)}>
  <div class="h-full flex flex-col items-start justify-between">
    <div class="flex flex-row items-start justify-start">
      <b class="text-left">{site["nickname"]}</b>
    </div>
    <div class="w-full flex flex-col items-start text-sm">
      <div class="w-full flex flex-row items-center justify-between">
        <span>Deployed:</span>
        <span>{relative}</span>
      </div>
      <div class="w-full flex flex-row items-center justify-between">
        <span>Commit Hash:</span>
        {#if (site["deployed_sha"] && site["github_repo"])}
        <span><a href={`${site["github_repo"]}/commit/${site["deployed_sha"]}`} target="_blank">{site["deployed_sha"].substring(0, 7)}</a></span>
        {:else if site["deployed_sha"]}
        <span>{site["deployed_sha"].substring(0, 7)}</span>
        {:else}
        <span>(none)</span>
        {/if}
      </div>
    </div>
  </div>
</button>
