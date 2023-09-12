<script>
  import Navbar from '../lib/Navbar.svelte'
  import OverviewRow from '../lib/OverviewRow.svelte'

  import Supabase from '../lib/supabase.js'

  let supa = new Supabase();
</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-full flex justify-center">
    <div class="w-[768px]">
    {#await supa.GetSites()}
      ...THINKING...
    {:then sites}
      {#each sites as site}
        <OverviewRow site={site} />
      {/each}
    {:catch err}
      ERROR OCCURRED: {err}
    {/await}
    </div>
  </div>
</main>
