# 💌 Invitación de Boda Digital - Daniel & Edna

Este es un proyecto de invitación web premium diseñado para la boda de Daniel y Edna. La aplicación es interactiva, responsiva y cuenta con un sistema de seguridad y personalización validado mediante **Firebase Firestore**.

## ✨ Características Principales

- **Seguridad con Firestore:** Los nombres y pases ya no se exponen ni se manipulan directamente en la URL; se validan contra la base de datos de Google.
- **Cuenta Regresiva:** Contador dinámico con animación de partículas de corazones que se activan cada segundo.
- **Reproductor de Música:** Control interactivo para la canción oficial ("Por Primera Vez").
- **Carrusel de Fotos:** Galería automatizada con transiciones suaves para la sesión de fotos de los novios.
- **RSVP con WhatsApp:** Formulario optimizado que envía una confirmación estructurada utilizando los datos oficiales de la base de datos.

## 🔗 Sistema de Personalización (Parámetro `q`)

El sistema utiliza un único parámetro de consulta llamado `q` (*query*) para identificar al invitado de forma segura mediante su **Document ID** único de Firestore.

### Cómo generar los links:

1. Crea un documento en la colección `invitados` dentro de tu consola de Firebase.
2. Copia el **Document ID** generado automáticamente (ej: `5Xy7zA9b2WqP`).
3. Construye el enlace para el invitado añadiendo ese ID al final de la URL con `?q=`.

**Ejemplo de link final:**
`https://danielcuellar1505.github.io/NuestraBodaDANIELyEDNA/?q=5Xy7zA9b2WqP`

> **Nota de Seguridad:** Este método evita que invitados curiosos alteren el número de pases editando la URL, ya que la página solo renderiza información que existe y coincide en Firestore.

## 🛠️ Instrucciones para Desarrolladores

### 1. Configuración de Firebase
Asegúrate de que en el archivo `index.html` (o en el script de inicialización) el objeto `firebaseConfig` contenga tus credenciales actuales:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBAFepaeW5eUnAHhOepQCtMr4XcKpDleSo",
  authDomain: "bodadanieledna.firebaseapp.com",
  projectId: "bodadanieledna",
  storageBucket: "bodadanieledna.firebasestorage.app",
  messagingSenderId: "14790684526",
  appId: "1:14790684526:web:d739cd76f85d9155e25b7f",
  measurementId: "G-3PZPSJG798"
};