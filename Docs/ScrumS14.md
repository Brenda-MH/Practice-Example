# 🗂️ ScrumS14.md — Sprint 14: Aggregation Intro

**Período:** S14 · May 18 – 22  
**Tema:** Aggregation Pipeline con `$match`, `$group`, `$count`  
**Entregable clave:** `queries/agg_01_stats.mongodb`

---

## 👥 Team

| Rol | Nombre completo |
|-----|----------------|
| Scrum Master | Gomez Coria Barbara Guadalupe |
| Data Modeler | Caballero Ortíz Nancy Denisse |
| Query Developer | Ortíz Morales Walther |
| Integration Specialist | Montalvo Hernnadez Brenda Paola |
| Data Seeder / QA | Meza Uzcanga Vladimir |

---

## 🎯 Sprint Goal

Implementar el primer conjunto de pipelines de agregación en MongoDB aplicados a la colección `exam_results`, cubriendo reportes básicos de **sumas**, **conteos** y **promedios** usando `$match`, `$group`, `$sum`, `$avg` y `$count`.

---

## 📋 Product Backlog Items (PBIs) del Sprint

| ID | Historia de usuario | Responsable | Puntos | Estado |
|----|---------------------|-------------|--------|--------|
| PBI-14-01 | Como analista, quiero contar el total de estudiantes registrados para conocer el tamaño del padrón | Caballero Ortíz Nancy Denisse | 1 | ✅ Done |
| PBI-14-02 | Como docente, quiero ver cuántos exámenes existen por materia para planear la carga académica | Ortíz Morales Walther | 2 | ✅ Done |
| PBI-14-03 | Como coordinador, quiero contar alumnos aprobados (≥ 60) por examen usando `$match` + `$group` | Ortíz Morales Walther | 3 | ✅ Done |
| PBI-14-04 | Como administrador, quiero una distribución de calificaciones por rangos (`$bucket`) para identificar reprobación masiva | Caballero Ortíz Nancy Denisse | 3 | ✅ Done |
| PBI-14-05 | Como QA, quiero validar que los seeds de datos produzcan resultados coherentes en todos los pipelines | Meza Uzcanga Vladimir | 2 | ✅ Done |
| PBI-14-06 | Como integrador, quiero conectar el pipeline de reporte resumen al endpoint `/stats` de la API | Montalvo Hernnadez Brenda Paola | 5 | ✅ Done |
| PBI-14-07 | Como docente, quiero ver la tasa de acierto por pregunta (`$group` sobre `answers`) para identificar preguntas difíciles | Ortíz Morales Walther | 3 | ✅ Done |
| PBI-14-08 | Como coordinador, quiero el conteo de reprobados por examen con reporte limpio en `$project` | Caballero Ortíz Nancy Denisse | 2 | ✅ Done |

**Velocidad del sprint:** 21 puntos

---

## 🔄 Daily Stand-up Log

### Lunes 18 de mayo

| Integrante | ¿Qué hice? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|------------|----------------|------------|
| **Gomez Coria Barbara Guadalupe** | Planifiqué el Sprint Planning con el equipo | Facilitar la reunión de kick-off del sprint | Ninguno |
| **Caballero Ortíz Nancy Denisse** | Revisé el modelo de datos de `exam_results` y `answers` | Iniciar PBI-14-01: pipeline de conteo total de estudiantes | Ninguno |
| **Ortíz Morales Walther** | Estudié la documentación de `$group` y `$match` en MongoDB | Implementar PBI-14-02: conteo de exámenes por materia | Ninguno |
| **Montalvo Hernnadez Brenda Paola** | Revisé el endpoint `/stats` existente en la API Node.js | Preparar estructura del controlador para integración | Ninguno |
| **Meza Uzcanga Vladimir** | Cargué seeds frescos a la base de datos de desarrollo | Validar integridad referencial entre `students` y `exam_results` | Ninguno |

---

### Martes 19 de mayo

| Integrante | ¿Qué hice? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|------------|----------------|------------|
| **Gomez Coria Barbara Guadalupe** | Revisé avance del tablero Kanban y actualicé el burndown | Hacer seguimiento de PBI-14-03 y -04 | Ninguno |
| **Caballero Ortíz Nancy Denisse** | Completé PBI-14-01 (conteo total estudiantes) | Iniciar PBI-14-04: `$bucket` por rangos de calificación | Ninguno |
| **Ortíz Morales Walther** | Completé PBI-14-02 (conteo por materia) | Implementar PBI-14-03: aprobados por examen | Ninguno |
| **Montalvo Hernnadez Brenda Paola** | Creé el esqueleto del endpoint `/api/stats/summary` | Integrar pipeline de reporte resumen (PBI-14-06) | API no responde con el driver actualizado |
| **Meza Uzcanga Vladimir** | Validé conteos de PBI-14-01 contra seeds — OK | Comenzar pruebas de PBI-14-03 en entorno de dev | Ninguno |

---

### Miércoles 20 de mayo

