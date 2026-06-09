import { View, Text, Button } from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Budget() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("auth");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Budget Page 🎉</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
