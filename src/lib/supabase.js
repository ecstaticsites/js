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
