<script>
  import Navbar from '../lib/Navbar.svelte'
  import OverviewRow from '../lib/OverviewRow.svelte'

  import { push } from 'svelte-spa-router'

  import Supabase from '../lib/supabase.js'

  let supa = new Supabase();
  let authCheck = supa.isLoggedIn();

  authCheck.catch((error) => {
    console.error(`getSession was unsuccessful, redirecting to login: ${error}`);
    push("/login");
  });

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
  {#await authCheck}
    <p>...checking auth...</p>
  {:then _}
  <Navbar/>
  <div class="w-full h-full flex justify-center">
    <div class="w-[768px]">
      <OverviewRow site={"foo"} />
    </div>
  </div>
  {/await}
</main>

