<script>
  import Navbar from '../lib/Navbar.svelte'
  import OverviewRow from '../lib/OverviewRow.svelte'

  import Supabase from '../lib/supabase.js'

  async function getSitesForSelect() {

    let supa = new Supabase();

    let { data, error } = await supa.client.from('site').select();

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`)
    }

    console.log(data)

    return data;
  }

</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-full flex justify-center">
    <div class="w-[768px]">
    {#await getSitesForSelect()}
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
