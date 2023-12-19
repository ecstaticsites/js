<script>

  import Router from 'svelte-spa-router'
  import { push } from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'

  import Overview from './routes/Overview.svelte'
  import Create from './routes/Create.svelte'
  import CreateOk from './routes/CreateOk.svelte'
  import Dashboard from './routes/Dashboard.svelte'
  import Upload from './routes/Upload.svelte'
  import SignIn from './routes/SignIn.svelte'
  import SignUp from './routes/SignUp.svelte'
  import SignUpOk from './routes/SignUpOk.svelte'

  import Supabase from './lib/supabase.js';

  async function SignedInGuard(detail) {
    console.log(`Checking auth before proceeding to page ${detail.location}...`)
    let supa = new Supabase();
    let res = await supa.IsSignedIn();
    console.log(`Signed in: ${res}, ${res ? "continuing..." : "redirecting to signin..."}`)
    return res;
  }

  async function AlwaysFailsGuard(detail) {
    console.log(`Page ${detail.location} not recognized, redirecting to signin...`)
    return false;
  }

  const routes = {
    "/overview": wrap({
      component: Overview,
      conditions: [SignedInGuard],
    }),
    "/create": wrap({
      component: Create,
      conditions: [SignedInGuard],
    }),
    "/createok": wrap({
      component: CreateOk,
      conditions: [SignedInGuard],
    }),
    "/site/:id/overview": wrap({
      component: Dashboard,
      conditions: [SignedInGuard],
    }),
    "/site/:id/upload": wrap({
      component: Upload,
      conditions: [SignedInGuard],
    }),
    "/signin": wrap({
      component: SignIn,
      // todo -- make signin page redirect to overview if logged in
      conditions: [],
    }),
    "/signup": wrap({
      component: SignUp,
      conditions: [],
    }),
    "/signupok": wrap({
      component: SignUpOk,
      conditions: [],
    }),
    "*": wrap({
      component: SignIn,
      // condition always fails, so hits handler below and redirects
      conditions: [AlwaysFailsGuard],
    }),
  }

</script>

<Router {routes} on:conditionsFailed={(event) => push("/signin")}/>
