<script>

  import { push } from 'svelte-spa-router'

  import Supabase from './supabase.js'

  let email;
  let password;

  async function logIn() {

    let supa = new Supabase();

    let { data, error } = await supa.client.auth.signInWithPassword({
      "email": email,
      "password": password,
    });

    console.log(data)
    console.log(error)
  }

</script>

<!-- todo, clean this the fuck up -->
<div class="w-full h-full flex items-center justify-center">
  <div class="w-64 h-96 bg-red-200 p-8">
    <input class="w-full" placeholder="email" bind:value={email}>
    <input class="w-full" placeholder="password" bind:value={password}>
    <button on:click={logIn}>CLICK ME</button>
    <button on:click={() => push('/dashboard')}>Go to dash</button>
  </div>
</div>
