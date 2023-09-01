<script>
  import Chart from './lib/Chart.svelte'
  import Navbar from './lib/Navbar.svelte'

  import { onMount } from 'svelte';

  import { createClient } from '@supabase/supabase-js'

  onMount(async () => {

    const supabaseUrl = 'https://ewwccbgjnulfgcvfrsvj.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2NjYmdqbnVsZmdjdmZyc3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODE2ODUsImV4cCI6MjAwOTE1NzY4NX0.gI3YdNSC5GMkda2D2QPRMvnBdaMOS2ynfFKxis5-WKs';
    const supabase = createClient(supabaseUrl, supabaseKey);

    let { data, error } = await supabase.auth.signInWithPassword({
      email: 'bcwillett1@gmail.com',
      password: 'test'
    });

    console.log(data)
    console.log(error)
  });
</script>

<main class="w-screen h-screen flex flex-col">
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
</main>

