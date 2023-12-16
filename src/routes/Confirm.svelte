<script>

  import {querystring} from 'svelte-spa-router'

</script>

<main class="w-screen h-screen flex justify-center items-center bg-orange-2">
    Thank you check {decodeURIComponent($querystring)} thanks
</main>
