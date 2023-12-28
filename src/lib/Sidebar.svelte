<script>

  import Logo from '../lib/Logo.svelte'
  import SidebarItem from '../lib/SidebarItem.svelte'

  import { push } from 'svelte-spa-router'

  import Supabase from './supabase.js';

  export let siteid = "";
  export let nickname = "";
  export let selected = "";

  let supa = new Supabase();

</script>

<div class="w-full h-full px-4 py-2">
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-col justify-between">
      <div class="w-full pt-2">
        <div class="w-fit mx-auto mb-4"><Logo/></div>
        <SidebarItem text="Create" icon="plus" action={() => push(`/create`)} active={selected == "create"} enabled={true}/>
        <div class="px-2 py-2 mb-1"><hr/></div>
        <!-- TODO, find a way to make this one stand out without always marking it as "active" (maybe bold?) -->
        <SidebarItem text="{(nickname != "") ? nickname : "(none selected)"}" action={() => push(`/sites`)} icon="window" active={selected == "sites"} enabled={true}/>
        <div class="px-2 py-2 mb-1"><hr/></div>
        <SidebarItem text="Overview" icon="chart-bar" action={() => push(`/site/${siteid}/overview`)} active={selected == "overview"} enabled={siteid != ""}/>
        <SidebarItem text="Clients" icon="users" active={selected == "clients"} enabled={siteid != ""}/>
        <SidebarItem text="Pages" icon="newspaper" active={selected == "pages"} enabled={siteid != ""}/>
        <SidebarItem text="Errors" icon="exclamation-triangle" active={selected == "errors"} enabled={siteid != ""}/>
        <div class="px-2 py-2 mb-1"><hr/></div>
        <SidebarItem text="Monitoring" icon="envelope" active={selected == "monitoring"} enabled={false}/>
        <SidebarItem text="Settings" icon="cog" action={() => push(`/site/${siteid}/settings`)} active={selected == "settings"} enabled={siteid != ""}/>
      </div>
      <div class="w-full">
        <SidebarItem text="Support" icon="information-circle" active={false} enabled={true}/>
        <SidebarItem text="My Account" icon="user-circle" active={false} enabled={true}/>
        <SidebarItem text="Sign Out" icon="x-circle" action={() => supa.SignOut()} active={false} enabled={true}/>
      </div>
    </div>
  </div>
</div>
