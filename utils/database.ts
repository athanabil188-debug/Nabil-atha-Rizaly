// import { Platform } from 'react-native';

// let _db: any = null;
// let _SQLite: any = null;

// // Function to initialize and get the database instance
// export async function getDatabase() {
//   if (Platform.OS === 'web') {
//     console.warn('SQLite is not supported on web platform');
//     return null;
//   }

//   if (!_db) {
//     const SQLiteModule = await import('expo-sqlite');
//     _SQLite = SQLiteModule;
//     _db = _SQLite.openDatabaseSync('books.db', {
//       useNewConnection: true,
//     });
//   }

//   return _db;
// }

// // Function to check if SQLite is available
// export function isSQLiteAvailable(): boolean {
//   return Platform.OS !== 'web';
// }
