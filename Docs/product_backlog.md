# Product Backlog

## Curso: MongoDB — Aggregation Pipelines

| Campo | Detalle |
|---|---|
| **Proyecto** | Módulo de consultas avanzadas con MongoDB |
| **Responsable** | Programador / Estudiante del curso |
| **Fecha de inicio** | 18/05/2025 |
| **Tecnologías** | MongoDB · NoSQL · Aggregation Framework · VS Code |

---

## Leyenda de Prioridad

| Prioridad | Urgencia | Sprint objetivo |
|---|---|---|
| 🔴 **Alta** | Imprescindible | Sprint 1 |
|  ♥**Media** | Importante | Sprint 1 |
|  §**Baja** | Deseable | Sprint 1 |

---

## Tabla de Historias de Usuario

| ID | Título | Descripción | Criterios de Aceptación | Prioridad | Sprint | Estimación | Responsable | Estado |
|---|---|---|---|---|---|---|---|---|
| **HU01** | Introducción al Aggregation Pipeline | Como desarrollador, quiero entender el concepto de Aggregation Pipeline usando la analogía de una línea de ensamblado para diferenciar su uso respecto a un `find()` simple. | - Explicación clara del pipeline vs `find()`. <br>- Analogía de fábrica/conveyor belt comprendida. <br>- Archivo `queries/agg_01_stats.mongodb` creado y ejecutable. | 🔴 Alta | Sprint 1 | 2 h | Programador | Realizada |
| **HU02** | Operadores básicos: `$match`, `$group`, `$count` | Como analista, quiero usar los operadores `$match`, `$group` y `$count` para generar reportes básicos de sumas y conteos sobre los datos. | - Pipeline de conteo simple funcional. <br>- Reportes de sumas y conteos ejecutados correctamente. <br>- Archivo `queries/agg_01_stats.mongodb` con al menos un ejemplo por operador. | 🔴 Alta | Sprint 1 | 3 h | Programador | Realizada |
| **HU03** | Pipeline avanzado con `$project`, `$sort` y `$limit` | Como desarrollador de UI, quiero transformar y ordenar datos usando `$project`, `$sort` y `$limit` para preparar la información que se mostrará en la interfaz. | - Datos proyectados con los campos necesarios. <br>- Resultados ordenados y limitados correctamente. <br>- Archivo `queries/agg_02_reports.mongodb` creado y ejecutable. | ♦ Media | Sprint 1 | 3 h | Programador | Pendiente |
| **HU04** | Join de colecciones con `$lookup` | Como desarrollador, quiero unir la colección `users` con `orders` usando `$lookup` para entender cómo funciona el equivalente a un JOIN de SQL en MongoDB. | - `$lookup` ejecutado correctamente entre `users` y `orders`. <br>- Diferencias y similitudes con SQL JOIN documentadas. <br>- Reporte complejo formateado generado en `queries/agg_02_reports.mongodb`. | ♦ Media | Sprint 1 | 4 h | Programador | Pendiente |
| **HU05** | Reporte complejo formateado para UI | Como equipo de frontend, quiero un reporte final bien estructurado usando el pipeline completo (`$match`, `$group`, `$project`, `$sort`, `$limit`, `$lookup`) para consumirlo directamente desde la interfaz de usuario. | - Reporte final con todos los operadores integrados. <br>- Datos listos para consumo de UI (estructura limpia y formateada). <br>- Archivo `queries/agg_02_reports.mongodb` completado y validado. | ¶ Baja | Sprint 1 | 3 h | Programador | Pendiente |

---

## Resumen del Sprint 1

| Métrica | Valor |
|---|---|
| Total de historias | 5 |
| Estimación total | 15 h |
| Historias de prioridad Alta | 2 |
| Historias de prioridad Media | 2 |
| Historias de prioridad Baja | 1 |
| Archivos a generar | `agg_01_stats.mongodb` · `agg_02_reports.mongodb` |
