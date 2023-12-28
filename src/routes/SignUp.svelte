<script>

  import Logo from '../lib/Logo.svelte'
  import Supabase from '../lib/supabase.js';
  import SubmitButton from '../lib/SubmitButton.svelte';

  let email;
  let passwordOne = "";
  let passwordTwo = "";

  let errorText = "";

  let supa = new Supabase();

  function validate() {

    if (passwordOne !== passwordTwo) {
      throw new Error("Password entries do not match");
    }

    if (passwordOne.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    return
  }

  async function signUp() {
    try {
      validate();
      await supa.SignUp(email, passwordOne);
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
    <form class="w-full" on:submit|preventDefault={signUp}>
      <div class="mb-4">
        <label class="block text-gray-8 text-sm font-bold mb-2" for="username">
          Email Address
        </label>
        <input class="shadow border {errorText ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-8" id="username" type="text" bind:value={email}>
      </div>
      <div class="mb-4">
        <label class="block text-gray-8 text-sm font-bold mb-2" for="passwordOne">
          Password
        </label>
        <input class="shadow border {errorText ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-8" id="passwordOne" type="password" bind:value={passwordOne}>
      </div>
      <div class="mb-6">
        <label class="block text-gray-8 text-sm font-bold mb-2" for="passwordTwo">
          Password (One More Time)
        </label>
        <input class="shadow border {errorText ? "border-red-5" : ""} rounded w-full py-2 px-3 text-gray-8" id="passwordTwo" type="password" bind:value={passwordTwo}>
        {#if errorText}
        <p class="text-red-5 text-xs italic mt-2">{errorText}</p>
        {/if}
      </div>
      <div class="flex flex-row justify-end">
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
    <div class="text-xs mx-auto mt-6">
      Already have an account? <a href="#/signin">Sign in!</a>
    </div>
  </div>
</main>

