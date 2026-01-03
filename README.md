# 💌 Invitación de Boda Digital - Daniel & Edna

Este es un proyecto de invitación web premium diseñado para ser enviado de forma personalizada a los invitados de la boda de Daniel y Edna. La invitación es interactiva, responsiva y cuenta con un sistema de confirmación vía WhatsApp.

## ✨ Características Principales

- **Cuenta Regresiva:** Un contador dinámico con animación de corazones que flotan al ritmo de los segundos.
- **Pases Personalizados:** El sistema detecta automáticamente quién es el invitado y cuántos pases tiene asignados mediante la URL.
- **Reproductor de Música:** Botón flotante para activar/desactivar la canción oficial de la boda.
- **Carrusel de Fotos:** Galería de imágenes automática para mostrar la sesión de fotos de los novios.
- **RSVP Optimizado:** Formulario de confirmación que envía un mensaje estructurado directamente al WhatsApp de los novios.

## 🔗 Uso de Parámetros en la URL (Personalización)

No necesitas crear una página para cada invitado. El sistema usa parámetros `GET` para personalizar el contenido:

### Parámetros:
- `n`: Nombre del invitado (aparecerá después de "PARA:").
- `p`: Cantidad de cupos o pases.

### Ejemplos de links:

**En Desarrollo (Local):**
`http://127.0.0.1:5500/index.html?n=JUANITO%20Y%20FAMILIA&p=4`

**En Producción (Web publicada):**
`https://danielcuellar1505.github.io/NuestraBodaDANIELyEDNA/?n=DANIEL%20%20Y%20FLIA.&p=2`

> **Importante:** Usa el símbolo `+` o `%20` para representar los espacios en el nombre.

## 🛠️ Instrucciones para Desarrolladores

### 1. Cambiar la fecha del evento
En `script.js`, localiza la constante `weddingDate` y ajusta la fecha y hora:
```javascript
const weddingDate = new Date("May 15, 2026 18:00:00").getTime();