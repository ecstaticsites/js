<script>

  import Logo from '../lib/Logo.svelte';

  import { querystring } from 'svelte-spa-router';

  let decoded = decodeURIComponent($querystring);
  let email = decoded.split("=")[1]

</script>

<main class="w-screen h-screen flex justify-center items-center bg-orange-2">
  <div class="w-80 flex flex-col justify-center items-start bg-white shadow-md rounded p-8">
    <div class="mx-auto mb-8">
      <Logo/>
    </div>
    <div class="mb-4">Nice to meet you!</div>
    <div class="mb-4"><code>{email}</code></div>
    <div class="mb-4">Look for an email at the address above for a link to proceed.</div>
  </div>
</main>
