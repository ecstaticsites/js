<script>
  import Chart from '../lib/Chart.svelte'
  import Navbar from '../lib/Navbar.svelte'

  import Supabase from '../lib/supabase.js'

  export let params = {}

  let site = params["id"];

  let selectedHostname = ""

</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-12 bg-green-200 flex justify-between items-center">
    <div class="text-xl">HITS FOR WILLETT DOT IO</div>
    <div>(timespan and hostname selector go here etc, settings cogwheel)</div>
  </div>
  <div class="w-full h-full flex">
    <div class="w-2/3 h-full">
      <Chart title="Hits By Status" bind:hostname={selectedHostname} groupby="statuscode" bucketby="1d"/>
    </div>
    <div class="w-1/3 h-full flex flex-col">
      <div class="w-full h-1/3">
        <Chart title="Hits by Device" bind:hostname={selectedHostname} groupby="device" bucketby=""/>
      </div>
      <div class="w-full h-1/3">
        <Chart title="Hits by Browser" bind:hostname={selectedHostname} groupby="browser" bucketby=""/>
      </div>
      <div class="w-full h-1/3">
        <Chart title="Hits by OS" bind:hostname={selectedHostname} groupby="os" bucketby=""/>
      </div>
    </div>
  </div>
</main>
