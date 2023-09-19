<script>
  import Chart from '../lib/Chart.svelte'
  import Navbar from '../lib/Navbar.svelte'

  import Supabase from '../lib/supabase.js'

  import {slide} from 'svelte/transition'

  export let params = {}

  let siteid = params["id"];

</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-full flex justify-center" out:slide="{{duration: 250}}">
    <div class="w-[768px] flex flex-col">
      <div class="w-full h-12 bg-green-200 flex justify-between items-center">
        <div class="text-xl">HITS FOR WILLETT DOT IO</div>
        <div>(timespan and hostname selector go here etc, settings cogwheel)</div>
      </div>
      <div class="w-full">
        <Chart title="Hits By Status" siteid={siteid} groupby="statuscode" bucketby="1d"/>
      </div>
      <div class="w-full flex flex-row">
        <div class="w-1/3">
          <Chart title="Hits by Device" siteid={siteid} groupby="device" bucketby=""/>
        </div>
        <div class="w-1/3">
          <Chart title="Hits by Browser" siteid={siteid} groupby="browser" bucketby=""/>
        </div>
        <div class="w-1/3">
          <Chart title="Hits by OS" siteid={siteid} groupby="os" bucketby=""/>
        </div>
      </div>
    </div>
  </div>
</main>
