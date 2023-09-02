<script>

  import { createClient } from '@supabase/supabase-js';
  import { supabaseUrl, supabaseKey } from './util.js'

  let email;
  let password;

  async function logIn() {

    let supabase = createClient(supabaseUrl, supabaseKey);

    let { data, error } = await supabase.auth.signInWithPassword({
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
  </div>
</div>
