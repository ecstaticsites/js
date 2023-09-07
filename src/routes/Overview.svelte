<script>
  import Navbar from '../lib/Navbar.svelte'
  import OverviewRow from '../lib/OverviewRow.svelte'

  import Supabase from '../lib/supabase.js'

  async function getSitesForSelect() {

    let supa = new Supabase();

    let sites = await supa.client.from('site').select('site_id, site_name');

    if (sites["error"]) {
      throw new Error(`Couldn't get data from supabase: ${sites["error"]}`)
    }

    return sites["data"].map((d) => {
      return {"label": d["site_name"], "value": d["site_id"]}
    });
  }

</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-full flex justify-center">
    <div class="w-[768px]">
      <OverviewRow site={"foo"} />
    </div>
  </div>
</main>
