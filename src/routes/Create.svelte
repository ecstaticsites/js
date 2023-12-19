<script>

  import { theme } from "../lib/usersettings.js";

  import Sidebar from '../lib/Sidebar.svelte';
  import Input from '../lib/Input.svelte';

  import Supabase from '../lib/supabase.js';

  let nickname = "";
  let errorText = "";

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_API_SERVER_URL;

  async function create() {

    if (nickname == "") {
      errorText = "Nickname cannot be empty";
      return
    }

    let jwt = await supa.GetAccessToken();
    let url = `${apiHost}/new`
    let data = {"nickname": nickname}
    let response = null;

    console.log(`Making HTTP request with url ${url} and body ${JSON.stringify(data)}`)

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } catch(error) {
      errorText = `API request did not succeed: ${error}`
      return
    }

    if (!response.ok) {
      let text = await response.text();
      errorText = `API request did not succeed: ${text}`
      return
    }

    let json = await response.json();

    console.log(json);
  }

</script>

<main class="w-screen h-screen flex bg-{theme}-0">
  <div class="h-full w-80">
    <Sidebar siteid={""} nickname={""} selected={"create"}/>
  </div>
  <div class="h-full w-full">
    <div class="w-full h-full flex justify-center bg-white shadow-xl rounded-sm">
      <form class="w-[768px] py-8 flex flex-col justify-between" on:submit|preventDefault={create}>
        <div>
          <h2 class="mb-8">Create a New Site</h2>
          <Input label="Site Nickname" bind:value={nickname} bind:error={errorText}/>
          {#if errorText}
          <p class="text-red-5 text-xs italic mt-2">Failed: {errorText}</p>
          {/if}
        </div>
        <div class="flex flex-row justify-end">
          <button class="ml-auto bg-{theme}-10 hover:bg-{theme}-11 active:bg-{theme}-12 text-white font-bold py-2 px-4 rounded" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
