<script>

  import { push, querystring } from 'svelte-spa-router';

  import { theme } from "../lib/usersettings.js";

  import Page from '../lib/Page.svelte';

  let decoded = decodeURIComponent($querystring);
  let siteId = decoded.split("=")[1];

</script>

<Page title="Success" selected="create">
  <div class="h-full flex flex-col justify-between">
    <div>
      <div>You've created a new site with ID: <code>{siteId}</code>.</div>
      <div>You can visit it live at this link: <code>{siteId}.b-cdn.net</code>.</div>
      <div>The site currently has no content.</div>
      <div>To start publishing to this site, push to the remote: <code>https://git.cbnr.xyz/{siteId}</code>.</div>
      <div>For more information, check out <a href="#">the publishing docs</a>!</div>
    </div>
    <div class="flex flex-row justify-end">
      <button class="bg-{theme}-10 hover:bg-{theme}-11 active:bg-{theme}-12 text-white font-bold py-2 px-4 rounded" on:click={() => push("/sites")}>
        Back to Sites
      </button>
    </div>
  </div>
</Page>
