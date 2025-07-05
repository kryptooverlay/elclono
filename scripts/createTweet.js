// === CREAR_TWEET_BOT ===
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
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

// === CREAR_TWEET_BOT ===
async function crearTweetDelBot() {
  const tweet = {
    createdBy: 'bot001', // ID del bot
    text: 'El mercado es una ilusión compartida 📈', // Texto visible
    images: null, // o array de URLs
    parent: null, // null para tweet raíz
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    userLikes: [], // ✅ ARRAY, no número
    userReplies: 0,
    userRetweets: [] // ✅ ARRAY, no número
  };

  try {
    const tweetsCollection = collection(db, 'tweets');
    const ref = await addDoc(tweetsCollection, tweet);
    console.log('✅ Tweet creado con ID:', ref.id);
  } catch (err) {
    console.error('❌ Error al crear el tweet:', err);
  }
}

crearTweetDelBot();
// === FIN CREAR_TWEET_BOT ===
