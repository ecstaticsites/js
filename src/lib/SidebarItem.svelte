<script>

  import Icon from './Icon.svelte';

  export let text;
  export let icon;
  export let action;
  export let active;
  export let enabled;
  export let color;

</script>

<!-- TODO, currently long site names can expand their container instead of truncating -->
<div class="w-auto mx-4 h-9 mb-1 flex justify-start items-center text-{color}-12 {active ? `bg-${color}-1` : (enabled ? `hover:bg-${color}-1` : "")} {enabled ? `cursor-pointer active:bg-${color}-2` : "cursor-not-allowed text-opacity-50"} rounded-md select-none" on:click={enabled ? action : null}>
  <div class="px-2">
    <Icon icon="{icon}"/>
  </div>
  <div class="truncate">{text}</div>
</div>
