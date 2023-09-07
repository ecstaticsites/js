import { createClient } from '@supabase/supabase-js';

// singleton
export default class Supabase {

  constructor() {

    if (Supabase.instance) {
      return Supabase.instance
    }

    Supabase.instance = this;

    // TODO, get these outta here, env vars
    let supabaseUrl = 'https://ewwccbgjnulfgcvfrsvj.supabase.co';
    let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2NjYmdqbnVsZmdjdmZyc3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODE2ODUsImV4cCI6MjAwOTE1NzY4NX0.gI3YdNSC5GMkda2D2QPRMvnBdaMOS2ynfFKxis5-WKs';

    this.client = createClient(supabaseUrl, supabaseKey);
  }
}

export async function IsLoggedIn(detail) {

  console.log(`Checking auth before proceeding to page ${detail.location}...`)

  let supa = new Supabase();
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
