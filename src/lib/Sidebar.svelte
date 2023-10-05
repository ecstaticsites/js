<script>

  import SidebarItem from '../lib/SidebarItem.svelte'

</script>

<div class="w-full h-full px-4 py-2">
  <div class="w-full h-full border-r">
    <div class="w-full h-full flex flex-col justify-between">
      <div class="w-full">
        <div class="mx-auto w-32 h-16 my-2 bg-orange-200">LOGO</div>
        <SidebarItem text="CBNR Landing" icon="window"/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Upload" icon="arrow-up-tray"/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Overview" icon="chart-bar"/>
        <SidebarItem text="Clients" icon="users"/>
        <SidebarItem text="Pages" icon="newspaper"/>
        <SidebarItem text="Errors" icon="exclamation-triangle"/>
        <div class="px-2 py-2"><hr/></div>
        <SidebarItem text="Monitoring" icon="envelope"/>
        <SidebarItem text="Settings" icon="cog"/>
      </div>
      <div class="w-full">
        <SidebarItem text="Support" icon="information-circle"/>
        <SidebarItem text="My Account" icon="user-circle"/>
        <SidebarItem text="Sign Out" icon="x-circle"/>
      </div>
    </div>
  </div>
</div>
