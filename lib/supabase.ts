import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gaweualdznxzvatnzvkl.supabase.co";
const supabaseKey = "sb_publishable_6I36j_7GWdfRXO629Li2Xg_O-h6BTPx";

// NOTE: Supabase Auth uses storage. On non-native runtimes (SSR / Node web build)
// `@react-native-async-storage/async-storage` can crash with `window is not defined`.
// We only attach AsyncStorage when `window` exists.
let storage: any = undefined;
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  storage = require("@react-native-async-storage/async-storage").default;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
