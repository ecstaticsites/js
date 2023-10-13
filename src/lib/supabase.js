import { createClient } from '@supabase/supabase-js';

// needed for the redirect after login, could live somewhere else though
import { push } from 'svelte-spa-router';

export default class Supabase {

  // basic singleton pattern, works best if we only have one of these
  constructor() {

    if (Supabase.instance) {
      return Supabase.instance;
    }

    Supabase.instance = this;

    // TODO, get these outta here, env vars
    let supabaseUrl = 'https://ewwccbgjnulfgcvfrsvj.supabase.co';
    let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2NjYmdqbnVsZmdjdmZyc3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODE2ODUsImV4cCI6MjAwOTE1NzY4NX0.gI3YdNSC5GMkda2D2QPRMvnBdaMOS2ynfFKxis5-WKs';

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async SignUp() {}

  async SignIn(email, pw) {

    console.log(`Attempting to sign in user with email ${email}...`);

    let { data, error } = await this.client.auth.signInWithPassword({
      "email": email,
      "password": pw,
    });

    if (error) {
      throw new Error(`${error["name"]}: ${error["message"]}`);
    }

    console.log(`Successfully signed in as user: ${data}`);

    push("/overview");

    return;
  }

  // signs out the currently-logged-in user
  async SignOut() {

    console.log("Signing out the current user...");

    let { error } = await this.client.auth.signOut();

    if (error) {
      throw new Error(`Sign out was unsuccessful: ${error}`);
    }

    console.log("Sign out was successful, reloading...");

    // reload the page so they see the effects of their actions
    location.reload();

    return;
  }

  // gets the current JWT for the currently-logged-in user
  async GetAccessToken() {

    console.log("Calling getSession to access the current JWT...");

    let { data, error } = await this.client.auth.getSession();

    if (error) {
      throw new Error(`Error occurred in getSession: ${error}`)
    } else if (!data["session"]) {
      throw new Error("No session in getSession response, maybe not logged in?")
    } else if (!data["session"]["access_token"]) {
      throw new Error("No access_token in getSession response, maybe not logged in?")
    }

    return data["session"]["access_token"];
  }

  // gets the list of sites created by the currently-logged-in user
  async GetSites() {

    console.log("Getting from supabase the list of sites...");

    let { data, error } = await this.client.from('site').select();

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`);
    }

    return data;
  }

  // gets the list of alises for the given site
  async GetAliases(site) {

    console.log(`Getting from supabase the list of aliases for site ${site}...`);

    let { data, error } = await this.client.from('alias').select().eq('site_id', site);

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`);
    }

    return data;
  }
}

// used in the svelte router to guard routes behind authentication
// needs to live outside the supabase class since it's passed as a higher order fn
// see also https://stackoverflow.com/questions/4011793/
export async function IsLoggedIn(detail) {

  let supa = new Supabase();

  console.log(`Checking auth before proceeding to page ${detail.location}...`)

  let { data, error } = await supa.client.auth.getSession();

  if (error) {
    console.log(`Error occurred in getSession, redirecting to login: ${error}`);
    return false;
  } else if (!data["session"]) {
    console.log("No user seems to be logged in, redirecting to login");
    return false;
  } else {
    console.log(`All good, logged in as ${data["session"]["user"]["email"]}!`)
    return true;
  }
}
