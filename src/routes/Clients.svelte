<script>

  import dayjs from 'dayjs';
  import { writable } from "svelte/store";

  import Chart from '../lib/Chart.svelte';
  import Controller from '../lib/Controller.svelte';
  import Page from '../lib/Page.svelte';
  import Supabase from '../lib/supabase.js';

  // this is how the component gets query params from svelte-spa-router
  export let params = {};

  let supa = new Supabase();

  // just returns a pair of (site, paramstore) since both are needed below
  let promise = supa.GetSite(params["id"]).then((site) => {
    return {
      "site": site,
      // store used to contain params sent to CBNR backend to query data
      // like hostname, time range, group bys, etc, it is set by the Controller
      // and subscribed to by Chart. Should eventually be a QueryParamStore?
      "store": writable({
        "hostname": site["custom_hostname"] ? site["custom_hostname"] : site["hostname"],
        "start": dayjs().startOf('day').unix(),
        "end": dayjs().endOf('day').unix(),
        "bots": false,
      }),
    }
  });

</script>

{#await promise}
...
{:then res}
<Page title="Traffic Clients" selected="clients" siteid={res["site"]["id"]} nickname={res["site"]["nickname"]}>
  <div class="mb-8">
    <Controller siteid={res["site"]["id"]} store={res["store"]}/>
  </div>
  <div class="grid grid-cols-2">
    <div>
      <div class="text-2xl text-bold">Operating Systems</div>
      <Chart variety="donut" params={res["store"]} groupby="os"/>
    </div>
    <div>
      <div class="text-2xl text-bold">Browsers</div>
      <Chart variety="donut" params={res["store"]} groupby="browser"/>
    </div>
    <div>
      <div class="text-2xl text-bold">Device Sizes</div>
      <Chart variety="donut" params={res["store"]} groupby="device"/>
    </div>
    <div>
      <div class="text-2xl text-bold">Countries</div>
      <Chart variety="donut" params={res["store"]} groupby="country"/>
    </div>
  </div>
</Page>
{:catch err}
err
{/await}
