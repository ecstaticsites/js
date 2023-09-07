<script>

  import Router from 'svelte-spa-router'
  import { push } from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'

  import Overview from './routes/Overview.svelte'
  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'

  import { IsLoggedIn } from './lib/supabase.js'

  const routes = {
    "/overview": wrap({
      component: Overview,
      conditions: [IsLoggedIn],
    }),
    "/dashboard": wrap({
      component: Dashboard,
      conditions: [IsLoggedIn],
    }),
    "/login": wrap({
      component: Login,
      conditions: [],
    }),
  }

</script>

<Router {routes} on:conditionsFailed={() => push("/login")}/>
