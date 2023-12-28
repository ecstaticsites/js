<script>

  import Logo from '../lib/Logo.svelte'
  import Supabase from '../lib/supabase.js';
  import SubmitButton from '../lib/SubmitButton.svelte';
  import Input from '../lib/Input.svelte';

  let email;
  let password;

  let errorText = "";

  let supa = new Supabase();

  async function signIn() {
    try {
      await supa.SignIn(email, password);
    } catch (e) {
      errorText = e.message;
    }
  }

</script>

<main class="w-screen h-screen flex justify-center items-center bg-orange-2">
  <div class="w-80 flex flex-col justify-center items-start bg-white shadow-md rounded p-8">
    <div class="mx-auto mb-8">
      <Logo/>
    </div>
    <form class="w-full" on:submit|preventDefault={signIn}>
      <Input label="Email Address" bind:value={email} bind:error={errorText}/>
      <Input label="Password" type="password" bind:value={password} bind:error={errorText}/>
      <div class="mt-6 flex flex-col items-end">
        {#if errorText}
        <div class="text-red-5 text-xs italic mb-2">{errorText}</div>
        {/if}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
    <div class="text-xs mx-auto mt-6">
      No account? <a href="#/signup">Sign up!</a>
    </div>
  </div>
</main>
