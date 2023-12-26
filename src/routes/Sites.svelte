<script>
  import Page from '../lib/Page.svelte';
  import SiteRow from '../lib/SiteRow.svelte';

  import Supabase from '../lib/supabase.js';

  let supa = new Supabase();

  let sitesPromise = supa.GetSites();
</script>

<Page title="Your Sites" selected="sites">
  {#await sitesPromise}
    ...THINKING...
  {:then sites}
    {#each sites as site}
      <SiteRow site={site} />
    {/each}
  {:catch err}
    ERROR OCCURRED: {err}
  {/await}
</Page>
