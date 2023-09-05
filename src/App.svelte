<script>
  import Chart from './lib/Chart.svelte'
  import Navbar from './lib/Navbar.svelte'
  import LogIn from './lib/LogIn.svelte'

  import Supabase from './lib/supabase.js'

  let supa = new Supabase();

  let sessionPromise = supa.client.auth.getSession().then(({data, error}) => {
    if (error) {
      console.log(error)
      throw new Error(`Error occurred in getSession: ${error}`);
    } else if (!data["session"]) {
      console.log("User is not logged in")
      throw new Error("User is not logged in");
    } else {
      console.log(data["session"])
      return data["session"];
    }
  });

    // alright, this is the way
    // on frontend, user logs in, gets JWT
    // use JWT'd supa client to query sites, put in dropdown
    // when we need data, send site ID + the JWT to golang server
    // golang server does THE BELOW (creates client with user's JWT)
    // queries DB for site name from ID (implicitly validates auth as well)
    // then forwards site name to influx query

</script>

<main class="w-screen h-screen flex flex-col">
  {#await sessionPromise}
    <p>...waiting</p>
  {:then session}
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
  {:catch error}
    <LogIn/>
  {/await}
</main>

