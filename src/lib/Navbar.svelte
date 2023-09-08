<script>

  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  import Supabase from './supabase.js'

  import { currentSite } from './global.js';

  async function getSitesForSelect() {

    let supa = new Supabase();

    let { data, error } = await supa.client.from('site').select('site_id, site_name');

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`)
    }

    return data.map((d) => {
      return {"label": d["site_name"], "value": d["site_id"]}
    });
  }

</script>

<div class="w-full h-14 bg-red-800 text-[#E8DED1] flex items-center px-2">
  <div class="text-4xl font-['SNES'] pr-4 pt-1 pl-1 shrink-0">CLOUDY BUT NO RAIN</div>
  <div class="h-full w-full flex justify-between items-center">
    <div class="flex items-center">
      <div class="ml-4">Site: </div>
      {#await getSitesForSelect()}
        THINKING
      {:then sitesForSelect}
        <Select
          items={sitesForSelect}
          searchable={false}
          clearable={false}
          placeholder={"Select a site"}
          class="!bg-red-800 !w-64 !border-none"
          --height="34px"
          --max-height="34px"
          bind:justValue={$currentSite}
        />
      {:catch error}
        ERROR OCCURRED {error}
      {/await}
      <div class="ml-4">Timespan: </div>
      {#await getSitesForSelect()}
        THINKING
      {:then sitesForSelect}
        <Select
          items={sitesForSelect}
          searchable={false}
          clearable={false}
          placeholder={"Select a site"}
          class="!bg-red-800 !w-64 !border-none"
          --height="34px"
          --max-height="34px"
          bind:justValue={$currentSite}
        />
      {:catch error}
        ERROR OCCURRED {error}
      {/await}
  </div>
    <div class="flex">
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Docs</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Support</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Account</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Sign Out</div>
    </div>
  </div>
</div>
