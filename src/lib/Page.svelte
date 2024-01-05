<script>

  import Sidebar from '../lib/Sidebar.svelte';

  import { theme } from "../lib/usersettings.js";

  export let siteid = "";
  export let nickname = "";
  export let selected;
  export let title;

</script>

<main class="w-screen h-screen flex bg-{theme}-0">
  <!-- this doesn't work, need some way of enforcing fixed width?? -->
  <div class="h-full w-80">
    <Sidebar siteid={siteid} nickname={nickname} selected={selected}/>
  </div>
  <div class="h-full w-full flex justify-center bg-white shadow-xl rounded-sm">
    <div class="w-[768px] py-8 flex flex-col justify-start">
      <div class="text-4xl text-bold my-6">{title}</div>
      <slot>page content goes here</slot>
    </div>
  </div>
</main>
