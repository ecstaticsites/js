<script>
  import Sidebar from '../lib/Sidebar.svelte';
  import SiteRow from '../lib/SiteRow.svelte';

  import {slide} from 'svelte/transition';

  import { theme } from "../lib/usersettings.js";

  import Supabase from '../lib/supabase.js';

  let supa = new Supabase();

  let sitesPromise = supa.GetSites();
</script>

<main class="w-screen h-screen flex bg-{theme}-0">
  <div class="h-full w-80">
    <Sidebar siteid={""} nickname={""} selected={"sites"}/>
  </div>
  <div class="h-full w-full">
    <div class="w-full h-full flex justify-center bg-white shadow-xl rounded-sm">
      <div class="w-[768px] py-8 flex flex-col justify-start">
      {#await sitesPromise}
        ...THINKING...
      {:then sites}
        {#each sites as site}
          <SiteRow site={site} />
        {/each}
      {:catch err}
        ERROR OCCURRED: {err}
      {/await}
      </div>
    </div>
  </div>
</main>
