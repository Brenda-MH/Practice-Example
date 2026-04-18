# Reporte Digital - Proyecto Exam Manager
## Integracion Flutter + Node.js + MongoDB Atlas

**Fecha:** Abril 17, 2026  
**Materia:** Base de Datos  
**Semana:** S9 - Operadores de Comparacion

---

## 1. Datos del Equipo

| Rol | Nombre completo |
|-----|----------------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| Data Modeler | Caballero Ortiz Nancy Denisse |
| Query Developer | Ortiz Morales Walther |
| Integration Specialist | Montalvo Hernandez Brenda Paola |
| Data Seeder / QA | Uscanga Meza Vladimir |

---

## 2. Descripcion del Proyecto

**Exam Manager** es una aplicacion desarrollada en Flutter que permite a estudiantes:

- Crear y gestionar su perfil personal
- Realizar examenes de distintas materias (Filosofia, Quiz, Biologia)
- Consultar su historial de examenes y calificaciones
- Ver su promedio general y examenes aprobados/reprobados

Los datos se almacenan de forma persistente en **MongoDB Atlas** mediante una API REST desarrollada en **Node.js + Express**.

---

## 3. Arquitectura del Sistema

```
Flutter Web App
     |
     v
ApiService (http)
     |
     v
Node.js + Express (localhost:3000)
     |
     v
Mongoose (ODM)
     |
     v
MongoDB Atlas (examapp)
```

### Tecnologias utilizadas

| Capa | Tecnologia |
|------|------------|
| Frontend | Flutter (Dart) |
| Backend | Node.js + Express |
| Base de datos | MongoDB Atlas |
| ODM | Mongoose |
| Almacenamiento local | SharedPreferences |
| HTTP Client | package:http |

---

## 4. Estructura del Proyecto

```
flutter_application_1/
  lib/
    exam_api/
      models/
        profile.model.js
        examResult.model.js
      server.js
      .env
      seed.js
    models/
      exam.dart
      student.dart
      exam_result.dart
    screens/
      profile_screen.dart
      quiz_screen.dart
      philosophy_exam_screen.dart
      matching_exam_screen.dart
      dashboard_screen.dart
    services/
      api_service.dart
      profile_service.dart
      data_service.dart
      app_theme.dart
    main.dart
```

---

## 5. Modelos de Base de Datos

### Coleccion: `profiles`

```js
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  school: String,
  grade: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Coleccion: `examresults`

```js
{
  _id: ObjectId,
  profileId: ObjectId (ref: Profile),
  examName: String,
  examType: String,
  score: Number,
  maxScore: Number,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. Endpoints de la API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/api/profile` | Crear nuevo perfil |
| GET | `/api/profile/:id` | Obtener perfil por ID |
| PUT | `/api/profile/:id` | Actualizar perfil |
| POST | `/api/results` | Guardar resultado de examen |
| GET | `/api/results/:profileId` | Obtener resultados por perfil |
| GET | `/api/boleta/:profileId` | Obtener boleta con promedio |
| GET | `/api/health` | Verificar estado del servidor |

---

## 7. Consultas MQL Implementadas (S9)

### Operadores de Comparacion: `$gt`, `$lt`, `$in`, `$ne`

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

---

## 8. Problemas Encontrados y Soluciones

| Error | Causa | Solucion |
|-------|-------|----------|
| `MODULE_NOT_FOUND` | Ejecutar `node server.js` desde directorio raiz | Navegar a `cd lib/exam_api` primero |
| `querySrv ECONNREFUSED` | Red Infinitum bloqueaba DNS de Atlas | Cambiar DNS a `8.8.8.8` y `8.8.4.4` |
| `Invalid URL` | Contrasena con `@` sin codificar | Codificar `@` como `%40` en la URI |
| `EADDRINUSE port 3000` | Puerto ya ocupado por otra instancia | Ejecutar `npx kill-port 3000` |
| CORS bloqueado | Flutter Web no alcanzaba IP local | Cambiar a `localhost` + headers CORS |
| Datos no llegaban a MongoDB | `profile_screen.dart` no llamaba al servicio | Corregir metodo `_saveProfile()` |
| `No client connected` | App no abierta en Chrome al hacer reload | Abrir manualmente en Chrome |
| Correo duplicado sin error | Falta de indice unico en modelo | Agregar `unique: true` al campo email |

---

## 9. Validaciones Implementadas

- **Correo unico:** El campo `email` tiene `unique: true` en Mongoose
- **Error 11000:** El servidor retorna `Este correo ya esta registrado` si se repite
- **Nombre requerido:** El campo `name` es obligatorio para crear un perfil
- **Campos requeridos en resultados:** `profileId`, `examName`, `score` y `maxScore` son obligatorios

---

## 10. Flujo de Guardado de Datos

```
Usuario llena perfil en Flutter
        |
        v
profile_screen.dart -> _saveProfile()
        |
        v
ProfileService.saveProfile()
        |
        +-> SharedPreferences (local)
        |
        +-> ApiService.saveProfile() -> POST /api/profile -> MongoDB

Usuario termina examen
        |
        v
quiz/philosophy/matching_screen.dart
        |
        v
ProfileService.saveExamResult()
        |
        +-> SharedPreferences (local)
        |
        +-> ApiService.saveExamResult() -> POST /api/results -> MongoDB
```

---

## 11. Evidencias

- Coleccion `profiles`: **53 documentos** registrados en MongoDB Atlas
- Coleccion `examresults`: **2 documentos** de prueba registrados
- Status `201 Created` confirmado en Network tab de Chrome DevTools
- Servidor corriendo en `http://localhost:3000` con conexion exitosa a Atlas

---

## 12. Conclusiones

- Se logro la integracion completa entre Flutter, Node.js y MongoDB Atlas
- Los datos de perfiles y examenes se persisten correctamente en la nube
- Se implementaron consultas avanzadas con operadores de comparacion MQL
- Se resolvieron problemas de red, DNS, CORS y validacion de datos
- La aplicacion es funcional como plataforma de examenes con historial persistente

---

## 13. Referencias

- [MongoDB Atlas](https://cloud.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Flutter HTTP Package](https://pub.dev/packages/http)
- [Express.js](https://expressjs.com/)

---


