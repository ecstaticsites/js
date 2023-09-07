<script>

  import Router from 'svelte-spa-router'

  import Overview from './routes/Overview.svelte'
  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'

  const routes = {
    "/overview": Overview,
    "/dashboard": Dashboard,
    "/login": Login,
  }

</script>

<Router {routes}/>
