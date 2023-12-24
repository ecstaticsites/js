<script>

  import { push, querystring } from 'svelte-spa-router';

  import { theme } from "../lib/usersettings.js";

  import Sidebar from '../lib/Sidebar.svelte';

  let decoded = decodeURIComponent($querystring);
  let siteId = decoded.split("=")[1];

</script>

<main class="w-screen h-screen flex bg-{theme}-0">
  <div class="h-full w-80">
    <Sidebar siteid={""} nickname={""} selected={"create"}/>
  </div>
  <div class="h-full w-full">
    <div class="w-full h-full flex justify-center bg-white shadow-xl rounded-sm">
      <div class="w-[768px] py-8 flex flex-col justify-between">
        <div>
          <div class="text-4xl text-bold my-6">Success</div>
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
    </div>
  </div>
</main>
