# Consultas en MongoDB con CRUD: Update & Delete

## Introducción

En este ejercicio se trabajó con la colección `profiles` del proyecto **Exam Manager**, que contiene campos como `name`, `email`, `school`, `grade`, `examAttempts` y `comentarios`. Se realizaron operaciones de actualización utilizando los operadores `$set`, `$inc` y `$push`.

> Te mostraré solo unos ejemplos de las consultas que realizamos.

---

## Prompt que le preguntamos a la IA

> _"How do I add a new comment to a 'comments' array in a post document without rewriting the whole document? Explain `$push`."_

La IA nos explicó que `$push` permite agregar un elemento a un array existente sin borrar los datos anteriores. A diferencia de `$set`, que reemplaza el valor completo, `$push` solo **añade** al final de la lista.

---

## Ejemplos de Consultas

### Consulta 1 — Actualizar un campo con `$set`

Actualizamos el semestre de Juan Perez de `"1er Semestre"` a `"2do Semestre"` sin modificar ningún otro campo.

```js
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $set: { grade: "2do Semestre" } }
)
```

**Resultado:** Solo el campo `grade` cambió. El resto del documento quedó igual.

---

### Consulta 2 — Incrementar un valor con `$inc`

Sumamos 1 al campo `examAttempts` de Juan Perez. Como el campo no existía, MongoDB lo creó automáticamente con valor `1`.

```js
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $inc: { examAttempts: 1 } }
)
```

**Resultado:** El documento ahora tiene `examAttempts: 1`. Si se corre de nuevo, quedará en `2`, luego `3`, etc.

---

### Consulta 3 — Agregar a un array con `$push`

Agregamos un comentario al perfil de Juan Perez sin borrar los comentarios anteriores.

```js
db.profiles.updateOne(
  { name: "Juan Perez" },
  { $push: { comentarios: "Aprobó el examen de lógica" } }
)
```

**Resultado:** El campo `comentarios` se creó como array y quedó así:

```json
"comentarios": ["Aprobó el examen de lógica"]
```

Si se corre de nuevo con otro texto, se agrega al final:

```json
"comentarios": [
  "Aprobó el examen de lógica",
  "Completó el sprint de la semana 11"
]
```

---

## Documento antes y después

**Antes de las consultas:**

```json
{
  "name": "Juan Perez",
  "email": "juan.perez.edu@gmail.com",
  "school": "UNAM",
  "grade": "1er Semestre"
}
```

**Después de aplicar `$set`, `$inc` y `$push`:**

```json
{
  "name": "Juan Perez",
  "email": "juan.perez.edu@gmail.com",
  "school": "UNAM",
  "grade": "2do Semestre",
  "examAttempts": 1,
  "comentarios": ["Aprobó el examen de lógica"]
}
```

---

_Proyecto: Exam Manager App | Materia: Base de Datos NoSQL | S11: Abr 27–30_
