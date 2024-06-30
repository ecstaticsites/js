<script>
  import Page from '../lib/Page.svelte';
  import Input from '../lib/Input.svelte';
  import SubmitButton from '../lib/SubmitButton.svelte';

  import Supabase from '../lib/supabase.js';

  export let params = {};

  let site;
  let copy;
  let errorText;
  let thinking = false;

  let supa = new Supabase();
  let apiHost = import.meta.env.VITE_API_SERVER_URL;

  let sitePromise = supa.GetSite(params["id"]).then((s) => site = s);
  let copyPromise = sitePromise.then(() => copy = JSON.parse(JSON.stringify(site)));

  async function submit() {

    thinking = true;

    try {
      await supa.UpdateSite(copy["id"], copy["nickname"], copy["index_path"], copy["github_repo"], copy["color"]);
    } catch (e) {
      errorText = e.message;
      console.log(errorText);
      thinking = false;
      return;
    }

    // "easy" part of the update worked, let's try the convoluted part
    if (site["custom_hostname"] == copy["custom_hostname"]) {
      console.log("Custom hostname config not changed, so all done!");
      location.reload();
      return;
    }

    // todo, factor this out into CBNR lib similar to the supabase lib

    let jwt = await supa.GetAccessToken();
    let url = `${apiHost}/hostname`
    let response = null;
    let data = {
      "siteid": copy["id"],
      "pullzoneid": copy["pull_zone_id"],
      "hostname": copy["custom_hostname"],
    }

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
      errorText = `API request did not succeed: ${error}`;
      console.log(errorText);
      thinking = false;
      return
    }

    if (!response.ok) {
      let text = await response.text();
      errorText = `API request did not succeed: ${text}`;
      console.log(errorText);
      thinking = false;
      return
    }

    console.log("All done adding hostname!");

    location.reload();
  }
</script>

{#await copyPromise}
...
{:then}
<Page title="Site Settings" selected="settings" siteid={site["id"]} nickname={site["nickname"]} color={site["color"]}>
  <form class="h-full flex flex-col justify-between" on:submit|preventDefault={submit}>
    <div>
      <Input color={site["color"]} label="Site ID" value={copy["id"]} readonly={true}/>
      <Input color={site["color"]} label="Site Nickname" bind:value={copy["nickname"]}/>
      <Input color={site["color"]} label="Index Path" bind:value={copy["index_path"]}/>
      <Input color={site["color"]} label="Github Repository" bind:value={copy["github_repo"]} placeholder="(not set)"/>
      <Input color={site["color"]} label="Custom Domain" bind:value={copy["custom_hostname"]} placeholder="(not set)"/>
      <Input color={site["color"]} label="Color" bind:value={copy["color"]}/>
    </div>
    <div class="flex flex-col items-end justify-end">
      {#if errorText}
      <div class="text-red-5 text-xs italic mb-2">{errorText}</div>
      {/if}
      <SubmitButton thinking={thinking}>Save</SubmitButton>
    </div>
  </form>
</Page>
{:catch err}
Error rendering page: {err}
{/await}
