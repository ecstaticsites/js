<script>

  import dayjs from 'dayjs';

  import * as relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

  // dict representing supabase SITE row -- id, nickname, created, updated
  export let site;

  let relative = dayjs(site["last_updated_at"]).fromNow();

</script>

<div class="w-full h-12 mt-2 bg-red-200 rounded hover:shadow-md flex justify-between items-center px-4">
  <div>
    📍 {site["nickname"]}
  </div>
  <div>
    ⏱ {relative}
  </div>
  <div class="w-24 flex justify-between items-center">
    <div class="w-2 h-2 flex justify-center items-center bg-green-200 p-3">⬆️</div>
    <div class="w-2 h-2 flex justify-center items-center bg-green-200 p-3">📊</div>
    <div class="w-2 h-2 flex justify-center items-center bg-green-200 p-3">⚙️</div>
  </div>
</div>
