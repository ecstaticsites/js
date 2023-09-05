import { writable } from "svelte/store";

// store representing the currently-selected site to view
// set by the select in the navbar, consumed by charts
export const currentSite = writable("");

// store representing the currently-selected timespan to view
// set by the select in the navbar, consumed by charts
export const currentTimespan = writable("");
