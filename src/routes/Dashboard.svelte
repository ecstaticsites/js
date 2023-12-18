<script>

  import { theme } from "../lib/usersettings.js";

  import { writable } from "svelte/store";

  import Chart from '../lib/Chart.svelte'
  import Controller from '../lib/Controller.svelte'
  import Sidebar from '../lib/Sidebar.svelte'

  import Supabase from '../lib/supabase.js'

  import {slide} from 'svelte/transition'

  import dayjs from 'dayjs';

  export let params = {}

  let supa = new Supabase();

  // store used to contain params sent to CBNR backend to query data
  // like hostname, time range, group bys, etc, it is set by the Controller
  // and subscribed to by Chart. Should eventually be a QueryParamStore?

  let sitePromise = supa.GetSite(params["id"])
  let aliasPromise = supa.GetAliases(params["id"]);
  let defaultAliasPromise = aliasPromise.then((arr) => arr.find((e) => e["is_default"]));
  let backendParamStorePromise = defaultAliasPromise.then((alias) => writable({
    "hostname": alias["hostname"],
    "start": dayjs().startOf('day').unix(),
    "end": dayjs().endOf('day').unix(),
    "bots": false,
  }));

</script>

<main class="w-screen h-screen flex bg-{theme}-0">
  <div class="h-full w-80">
    {#await sitePromise}
    <div>...loading</div>
    {:then site}
    <Sidebar siteid={params["id"]} nickname={site["nickname"]} selected={"overview"}/>
    {:catch error}
    <div>failed! check console</div>
    {/await}
  </div>
  <div class="h-full w-full">
    <div class="w-full h-full flex justify-center bg-white shadow-xl rounded-sm">
      <div class="w-[768px] flex flex-col">
        {#await backendParamStorePromise}
        <div>...loading</div>
        {:then backendParamStore}
        <Controller siteid={params["id"]} store={backendParamStore}/>
        <div class="w-full">
          <Chart params={backendParamStore} groupby="statuscode"/>
        </div>
        {:catch error}
        <div>failed! check console</div>
        {/await}
      </div>
    </div>
  </div>
</main>
