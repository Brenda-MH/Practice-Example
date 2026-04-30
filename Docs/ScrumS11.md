# 🧠 SCRUM — Sprint S11 (Abr 27–30)
**Tema:** CRUD — Actualizar (`$set`, `$inc`, `$push`)  
**Proyecto:** Exam Manager App

---

## 👥 Equipo

| Rol | Nombre |
|-----|--------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| Data Modeler | Caballero Ortíz Nancy Denisse |
| Query Developer | Ortíz Morales Walther |
| Integration Specialist | Montalvo Hernandez Brenda Paola |
| Data Seeder / QA | Meza Uzcanga Vladimir |

---

## 🎯 Objetivo del Sprint

Implementar operaciones de actualización en MongoDB usando `$set`, `$inc` y `$push`, aplicadas a la colección `profiles`.

---

## 📋 Daily Scrum (Completado)

| Integrante | ¿Qué hice? | ¿Qué haré? | ¿Bloqueos? |
|------------|-----------|-----------|-----------|
| Barbara | Coordiné el sprint y revisé avances del equipo | Validar entrega final del script | Ninguno |
| Nancy | Revisé estructura de `profiles` y definí campos nuevos | Verificar compatibilidad con arrays (`comentarios`) | Ninguno |
| Walther | Implementé `$set`, `$inc` y `$push` en MongoDB Atlas | Documentar consultas en el archivo final | Ninguno |
| Brenda | Conecté el proyecto con MongoDB Atlas y probé updates | Validar cambios reflejados en la base de datos | Ninguno |
| Vladimir | Probé operaciones con "Juan Perez" y verifiqué resultados | Confirmar que todos los datos se actualizan correctamente | Ninguno |

---

## 🔧 Ejemplos aplicados

```js
// $set
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $set: { grade: "2do Semestre" } }
)

// $inc
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $inc: { examAttempts: 1 } }
)

// $push
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $push: { comentarios: "Aprobó el examen de lógica" } }
)
```

---

## ✅ Entregable

- Archivo: `scripts/update_data.js`
- Evidencia: cambios aplicados en MongoDB Atlas

---

*Proyecto: Exam Manager App | Materia: Base de Datos NoSQL | S11: Abr 27–30*
