# T14 — Agregación en MongoDB 🧱

## Semana del 18 al 22 de mayo

---

## ¿Qué es el "Oleoducto de Agregación"?

Okay, el nombre suena raro, pero es más sencillo de lo que parece.

Un **Aggregation Pipeline** (o Oleoducto de Agregación) es básicamente una forma de procesar datos en MongoDB pasándolos por varias etapas, una tras otra. En cada etapa los datos se transforman un poco, hasta que al final obtienes el resultado que necesitabas.

### La analogía de la fábrica 🏭

Imagínate una fábrica de juguetes. Los juguetes entran por una cinta transportadora y van pasando por diferentes estaciones:

```
🧸 Juguetes sin terminar
     ↓
🔍 Estación 1: Solo pasan los que no están rotos   ($match)
     ↓
📦 Estación 2: Los separan por tipo de juguete      ($group)
     ↓
🔢 Estación 3: Cuentan cuántos hay de cada tipo     ($count)
     ↓
📊 Reporte final listo
```

Así funciona el pipeline. Los documentos de MongoDB son los "juguetes", y las etapas hacen el trabajo de filtrar, agrupar y contar.

---

## ¿Y en qué se diferencia del `find()`?

Buena pregunta. El `find()` es lo más básico que puedes hacer en MongoDB, es como preguntarle:

> *"Oye, dame todos los estudiantes que son de la UNAM."*

Nada más. Te devuelve los documentos y ya.

El **Pipeline** en cambio es como preguntarle:

> *"Agrúpame a todos los estudiantes por semestre, dime cuántos hay en cada uno, y solo muéstrame los de la UNAM."*

O sea, hace mucho más trabajo por ti.

| | `find()` | Pipeline |
|---|---|---|
| ¿Qué hace? | Busca documentos | Procesa y transforma datos |
| ¿Qué te da? | Los documentos tal cual | Resultados calculados |
| ¿Para qué sirve? | Consultas simples | Reportes, sumas, conteos |
| ¿Es complicado? | No, es sencillo | Un poco más, pero vale la pena |

---

## Los operadores que usamos 🔧

### `$match` — el filtro

Este es el más fácil. Solo deja pasar los documentos que cumplan una condición. Es prácticamente igual que el `find()`.

```javascript
{ $match: { school: "UNAM" } }
```

> Como el filtro de la cinta: si el juguete está roto, no pasa. 🚫🧸

---

### `$group` — el que agrupa

Este agrupa los documentos por algún campo. Por ejemplo, juntamos todos los del mismo semestre.

```javascript
{
  $group: {
    _id: "$grade",
    total: { $sum: 1 }
  }
}
```

- `_id` es el campo por el que agrupas (como la "categoría").
- `$sum: 1` le dice que cuente uno por cada documento que encuentre.

> Como separar los juguetes en cajas según su tipo. 📦

---

### `$count` — el que cuenta

Simple: cuenta cuántos documentos llegaron a esa etapa.

```javascript
{ $count: "total_estudiantes" }
```

> El señor al final de la cinta que anota cuántos juguetes salieron. 📋

---

## El archivo `agg_01_stats.mongodb` 📄

Este es el ejemplo que hicimos en clase: una tubería de conteo simple.

```javascript
db.profiles.aggregate([

  // Paso 1: Solo queremos los de la UNAM
  { $match: { school: "UNAM" } },

  // Paso 2: Los agrupamos por semestre y contamos cuántos hay
  {
    $group: {
      _id: "$grade",
      total: { $sum: 1 }
    }
  },

  // Paso 3: Contamos cuántos grupos salieron
  { $count: "total_registros" }

])
```

### ¿Qué pasa en cada paso?

1. **`$match`** — filtra y se queda solo con los perfiles de la UNAM.
2. **`$group`** — los agrupa por semestre y va sumando uno por cada uno.
3. **`$count`** — al final cuenta cuántos grupos distintos hubo.

---

## Errores que nos pasaron (y que te pueden pasar) 😅

### ❌ Poner `$group` antes de `$match`

Si agrupas antes de filtrar, MongoDB trabaja con todos los datos aunque luego los vayas a descartar. Es como limpiar todos los juguetes de la fábrica antes de tirar los rotos.

> ✅ Siempre pon `$match` primero.

---

### ❌ Olvidar el `_id` en `$group`

`$group` siempre necesita el campo `_id`. Si no quieres agrupar por nada en especial, usa `_id: null`.

```javascript
// ✅ Bien
{ $group: { _id: null, total: { $sum: 1 } } }

// ❌ Esto truena
{ $group: { total: { $sum: 1 } } }
```

---

### ❌ Confundir `$count` con `$sum`

- `$count` → cuenta documentos completos en una etapa.
- `$sum: 1` → se usa dentro de `$group` para ir sumando de uno en uno.

No son lo mismo, aunque los dos "cuentan" cosas.

---

## En resumen 📝

- El **Aggregation Pipeline** es como una cinta de fábrica: los datos pasan por etapas y se van transformando.
- Es mucho más poderoso que `find()` porque no solo busca, sino que **calcula y agrupa**.
- Los operadores básicos son `$match` (filtrar), `$group` (agrupar) y `$count` (contar).
- El orden de las etapas **sí importa**, y olvidar el `_id` en `$group` es el error más común.

> `find()` te da los datos. El Pipeline te da las **respuestas**. 🎯
