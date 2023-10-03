<script>

  import { writable } from "svelte/store";

  import Chart from '../lib/Chart.svelte'
  import Controller from '../lib/Controller.svelte'
  import Navbar from '../lib/Navbar.svelte'

  import Supabase from '../lib/supabase.js'

  import {slide} from 'svelte/transition'

  import dayjs from 'dayjs';

  export let params = {}

  // store used to contain params sent to CBNR backend to query data
  // like hostname, time range, group bys, etc, it is set by the Controller
  // and subscribed to by Chart. Should eventually be a QueryParamStore?
  let backendParamStore = writable({
    // TODO this should be hostname, not [siteid and backend does resolution]!
    // but that requires the "hostname as table under user ID database" thing
    // that isn't sorted out yet due to bunny SNI whatever whatever
    // then hostname is selectable in the Controller
    "hostname": "lalala",
    "siteid": params["id"],
    "start": dayjs().startOf('day').unix(),
    "end": dayjs().endOf('day').unix(),
  });

</script>

<main class="w-screen h-screen flex flex-col">
  <Navbar/>
  <div class="w-full h-full flex justify-center" out:slide="{{duration: 250}}">
    <div class="w-[768px] flex flex-col">
      <Controller siteid={params["id"]} store={backendParamStore}/>
      <div class="w-full">
        <Chart title="Hits By Status" params={backendParamStore} groupby="statuscode"/>
      </div>
      <!--
      <div class="w-full flex flex-row">
        <div class="w-1/3">
          <Chart title="Hits by Device" params={backendParamStore} groupby="device" timeseries={false}/>
        </div>
        <div class="w-1/3">
          <Chart title="Hits by Browser" params={backendParamStore} groupby="browser" timeseries={false}/>
        </div>
        <div class="w-1/3">
          <Chart title="Hits by OS" params={backendParamStore} groupby="os" timeseries={false}/>
        </div>
      </div>
      -->
    </div>
  </div>
</main>
