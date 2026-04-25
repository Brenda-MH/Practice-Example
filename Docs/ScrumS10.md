# SCRUM - Sprint Semanal

**Sprint:** S10 – Abr 20-24  
**Tema:** Operadores Lógicos `$and`, `$or`, `$not`  
**Archivo de entrega:** `queries/03_logic.mongodb`

---

## Equipo

| Rol | Nombre completo |
|-----|----------------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| The Data Modeler | Caballero Ortíz Nancy Denisse |
| The Query Developer | Ortíz Morales Walther |
| The Integration Specialist | Montalvo Hernnadez Brenda Paola |
| The Data Seeder / QA | Uscanga Meza Vladimir |

---

## Objetivo del Sprint

Aprender y aplicar los operadores lógicos de MongoDB (`$and`, `$or`, `$not`) mediante consultas complejas de negocio sobre la base de datos del proyecto.

---

## Tareas por Integrante

### Caballero Ortíz Nancy Denisse — Data Modeler
- [ ] Identificar los campos de las colecciones útiles para consultas lógicas
- [ ] Documentar la estructura de `profiles` y `examresults`

### Ortíz Morales Walther — Query Developer
- [ ] Crear el archivo `queries/03_logic.mongodb`
- [ ] Escribir consulta con `$and`
- [ ] Escribir consulta con `$or`
- [ ] Escribir consulta con `$not`
- [ ] Comentar cada consulta explicando qué hace

### Montalvo Hernnadez Brenda Paola — Integration Specialist
- [ ] Probar las consultas contra la base de datos real en Atlas
- [ ] Verificar que los resultados sean correctos

### Uscanga Meza Vladimir — Data Seeder / QA
- [ ] Confirmar que los datos de prueba permiten ejecutar los 3 operadores
- [ ] Validar resultados de cada consulta

### Gomez Coria Barbara Guadalupe — Scrum Master
- [ ] Coordinar el Daily Scrum diario
- [ ] Registrar avances y bloqueos
- [ ] Asegurar entrega del archivo antes del cierre del sprint

---

## Consultas a Implementar

### `$and` — Ambas condiciones deben cumplirse
```js
db.profiles.find({
  $and: [
    { school: "UNAM" },
    { grade: "5to Semestre" }
  ]
})
```

### `$or` — Al menos una condición debe cumplirse
```js
db.examresults.find({
  $or: [
    { passed: true },
    { score: { $gte: 8 } }
  ]
})
```

### `$not` — Niega la condición
```js
db.profiles.find({
  email: { $not: /escuela\.edu\.mx/ }
})
```

---

## Daily Scrum

| Integrante | ¿Qué hice ayer? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|----------------|----------------|------------|
| Barbara Guadalupe | | | |
| Nancy Denisse | | | |
| Walther | | | |
| Brenda Paola | | | |
| Vladimir | | | |

---

