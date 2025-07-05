// scripts/generateUsers.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { usersCollection } from '../src/lib/firebase/collections';

// Datos ficticios
const nombres = [
  'Juan',
  'María',
  'Carlos',
  'Ana',
  'Luis',
  'Elena',
  'Pedro',
  'Sofia',
  'Diego',
  'Carmen',
  'Miguel',
  'Laura',
  'Andrés',
  'Valentina',
  'Roberto',
  'Isabella',
  'Fernando',
  'Camila',
  'Alejandro',
  'Natalia',
  'Ricardo',
  'Daniela',
  'Sebastián',
  'Gabriela',
  'Martín',
  'Lucía'
];

const apellidos = [
  'García',
  'Rodríguez',
  'Martínez',
  'López',
  'González',
  'Pérez',
  'Sánchez',
  'Ramírez',
  'Cruz',
  'Torres',
  'Flores',
  'Rivera',
  'Gómez',
  'Díaz',
  'Reyes',
  'Morales',
  'Jiménez',
  'Herrera',
  'Medina',
  'Castro',
  'Ortiz',
  'Rubio',
  'Marín',
  'Iglesias',
  'Santos',
  'Delgado'
];

const profesiones = [
  'Desarrollador',
  'Diseñador',
  'Médico',
  'Abogado',
  'Ingeniero',
  'Profesor',
  'Artista',
  'Escritor',
  'Fotógrafo',
  'Chef',
  'Arquitecto',
  'Periodista',
  'Músico',
  'Emprendedor',
  'Psicólogo',
  'Veterinario',
  'Contador',
  'Consultor',
  'Estudiante',
  'Freelancer'
];

const ciudades = [
  'Buenos Aires',
  'Madrid',
  'Ciudad de México',
  'Bogotá',
  'Lima',
  'Santiago',
  'Montevideo',
  'Caracas',
  'Quito',
  'La Paz',
  'Asunción',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Guadalajara'
];

// Función para generar foto de avatar real
function generarFotoAvatar(index) {
  // Opciones de APIs gratuitas:

  // 1. This Person Does Not Exist (fotos muy realistas)
  // return `https://thispersondoesnotexist.com/image?${Date.now()}_${index}`;

  // 2. Unsplash (fotos de personas reales)
  // return `https://source.unsplash.com/400x400/?portrait,person&${index}`;

  // 3. Picsum con filtro de personas
  // return `https://picsum.photos/400/400?random=${index}`;

  // 4. RandomUser API (la más completa)
  // return `https://randomuser.me/api/portraits/men/${index % 99}.jpg`;

  // 5. Robohash (avatares únicos y divertidos)
  // return `https://robohash.org/${index}?set=set4&size=400x400`;

  // Usando una combinación para variedad
  const apis = [
    `https://randomuser.me/api/portraits/${
      Math.random() > 0.5 ? 'men' : 'women'
    }/${(index % 99) + 1}.jpg`,
    `https://source.unsplash.com/400x400/?portrait,person&sig=${index}`,
    `https://robohash.org/user${index}?set=set4&size=400x400`,
    `https://picsum.photos/seed/person${index}/400/400`
  ];

  return apis[index % apis.length];
}

// Función para generar username único
function generarUsername(nombre, apellido, index) {
  const base = `${nombre.toLowerCase()}${apellido.toLowerCase()}`;
  return `${base}${Math.floor(Math.random() * 1000)}`;
}

// Función para generar bio
function generarBio(profesion, ciudad) {
  const bios = [
    `${profesion} en ${ciudad}. Amante del café y los libros.`,
    `${profesion} | ${ciudad} | Siempre aprendiendo algo nuevo.`,
    `Viviendo en ${ciudad}. ${profesion} por pasión.`,
    `${profesion} | ${ciudad} | Fan de la tecnología y el arte.`,
    `${ciudad} es mi hogar. ${profesion} de corazón.`
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

// Función para generar número de seguidores realista
function generarSeguidores() {
  const ranges = [
    { min: 10, max: 100, weight: 50 }, // Usuarios normales
    { min: 100, max: 1000, weight: 30 }, // Usuarios activos
    { min: 1000, max: 10000, weight: 15 }, // Usuarios populares
    { min: 10000, max: 100000, weight: 5 } // Usuarios muy populares
  ];

  const random = Math.random() * 100;
  let cumulative = 0;

  for (const range of ranges) {
    cumulative += range.weight;
    if (random <= cumulative) {
      return (
        Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
      );
    }
  }

  return Math.floor(Math.random() * 100) + 10;
}

// Función para generar un usuario
function generarUsuario(index) {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  const profesion = profesiones[Math.floor(Math.random() * profesiones.length)];
  const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];

  const username = generarUsername(nombre, apellido, index);
  const displayName = `${nombre} ${apellido}`;
  const photoURL = generarFotoAvatar(index);
  const bio = generarBio(profesion, ciudad);
  const followersCount = generarSeguidores();
  const followingCount = Math.floor(Math.random() * (followersCount * 0.5)) + 5;

  return {
    id: `user_${Date.now()}_${index}`,
    username,
    displayName,
    photoURL,
    bio,
    location: ciudad,
    website: `https://${username}.com`,
    followers: [], // Array vacío, se puede poblar después
    following: [], // Array vacío, se puede poblar después
    totalTweets: Math.floor(Math.random() * 500) + 10,
    totalPhotos: Math.floor(Math.random() * 50),
    verified: Math.random() > 0.95, // 5% de usuarios verificados
    private: Math.random() > 0.9, // 10% de usuarios privados
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    // Datos adicionales
    followersCount,
    followingCount,
    theme: Math.random() > 0.5 ? 'dark' : 'light',
    accent: ['blue', 'yellow', 'pink', 'purple', 'orange', 'green'][
      Math.floor(Math.random() * 6)
    ]
  };
}

// Función principal para generar usuarios
async function generarUsuarios(cantidad = 50) {
  console.log(`🚀 Generando ${cantidad} usuarios ficticios...`);

  const usuarios = [];

  for (let i = 0; i < cantidad; i++) {
    const usuario = generarUsuario(i);
    usuarios.push(usuario);

    try {
      await setDoc(doc(usersCollection, usuario.id), usuario);
      console.log(
        `✅ Usuario ${i + 1}/${cantidad} creado: @${usuario.username}`
      );
    } catch (error) {
      console.error(`❌ Error creando usuario ${i + 1}:`, error);
    }

    // Pausa pequeña para no sobrecargar Firebase
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`🎉 ¡${cantidad} usuarios generados exitosamente!`);
  return usuarios;
}

// Ejecutar script
// Para usar: node scripts/generateUsers.js
export { generarUsuarios };

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  // Obtener cantidad desde argumentos de línea de comandos
  const cantidad = parseInt(process.argv[2]) || 50; // Por defecto 50

  console.log(`🎯 Generando ${cantidad} usuarios...`);

  generarUsuarios(cantidad)
    .then(() => {
      console.log('✨ Script completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error:', error);
      process.exit(1);
    });
}
