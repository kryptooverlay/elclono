// === CREAR_BOT_FIREBASE ===
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp
} = require('firebase/firestore');

// === CONFIG FIREBASE REAL ===
const firebaseConfig = {
  apiKey: 'AIzaSyD3Nho28pFEpy1a9WZr9CuMZdi8Vqpd4aE',
  authDomain: 'redsocial-f66a7.firebaseapp.com',
  projectId: 'redsocial-f66a7',
  storageBucket: 'redsocial-f66a7.firebasestorage.app',
  messagingSenderId: '814880069428',
  appId: '1:814880069428:web:962cf67a407f39de29b761',
  measurementId: 'G-LL4RERTMBB'
};

// === INICIALIZAR FIREBASE ===
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === CREAR_BOT_FIREBASE ===
async function crearBot() {
  const botId = 'bot001';
  const username = 'shadowtrader';

  const userData = {
    id: botId,
    username,
    name: 'Shadow Trader',
    bio: 'Observando los mercados desde las sombras',
    photoURL: '/assets/bots/shadow.png',
    coverPhotoURL: null,
    website: null,
    location: null,
    verified: true,
    theme: 'dark',
    accent: 'blue',
    followers: [],
    following: [],
    totalFollowers: 0,
    totalFollowing: 0,
    createdAt: serverTimestamp(),
    updatedAt: null,
    totalTweets: 0,
    totalPhotos: 0,
    pinnedTweet: null
  };

  const statsData = {
    likes: [],
    tweets: [],
    updatedAt: null
  };

  try {
    // Guardar el usuario
    await setDoc(doc(db, 'users', botId), userData);
    // Guardar los stats
    await setDoc(doc(db, `userStats/${botId}/stats`, 'stats'), statsData);
    // Crear subcolección de bookmarks vacía (no necesario pero compatible)
    // await setDoc(doc(db, `userBookmarks/${botId}/bookmark1`), { dummy: true }); // opcional

    console.log('✅ Bot creado con éxito:', username);
  } catch (err) {
    console.error('❌ Error al crear el bot:', err);
  }
}

crearBot();
// === FIN CREAR_BOT_FIREBASE ===
