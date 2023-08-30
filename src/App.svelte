<script>
  import Chart from './lib/Chart.svelte'
</script>

<main class="w-screen h-screen flex">
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
</main>

