<script>

  import SidebarItem from '../lib/SidebarItem.svelte'

  export let siteid = "";
  export let selected = "";

</script>

<div class="w-full h-full px-4 py-2">
  <div class="w-full h-full border-r">
    <div class="w-full h-full flex flex-col justify-between">
      <div class="w-full">
        <div class="mx-auto w-32 h-16 my-2 bg-orange-200">LOGO</div>
        <SidebarItem text="CBNR Landing" icon="window" active={false}/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Upload" icon="arrow-up-tray" dest={`/site/${siteid}/upload`} active={selected == "upload"}/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Overview" icon="chart-bar" dest={`/site/${siteid}/overview`} active={selected == "overview"}/>
        <SidebarItem text="Clients" icon="users" active={selected == "clients"}/>
        <SidebarItem text="Pages" icon="newspaper" active={selected == "pages"}/>
        <SidebarItem text="Errors" icon="exclamation-triangle" active={selected == "errors"}/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Monitoring" icon="envelope" active={selected == "monitoring"}/>
        <SidebarItem text="Settings" icon="cog" active={selected == "settings"}/>
      </div>
      <div class="w-full">
        <SidebarItem text="Support" icon="information-circle" active={false}/>
        <SidebarItem text="My Account" icon="user-circle" active={false}/>
        <SidebarItem text="Sign Out" icon="x-circle" active={false}/>
      </div>
    </div>
  </div>
</div>
