<script>

  import { onMount } from 'svelte';

  import { push, querystring } from 'svelte-spa-router';

  import Page from '../lib/Page.svelte';
  import SubmitButton from '../lib/SubmitButton.svelte';

  import Supabase from '../lib/supabase.js';

  let supa = new Supabase();

  let decoded = decodeURIComponent($querystring);
  let siteId = decoded.split("=")[1];

  // when this page loads, the user assumedly just gained auth to query a new
  // site in their app_metadata, but their current token does NOT reflect that,
  // so refreshing the token now allows them to query right away
  onMount(async () => {
    try {
      await supa.RefreshAccessToken();
    } catch(error) {
      console.log(`Refreshing access token did not succeed: ${error}`);
    }
  });

  async function submit() {
     push("/sites");
  }

</script>

<Page title="Success" selected="create">
  <form class="h-full flex flex-col justify-between" on:submit|preventDefault={submit}>
    <div>
      <div class="mb-1">You've created a new site with ID: <code>{siteId}</code>.</div>
      <div class="mb-1">You can visit it live at the following link: <a class="underline" target="_blank" href="https://{siteId}.b-cdn.net/"><code>{siteId}.b-cdn.net</code></a>.</div>
      <div class="mb-1">The site currently has no content.</div>
      <div class="mb-1">To start publishing to your new site, check out the <a class="underline" target="_blank" href="https://docs.ecstaticsites.org/pages/publishing.html">docs</a>!</div>
    </div>
    <div class="flex flex-row justify-end">
      <SubmitButton>Back to Sites</SubmitButton>
    </div>
  </form>
</Page>
