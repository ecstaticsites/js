<script>

  import Sidebar from '../lib/Sidebar.svelte'

  import Supabase from '../lib/supabase.js'

  import dayjs from 'dayjs';

  import { canonicalizeFile } from "../lib/util.js";

  export let params = {}

  let files;

  async function upload() {
    if (!files) {
      console.log(`Won't upload files since the value is falsey: ${files}`);
      return;
    }

    // we have already queried for this info! Should just be caching it somewhere
    let supa = new Supabase();
    let sites = await supa.GetSites();
    let site = sites.find((s) => s.id == params["id"]);

    console.log(site);
    Array.from(files).forEach(async (f) => {

      let bunnyDest = `https://storage.bunnycdn.com/${site.storage_name}/${canonicalizeFile(f.webkitRelativePath)}`

      console.log(bunnyDest)

      let req = await fetch(
        bunnyDest,
        {
          method: "PUT",
          headers: {
            AccessKey: site.storage_token,
          },
          // yep, you just put the file object as the body, NO CONTENT-TYPE, and fetch does the right thing
          body: f,
        }
      ).then(
        success => console.log(`DONE WITH SUCCESS: ${success} ${f.webkitRelativePath}`) // Handle the success response object
      ).catch(
        error => console.log(`DONE WITH ERROR: ${error} ${f.webkitRelativePath}`) // Handle the error response object
      );
    });
  }
</script>

<main class="w-screen h-screen flex bg-brown-0">
  <div class="h-full w-80">
    <Sidebar siteid={params["id"]} selected={"upload"}/>
  </div>
  <div class="h-full w-full pr-8 py-4">
    <div class="w-full h-full flex justify-center bg-white shadow-lg rounded-sm">
      <label for="files">Upload a folder:</label>
      <input bind:files type="file" id="files" webkitdirectory="" directory="">
      <div>
        {#if files}
        <h2>Selected files:</h2>
          {#each Array.from(files) as file}
          <p>{file.webkitRelativePath} ({file.size} bytes)</p>
          {/each}
        {/if}
      </div>
      <div class="bg-yellow-200 h-12 cursor-pointer" on:click={upload}>GOGOGO</div>
    </div>
  </div>
</main>
