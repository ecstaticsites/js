<script>

  import Router from 'svelte-spa-router'
  import { push } from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'

  import Overview from './routes/Overview.svelte'
  import Dashboard from './routes/Dashboard.svelte'
  import Upload from './routes/Upload.svelte'
  import Login from './routes/Login.svelte'

  import { IsLoggedIn } from './lib/supabase.js'

  const routes = {
    "/overview": wrap({
      component: Overview,
      conditions: [IsLoggedIn],
    }),
    "/site/:id/overview": wrap({
      component: Dashboard,
      conditions: [IsLoggedIn],
    }),
    "/site/:id/upload": wrap({
      component: Upload,
      conditions: [IsLoggedIn],
    }),
    "/login": wrap({
      component: Login,
      // todo -- make login page redirect to overview if logged in
      conditions: [],
    }),
  }

</script>

<Router {routes} on:conditionsFailed={(event) => push("/login")}/>
