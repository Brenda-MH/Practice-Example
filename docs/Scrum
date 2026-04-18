# SCRUM - Sprint Semanal
## Proyecto: Exam Manager (Flutter + Node.js + MongoDB Atlas)
### Semana: Abril 13-17, 2026

---

## Equipo

| Rol | Nombre completo |
|-----|----------------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| Data Modeler | Caballero Ortiz Nancy Denisse |
| Query Developer | Ortiz Morales Walther |
| Integration Specialist | Montalvo Hernandez Brenda Paola |
| Data Seeder / QA | Uscanga Meza Vladimir |

---

## Lunes 13 de Abril - Sprint Planning

**Reunion:** 9:00 AM - 10:00 AM  
**Facilitador:** Gomez Coria Barbara Guadalupe (Scrum Master)

### Objetivos del Sprint
- Conectar backend Node.js con MongoDB Atlas
- Crear modelos `Profile` y `ExamResult` en Mongoose
- Implementar endpoints REST (`/api/profile`, `/api/results`)
- Integrar Flutter con la API mediante `ApiService`
- Implementar consultas avanzadas con operadores `$gt`, `$lt`, `$in`, `$ne`

### Tareas asignadas

| Integrante | Tarea |
|-----------|-------|
| Nancy Denisse | Disenar esquemas Mongoose (profile.model.js, examResult.model.js) |
| Walther | Implementar consultas MQL con operadores de comparacion |
| Brenda Paola | Integrar Flutter con API (api_service.dart, profile_service.dart) |
| Vladimir | Poblar base de datos con datos de prueba (seed.js) |
| Barbara | Coordinar reuniones, revisar avances y documentar |

### Errores detectados desde el inicio
- `MODULE_NOT_FOUND` al ejecutar `node server.js` desde el directorio raiz
- Confusion sobre la estructura de carpetas del proyecto

---

## Martes 14 de Abril - Daily Scrum + Desarrollo Backend

**Reunion:** 9:00 AM - 9:15 AM

### Avances
- Nancy Denisse creo los modelos `Profile` y `ExamResult` con Mongoose
- Walther configuro el archivo `.env` con `MONGO_URI` y `PORT`
- Se levanto el servidor en `http://localhost:3000`

### Errores encontrados

**Error 1 - DNS / Red:**
```
querySrv ECONNREFUSED _mongodb._tcp.cluster0.un0fhsq.mongodb.net
DNS_PROBE_FINISHED_NXDOMAIN
```
**Causa:** La red Infinitum bloqueaba la resolucion DNS de MongoDB Atlas  
**Solucion:** Cambio de DNS a `8.8.8.8` y `8.8.4.4` (Google DNS) + flush DNS

**Error 2 - URI mal formada:**
```
Invalid URL
```
**Causa:** La contrasena contenia caracteres especiales (`@`) sin codificar  
**Solucion:** Codificar `@` como `%40` en la URI de conexion

**Error 3 - Modulo no encontrado:**
```
Cannot find module 'C:\Nueva carpeta (6)\flutter_application_1\server.js'
```
**Causa:** Se ejecutaba `node server.js` desde el directorio raiz  
**Solucion:** Navegar primero a `cd lib/exam_api` antes de ejecutar

---

## Miercoles 15 de Abril - Integracion + Consultas MongoDB

**Reunion:** 9:00 AM - 9:15 AM

### Avances
- Servidor conectado exitosamente a MongoDB Atlas
- Mensaje confirmado: `Conectado a MongoDB`
- Walther implemento consultas con operadores de comparacion

### Consultas implementadas (S9: Operadores de Comparacion)

**Coleccion `profiles`:**
```js
// $in - Perfiles de UNAM o IPN
db.profiles.find({ school: { $in: ["UNAM", "IPN"] } })

// $ne - Perfiles que NO son de UNAM
db.profiles.find({ school: { $ne: "UNAM" } })
```

