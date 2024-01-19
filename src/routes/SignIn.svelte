<script>

  import { querystring } from 'svelte-spa-router';

  import Logo from '../lib/Logo.svelte'
  import Supabase from '../lib/supabase.js';
  import SubmitButton from '../lib/SubmitButton.svelte';
  import Input from '../lib/Input.svelte';

  let email;
  let password;

  let errorText = "";
  let thinking = false;

  let decoded = decodeURIComponent($querystring);
  let demo = (decoded == "demo=true");

  let supa = new Supabase();

  async function signIn() {
    thinking = true;
    try {
      await supa.SignIn(email, password);
    } catch (e) {
      errorText = e.message;
      thinking = false;
    }
  }

</script>

<main class="w-screen h-screen flex justify-center items-center bg-orange-1">
  <div class="w-80 flex flex-col justify-center items-start bg-white shadow-md rounded p-8">
    <div class="mx-auto mb-7">
      <Logo/>
    </div>
    {#if demo}
    <div class="w-full text-sm rounded bg-orange-2 py-3 px-4 outline outline-2 outline-orange-3">
      <div class="mb-2">Try the demo account!</div>
      <div class="mb-2">Email: <code>demo@example.com</code></div>
      <div class="">Password: <code>staticsitesftw</code></div>
    </div>
    {/if}
    <form class="w-full mt-5" on:submit|preventDefault={signIn}>
      <Input label="Email Address" bind:value={email} bind:error={errorText}/>
      <Input label="Password" type="password" bind:value={password} bind:error={errorText}/>
      <div class="mt-6 flex flex-col items-end">
        {#if errorText}
        <div class="text-red-5 text-xs italic mb-2">{errorText}</div>
        {/if}
        <SubmitButton thinking={thinking}>Sign In</SubmitButton>
      </div>
    </form>
  </div>
</main>
