<script>
  import Chart from '../lib/Chart.svelte'
  import Navbar from '../lib/Navbar.svelte'

  import { push } from 'svelte-spa-router'

  import Supabase from '../lib/supabase.js'

  let supa = new Supabase();
  let authCheck = supa.isLoggedIn();

  authCheck.catch((error) => {
    console.error(`getSession was unsuccessful, redirecting to login: ${error}`);
    push("/login");
  });

</script>

<main class="w-screen h-screen flex flex-col">
  {#await authCheck}
    <p>...checking auth...</p>
  {:then _}
  <Navbar/>
  <div class="w-full h-full flex">
    <div class="w-2/3 h-full">
      <Chart title="Hits By Status" groupby="statuscode" bucketby="1d"/>
    </div>
    <div class="w-1/3 h-full flex flex-col">
      <div class="w-full h-1/3">
        <Chart title="Hits by Device" groupby="device" bucketby=""/>
      </div>
      <div class="w-full h-1/3">
        <Chart title="Hits by Browser" groupby="browser" bucketby=""/>
      </div>
      <div class="w-full h-1/3">
        <Chart title="Hits by OS" groupby="os" bucketby=""/>
      </div>
    </div>
  </div>
  {/await}
</main>

