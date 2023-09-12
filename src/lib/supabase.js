import { createClient } from '@supabase/supabase-js';

export default class Supabase {

  // basic singleton pattern, works best if we only have one of these
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

  // used in the svelte router to guard routes behind authentication
  async function IsLoggedIn(detail) {

    console.log(`Checking auth before proceeding to page ${detail.location}...`)

    let { data, error } = await this.client.auth.getSession();

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

  // gets the list of sites created by the currently-logged-in user
  async function GetSites() {

    console.log("Getting from supabase the list of sites...");

    let { data, error } = await this.client.from('site').select();

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`);
    }

    return data;
  }

  // gets the list of alises for the given site
  async function GetAliases(site) {

    console.log(`Getting from supabase the list of aliases for site ${site}...`);

    let { data, error } = await this.client.from('alias').select().eq('site_id', site);

    if (error) {
      throw new Error(`Couldn't get data from supabase: ${error}`);
    }

    return data;
  }
}
