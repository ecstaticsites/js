<script>

  import { push, querystring } from 'svelte-spa-router';

  import Page from '../lib/Page.svelte';
  import SubmitButton from '../lib/SubmitButton.svelte';

  let decoded = decodeURIComponent($querystring);
  let siteId = decoded.split("=")[1];

  async function submit() {
     push("/sites");
  }

</script>

<Page title="Success" selected="create">
  <form class="h-full flex flex-col justify-between" on:submit|preventDefault={submit}>
    <div>
      <div>You've created a new site with ID: <code>{siteId}</code>.</div>
      <div>You can visit it live at this link: <code>{siteId}.b-cdn.net</code>.</div>
      <div>The site currently has no content.</div>
      <div>To start publishing to this site, push to the remote: <code>https://git.cbnr.xyz/{siteId}</code>.</div>
      <div>For more information, check out <a href="#">the publishing docs</a>!</div>
    </div>
    <div class="flex flex-row justify-end">
      <SubmitButton>Back to Sites</SubmitButton>
    </div>
  </form>
</Page>
