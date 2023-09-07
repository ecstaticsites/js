<script>

  import Router from 'svelte-spa-router'

  import Dashboard from './routes/Dashboard.svelte'
  import Login from './routes/Login.svelte'

  const routes = {
    "/dashboard": Dashboard,
    "/login": Login,
    "*": Login,
  }

</script>

<Router {routes}/>
