<script>

  import {querystring} from 'svelte-spa-router'

  let decoded = decodeURIComponent($querystring);
  let email = decoded.split("=")[1]

</script>

<main class="w-screen h-screen flex justify-center items-center bg-orange-2">
    Thank you please check email address&nbsp;<pre>{email}</pre>&nbsp;ok thanks
</main>
