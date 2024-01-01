<script>
  import { push } from 'svelte-spa-router';

  import Page from '../lib/Page.svelte';
  import Input from '../lib/Input.svelte';
  import SubmitButton from '../lib/SubmitButton.svelte';

  import Supabase from '../lib/supabase.js';

  let nickname = "";
  let errorText = "";

  let supa = new Supabase();

  let apiHost = import.meta.env.VITE_API_SERVER_URL;

  async function create() {

    // todo, factor this out into CBNR lib similar to the supabase lib

    if (nickname == "") {
      errorText = "Nickname cannot be empty";
      return
    }

    let jwt = await supa.GetAccessToken();
    let url = `${apiHost}/site`
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

    push(`/createok?site=${encodeURIComponent(json["id"])}`)
  }

</script>

<Page title="Create a New Site" selected="create">
  <form class="h-full flex flex-col justify-between" on:submit|preventDefault={create}>
    <div>
      <Input label="Site Nickname" bind:value={nickname} bind:error={errorText}/>
      {#if errorText}
      <p class="text-red-5 text-xs italic mt-2">Failed: {errorText}</p>
      {/if}
    </div>
    <div class="flex flex-row justify-end">
      <SubmitButton>Create</SubmitButton>
    </div>
  </form>
</Page>
