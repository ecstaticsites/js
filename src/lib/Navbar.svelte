<script>

  import { onMount } from 'svelte';

  import { createClient } from '@supabase/supabase-js';
  import { supabaseUrl, supabaseKey } from './util.js'

  let supabase = createClient(supabaseUrl, supabaseKey);

  let sitePromise = supabase.from('site').select('site_name');

</script>

<div class="w-full h-14 bg-red-800 text-[#E8DED1] flex items-center px-2">
  <div class="text-4xl font-['SNES'] pr-4 pt-1 shrink-0">CLOUDY BUT NO RAIN</div>
  <div class="h-full w-full flex justify-between items-center">
    <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Site: willett.io</div>
    {#await sitePromise}
      ...
    {:then data}
      {console.log(data)}
    {:catch error}
      ERROR OCCURRED {error}
    {/await}
    <div class="flex">
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Docs</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Support</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Account</div>
      <div class="ml-2 p-2 hover:bg-red-900 rounded-md cursor-pointer">Sign Out</div>
    </div>
  </div>
</div>
