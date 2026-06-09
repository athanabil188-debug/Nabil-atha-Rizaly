import { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Text,
  TextInput,
  IconButton,
  Appbar,
  Avatar,
} from "react-native-paper";
import { useRouter } from "expo-router";

type Message = {
  id: string;
  text: string;
  sender: "me" | "seller";
};

export default function PesanScreen() {
  const router = useRouter();

  // ✅ CHAT AWAL = SUPPORT
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo 👋, ada kendala atau bug di aplikasi? Silakan jelaskan ya, kami siap membantu 😊",
      sender: "seller",
    },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList<Message>>(null);

  // ✅ AUTO REPLY LOGIC
  const getAutoReply = (text: string) => {
    const msg = text.toLowerCase();

    if (msg.includes("error") || msg.includes("bug")) {
      return "Mohon maaf atas kendalanya 🙏, bisa jelaskan errornya seperti apa?";
    }

    if (msg.includes("tidak bisa") || msg.includes("gagal")) {
      return "Baik kak, sepertinya ada masalah. Coba jelaskan lebih detail ya 👍";
    }

    if (msg.includes("whatsapp")) {
      return "Jika WhatsApp tidak bisa dibuka, silakan gunakan chat ini ya 😊";
    }

    return "Terima kasih atas laporannya 🙏, tim kami akan membantu.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // ✅ AUTO REPLY DARI "SELLER / CS"
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoReply(userMessage),
        sender: "seller",
      };

      setMessages((prev) => [...prev, reply]);

      flatListRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";

    return (
      <View
        style={[styles.messageContainer, isMe ? styles.right : styles.left]}
      >
        <View
          style={[styles.bubble, isMe ? styles.myBubble : styles.sellerBubble]}
        >
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />

        <View style={styles.headerContent}>
          <Avatar.Text size={36} label="CS" />
          <Appbar.Content title="Customer Support" subtitle="Online" />
        </View>
      </Appbar.Header>

      {/* CHAT */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />

      {/* INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ketik pesan..."
            style={styles.input}
            mode="outlined"
          />
          <IconButton icon="send" size={24} onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  chatContainer: {
    padding: 10,
  },

  messageContainer: {
    marginVertical: 5,
    flexDirection: "row",
  },

  left: {
    justifyContent: "flex-start",
  },

  right: {
    justifyContent: "flex-end",
  },

  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
  },

  myBubble: {
    backgroundColor: "#DCF8C6",
  },

  sellerBubble: {
    backgroundColor: "#fff",
  },

  text: {
    color: "#000",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    marginRight: 10,
  },
});
