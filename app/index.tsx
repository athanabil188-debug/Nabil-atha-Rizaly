import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/auth"} />;
}

// import * as ImagePicker from "expo-image-picker";
// import { useEffect, useState } from "react";
// import { Image, Text, View, Alert } from "react-native";
// import {
//   Appbar,
//   Button,
//   Card,
//   Dialog,
//   Portal,
//   TextInput,
// } from "react-native-paper";
// import { getDatabase, isSQLiteAvailable } from "../utils/database";

// export default function BooksPage() {
//   const [visible, setVisible] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     releaseyear: "",
//     category: "",
//     description: "",
//     image: "",
//   });

//   // inisialisasi database
//   useEffect(() => {
//     if (isSQLiteAvailable()) {
//       initDataBase();
//     }
//   }, []);

//   async function initDataBase() {
//     try {
//       const db = await getDatabase();
//       if (db) {
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS books (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             title TEXT,
//             author TEXT,
//             releaseyear TEXT,
//             category TEXT,
//             description TEXT,
//             image TEXT
//           );
//         `);
//         console.log("Database initialized successfully");
//       }
//     } catch (error) {
//       console.error("DB Error:", error);
//     }
//   }

//   // pilih gambar
//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setFormData({
//           ...formData,
//           image: result.assets[0].uri,
//         });
//       }
//     } catch (e) {
//       console.error(e);
//       Alert.alert("Error", "Gagal memilih gambar");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Appbar */}
//       <Appbar.Header>
//         <Appbar.Content title="Books Page" />
//         <Appbar.Action icon="plus" onPress={() => setVisible(true)} />
//       </Appbar.Header>

//       {/* Content */}
//       <View style={{ padding: 8 }}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             gap: 12,
//           }}
//         >
//           <Card style={{ width: "48%" }}>
//             <Card.Cover
//               source={{
//                 uri: "https://i.ebayimg.com/images/g/ilMAAOSwinNmZnlN/s-l1600.webp",
//               }}
//             />
//             <Card.Content>
//               <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                 Casino Royale
//               </Text>
//               <Text>by Ian Fleming</Text>
//               <Text style={{ marginTop: 4 }}>
//                 An intriguing description of the great book.
//               </Text>
//             </Card.Content>
//           </Card>

//           <Card style={{ width: "48%" }}>
//             <Card.Cover
//               source={{
//                 uri: "https://i.ebayimg.com/images/g/ilMAAOSwinNmZnlN/s-l1600.webp",
//               }}
//             />
//             <Card.Content>
//               <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                 Casino Royale
//               </Text>
//               <Text>by Ian Fleming</Text>
//               <Text style={{ marginTop: 4 }}>
//                 An intriguing description of the great book.
//               </Text>
//             </Card.Content>
//           </Card>
//         </View>
//       </View>

//       {/* Dialog */}
//       <Portal>
//         <Dialog visible={visible} onDismiss={() => setVisible(false)}>
//           <Dialog.Title>Add New Book</Dialog.Title>

//           <Dialog.Content>
//             {/* Image Preview */}
//             <View style={{ alignItems: "center", marginBottom: 12 }}>
//               {formData.image ? (
//                 <Image
//                   source={{ uri: formData.image }}
//                   style={{ width: 120, height: 160, borderRadius: 8 }}
//                 />
//               ) : (
//                 <View
//                   style={{
//                     width: 120,
//                     height: 160,
//                     backgroundColor: "#eee",
//                     borderRadius: 8,
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text style={{ textAlign: "center" }}>No Image</Text>
//                 </View>
//               )}
//             </View>

//             <Button onPress={pickImage} mode="outlined">
//               Pilih Gambar
//             </Button>

//             <TextInput
//               mode="outlined"
//               label="Judul Buku"
//               value={formData.title}
//               onChangeText={(text) => setFormData({ ...formData, title: text })}
//               style={{ marginBottom: 12 }}
//             />

//             <TextInput
//               mode="outlined"
//               label="Penulis"
//               value={formData.author}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, author: text })
//               }
//               style={{ marginBottom: 12 }}
//             />

//             <TextInput
//               mode="outlined"
//               label="Tahun"
//               keyboardType="number-pad"
//               value={formData.releaseyear}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, releaseyear: text })
//               }
//               style={{ marginBottom: 12 }}
//             />

//             <TextInput
//               mode="outlined"
//               label="Kategori"
//               value={formData.category}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, category: text })
//               }
//               style={{ marginBottom: 12 }}
//             />

//             <TextInput
//               mode="outlined"
//               label="Deskripsi"
//               multiline
//               numberOfLines={4}
//               value={formData.description}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, description: text })
//               }
//             />
//           </Dialog.Content>

//           <Dialog.Actions>
//             <Button onPress={() => setVisible(false)}>Cancel</Button>
//             <Button
//               onPress={() => {
//                 console.log(formData);
//                 setVisible(false);
//               }}
//             >
//               Save
//             </Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </View>
//   );
// }