| Integrante | ¿Qué hice? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|------------|----------------|------------|
| **Gomez Coria Barbara Guadalupe** | Apoyé a Brenda a resolver el conflicto de versión del driver MongoDB | Actualizar burndown y verificar velocidad del equipo | Ninguno |
| **Caballero Ortíz Nancy Denisse** | Completé PBI-14-04 (`$bucket` con rangos) | Iniciar PBI-14-08: reprobados por examen | Ninguno |
| **Ortíz Morales Walther** | Completé PBI-14-03 ($match + $group aprobados) | Avanzar PBI-14-07: tasa de acierto por pregunta | Ninguno |
| **Montalvo Hernnadez Brenda Paola** | Resolví conflicto de versión del driver (downgrade a `^6.5`) | Conectar pipeline de reporte resumen al endpoint | Ninguno |
| **Meza Uzcanga Vladimir** | Probé PBI-14-03 con datos reales — resultados consistentes | Preparar casos de prueba para PBI-14-06 y PBI-14-07 | Ninguno |

---

### Jueves 21 de mayo

| Integrante | ¿Qué hice? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|------------|----------------|------------|
| **Gomez Coria Barbara Guadalupe** | Actualicé el documento `ScrumS14.md` con avances | Preparar la revisión del Sprint Review | Ninguno |
| **Caballero Ortíz Nancy Denisse** | Completé PBI-14-08 (reprobados + `$project` limpio) | Revisión de código con Walther | Ninguno |
| **Ortíz Morales Walther** | Completé PBI-14-07 (tasa de acierto por pregunta) | Code review cruzado con Nancy | Ninguno |
| **Montalvo Hernnadez Brenda Paola** | Completé integración PBI-14-06 — endpoint `/api/stats/summary` funcional | Documentar el contrato del endpoint en README | Ninguno |
| **Meza Uzcanga Vladimir** | Ejecuté pruebas de regresión en los 7 pipelines — todos pasan | Documentar casos de prueba en el `product_backlog.md` | Ninguno |

---

### Viernes 22 de mayo

| Integrante | ¿Qué hice? | ¿Qué haré hoy? | ¿Bloqueos? |
|------------|------------|----------------|------------|
| **Gomez Coria Barbara Guadalupe** | Facilité Sprint Review y Sprint Retrospective | Actualizar el backlog para S15 | Ninguno |
| **Caballero Ortíz Nancy Denisse** | Code review final y merge de rama `feat/agg-queries` | Participar en Retrospective | Ninguno |
| **Ortíz Morales Walther** | Entregó el archivo `agg_01_stats.mongodb` en la rama principal | Participar en Retrospective | Ninguno |
| **Montalvo Hernnadez Brenda Paola** | Completó documentación del endpoint y validó en Postman | Participar en Retrospective | Ninguno |
| **Meza Uzcanga Vladimir** | Entregó reporte de QA con cobertura del 100% de los pipelines | Participar en Retrospective | Ninguno |

---

## 📊 Burndown Chart (puntos restantes por día)

```
Día       Ideal   Real
────────────────────────
Lun 18     21     21
Mar 19     14     15
Mié 20      7      8
Jue 21      2      2
Vie 22      0      0
```

---

## 🔍 Sprint Review

**Fecha:** Viernes 22 de mayo de 2026  
**Facilitadora:** Gomez Coria Barbara Guadalupe

### Demos entregadas

1. **Pipeline de conteo total** — ejecución en MongoDB Compass con resultado `{ total_estudiantes: 50 }`.
2. **Conteo por materia** — tabla de exámenes agrupados ordenada por frecuencia.
3. **Aprobados/Reprobados por examen** — resultados filtrados con `$match { totalScore: { $gte: 60 } }`.
4. **Distribución `$bucket`** — histograma de rangos 0-40, 40-60, 60-70, 70-80, 80-90, 90-100.
5. **Tasa de acierto por pregunta** — ranking de preguntas más difíciles.
6. **Endpoint `/api/stats/summary`** — demo en Postman con respuesta JSON del reporte completo.

### Feedback del Product Owner

- ✅ Los pipelines de conteo y suma cumplen el objetivo del sprint.
- ➕ Para S15 se solicita agregar `$lookup` para cruzar `exam_results` con datos de `students`.
- ➕ Considerar paginación en el endpoint `/stats/summary`.

---

## 🪞 Sprint Retrospective

### ✅ Lo que salió bien

- Comunicación clara entre Query Developer e Integration Specialist para alinear el formato de salida de los pipelines con el contrato de la API.
- El QA detectó el conflicto de versión del driver en el día 2, evitando bloqueo mayor.
- El Scrum Master facilitó la resolución del bloqueo en menos de 24 horas.

### 🔧 Lo que mejorar

- Los seeds de datos deben incluir casos límite (calificación = 0, calificación = 100) desde el inicio del sprint para pruebas más robustas.
- Configurar MongoDB en Docker compartido para que todo el equipo use el mismo entorno de desarrollo.

### 💡 Acciones para S15

| Acción | Responsable | Fecha límite |
|--------|-------------|--------------|
| Agregar casos límite al seed | Meza Uzcanga Vladimir | Lunes S15 |
| Crear `docker-compose.yml` con MongoDB | Montalvo Hernnadez Brenda Paola | Lunes S15 |
| Iniciar estudio de `$lookup` para joins | Ortíz Morales Walther | Martes S15 |
| Actualizar `product_backlog.md` con PBIs de S15 | Caballero Ortíz Nancy Denisse | Lunes S15 |

---

## 📁 Archivos entregados en este sprint

```
queries/
  └── agg_01_stats.mongodb   ← Pipeline principal del sprint
Docs/
  └── ScrumS14.md            ← Este documento
```

---

*Generado al cierre del Sprint 14 · 22/05/2026*
