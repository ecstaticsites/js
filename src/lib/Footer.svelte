<script>

  export let color = SITELESS_COLOR;

  let hash = __COMMIT_HASH__;
  let link = __COMMIT_LINK__;
  let date = __BUILD_DATE__;

</script>

<div class="w-3/4 h-10 flex items-center justify-center">
  <div class="text-sm">Running version <a href="{__COMMIT_LINK__}" class="text-{color}-12" target="_blank">{hash}</a> built on {date}</div>
  <div class="text-sm px-3">-</div>
  <div class="text-sm">A copyright would totally go here</div>
  <div class="text-sm px-3">-</div>
  <div class="text-sm text-{color}-12"><a href="https://docs.ecstaticsites.org/" target="_blank">Check out the docs!</a></div>
</div>