**Coleccion `examresults`:**
```js
// $gt - Examenes con score mayor a 5
db.examresults.find({ score: { $gt: 5 } })

// $lt - Examenes reprobados (score menor a 6)
db.examresults.find({ score: { $lt: 6 } })

// $in - Por tipo de examen
db.examresults.find({ examType: { $in: ["filosofia", "quiz"] } })

// $ne - Que NO sean de filosofia
db.examresults.find({ examType: { $ne: "filosofia" } })

// Combinado $gt + $lt - Score entre 3 y 8
db.examresults.find({ score: { $gt: 3, $lt: 8 } })
```

### Errores encontrados

**Error - Puerto ocupado:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Causa:** El servidor ya estaba corriendo en otra terminal  
**Solucion:**
```bash
npx kill-port 3000
node server.js
```

---

## Jueves 16 de Abril - Flutter + API + Validaciones

**Reunion:** 9:00 AM - 9:15 AM

### Avances
- Brenda integro `ApiService` en Flutter
- `profile_service.dart` actualizado con llamadas a MongoDB
- Perfil guardado correctamente - Status `201 Created` en Network tab
- Coleccion `profiles` con 53 documentos en Atlas
- Coleccion `examresults` con 2 documentos de prueba

### Errores encontrados

**Error - CORS bloqueando peticiones:**  
**Causa:** Flutter Web no podia conectarse a `192.168.1.75:3000`  
**Solucion:** Cambiar IP a `localhost` en `api_service.dart` y agregar headers CORS:
```js
app.use(cors({ origin: '*' }));
res.header('Access-Control-Allow-Origin', '*');
```

**Error - Datos no llegaban a MongoDB:**  
**Causa:** `profile_screen.dart` no llamaba a `ProfileService.saveProfile()`  
**Solucion:** Corregir el metodo `_saveProfile()` para que invoque el servicio

**Error - No client connected:**  
**Causa:** La app Flutter no estaba abierta en Chrome al hacer hot reload  
**Solucion:** Abrir manualmente `http://localhost:PUERTO` en Chrome

---

## Viernes 17 de Abril - QA + Sprint Review + Retrospectiva

**Reunion:** 9:00 AM - 10:30 AM

### Avances finales
- Validacion de correo unico implementada (`unique: true` en `profile.model.js`)
- Error `11000` manejado: `Este correo ya esta registrado`
- Los 3 tipos de examen guardan resultados en MongoDB:
  - `quiz_screen.dart` -> `saveExamResult()` OK
  - `philosophy_exam_screen.dart` -> `saveExamResult()` OK
  - `matching_exam_screen.dart` -> `saveExamResult()` OK
- App Flutter Web funcional y conectada a MongoDB Atlas

### Errores encontrados en QA

**Error - Correo duplicado sin mensaje claro:**  
**Causa:** El frontend no mostraba el error del servidor  
**Solucion:** Actualizar `ApiService` para retornar `{'success': false, 'error': '...'}`

**Error - Indice unico no aplicado a datos viejos:**  
**Causa:** Los 50 perfiles anteriores no tenian el campo `email` con indice unico  
**Solucion:** Drop de la coleccion y reinicio del servidor para regenerar indices

---

## Retrospectiva del Sprint

### Lo que salio bien
- Integracion completa Flutter -> Node.js -> MongoDB Atlas
- Resolucion efectiva de errores de red y DNS
- Trabajo colaborativo entre todos los roles
- Consultas MQL implementadas y probadas en Atlas

### Lo que se puede mejorar
- Documentar rutas y comandos desde el inicio
- Validar datos antes de enviarlos al servidor
- No depender de `localhost` para produccion
- Manejar errores del servidor en el frontend desde el principio

### Acciones para el siguiente sprint
- Implementar autenticacion de usuarios
- Deploy del backend (Railway / Render)
- Mejorar UI de la app
- Agregar consultas avanzadas con `$and`, `$or`, `$regex`

---
