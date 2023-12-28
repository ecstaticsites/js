<script>
  import Page from '../lib/Page.svelte';
  import Input from '../lib/Input.svelte';
  import SubmitButton from '../lib/SubmitButton.svelte';

  import Supabase from '../lib/supabase.js';

  export let params = {};

  let supa = new Supabase();

  let sitePromise = supa.GetSite(params["id"]);

  function submit() {}
</script>

{#await sitePromise}
...
{:then site}
<Page title="Site Settings" selected="settings" siteid={site["id"]} nickname={site["nickname"]}>
  <form class="h-full flex flex-col justify-between" on:submit|preventDefault={submit}>
    <div>
      <Input label="Site ID" value={site["id"]} readonly={true}/>
      <Input label="Site Nickname" value={site["nickname"]} readonly={false}/>
    </div>
    <div class="flex flex-row justify-end">
      <SubmitButton>Save</SubmitButton>
    </div>
  </form>
</Page>
{:catch err}
err
{/await}
