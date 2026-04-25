# 📚 Guía de Consultas en MongoDB
**Proyecto: Exam Manager — Operadores Lógicos**

MongoDB guarda la información en **documentos**, que se ven así:

```json
{
  "_id": "69c71c1cdb587874f9142dde",
  "name": "Juan Perez",
  "email": "juan.perez.edu@gmail.com",
  "school": "UNAM",
  "grade": "1er Semestre"
}
```

Cada cajita de esas es un documento, y todos los documentos juntos forman una **colección**. En nuestro proyecto, la colección se llama `profiles` y tiene 50 documentos (uno por cada usuario).

---

## 🗄️ Estructura de nuestra base de datos

```
examapp (base de datos)
├── profiles (colección) → 50 usuarios
└── examresults (colección) → resultados de exámenes
```

Cada usuario en `profiles` tiene estos campos:

| Campo | Qué guarda | Ejemplo |
|-------|-----------|---------|
| `_id` | ID único automático | `69c71c1cdb587874f9142dde` |
| `name` | Nombre completo | `"Juan Perez"` |
| `email` | Correo Gmail | `"juan.perez.edu@gmail.com"` |
| `school` | Escuela | `"UNAM"` |
| `grade` | Semestre | `"1er Semestre"` |

---

## 🛠️ Complicaciones que tuvimos y cómo las resolvimos

### Complicación 1: Correos duplicados en la base de datos ❌

**¿Qué pasó?** Al intentar agregar el índice `unique: true` al campo `email` en el modelo de Mongoose, el servidor lanzaba este error:

```
MongoServerError: E11000 duplicate key error collection: examapp.profiles
```

**¿Por qué pasó?** Ya existían documentos en la colección con correos repetidos (o con formato `escuela.edu.mx`). MongoDB no puede crear un índice único si ya hay datos duplicados.

**¿Cómo lo resolvimos?** Borramos todos los documentos anteriores desde Atlas:

```
Atlas → Browse Collections → profiles → Delete All Documents
```

Luego reiniciamos el servidor para que Mongoose creara el índice limpio desde cero.

---

### Complicación 2: El correo no validaba el formato Gmail ❌

**¿Qué pasó?** Usuarios podían registrarse con correos como `usuario@hotmail.com` o `usuario@escuela.edu.mx` sin ningún error.

**¿Por qué pasó?** El modelo de Mongoose no tenía ninguna validación de formato en el campo `email`.

**¿Cómo lo resolvimos?** Agregamos una validación con expresión regular en `profile.model.js`:

```js
email: {
  type: String,
  required: true,
  unique: true,
  match: [/^[a-zA-Z0-9._%+\-]+@gmail\.com$/, 'Solo se permiten correos @gmail.com']
}
```

Y también en Flutter, antes de enviar al servidor:

```dart
final _gmailRegex = RegExp(r'^[a-zA-Z0-9._%+\-]+@gmail\.com$');
if (!_gmailRegex.hasMatch(email)) {
  // Mostrar error al usuario
}
```

---

### Complicación 3: El servidor devolvía error 11000 sin mensaje claro ❌

**¿Qué pasó?** Cuando alguien intentaba registrarse con un correo ya existente, la app mostraba un error genérico sin explicar qué pasó.

**¿Por qué pasó?** El bloque `catch` del servidor no estaba manejando el error específico de duplicado de MongoDB (código `11000`).

**¿Cómo lo resolvimos?** Agregamos un manejador específico en `server.js`:

```js
} catch (err) {
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Este correo ya está registrado' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
```

Ahora Flutter recibe el mensaje exacto y lo muestra al usuario con un SnackBar rojo.

---

### Complicación 4: Los 50 usuarios de ejemplo tenían correos inválidos ❌

**¿Qué pasó?** Al insertar los datos de prueba directamente en Atlas, algunos documentos tenían correos con formato `@escuela.edu.mx`, lo que rompía la validación nueva de Gmail.

**¿Por qué pasó?** Los datos de ejemplo fueron creados antes de definir la regla de solo Gmail.

**¿Cómo lo resolvimos?** Generamos un nuevo archivo `seeds.json` con los 50 usuarios usando únicamente correos `@gmail.com` y los importamos directamente en Atlas:

```
Atlas → Browse Collections → profiles
→ Add Data → Import JSON or CSV file
→ Seleccionar seeds.json
```

---

## 📋 Las Consultas con Operadores Lógicos — Explicación paso a paso

### ¿Dónde se ejecutan?
En **MongoDB Atlas**: Data Explorer → `examapp` → `profiles` → escribes la consulta en el cuadro de búsqueda y das clic en **"Find"**.

---

### Consulta 1: `$and` explícito — Escuela Y semestre específico

```js
db.profiles.find({
  $and: [
    { school: "UNAM" },
    { grade: "5to Semestre" }
  ]
})
```

**¿Qué hace?** El operador `$and` exige que **TODAS** las condiciones se cumplan al mismo tiempo. Busca alumnos que sean de UNAM **Y** que estén en 5to semestre.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school = 'UNAM' AND grade = '5to Semestre';
```

**Resultado:** Solo los alumnos que cumplan ambas condiciones simultáneamente.

---

### Consulta 2: `$and` implícito — Forma corta

```js
db.profiles.find({ school: "IPN", grade: "3er Semestre" })
```

**¿Qué hace?** Cuando pones dos campos separados por coma, MongoDB los trata automáticamente como un `$and`. Es exactamente igual a la consulta anterior pero más corta.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school = 'IPN' AND grade = '3er Semestre';
```

> 💡 **Diferencia clave:** `$and` explícito se usa cuando necesitas aplicar **dos condiciones sobre el mismo campo**. El implícito solo funciona con campos diferentes.

---

### Consulta 3: `$or` — Uno u otro

```js
db.profiles.find({
  $or: [
    { school: "UNAM" },
    { school: "IPN" }
  ]
})
```

**¿Qué hace?** El operador `$or` devuelve documentos que cumplan **AL MENOS UNA** de las condiciones. Alumnos de UNAM **O** de IPN.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school = 'UNAM' OR school = 'IPN';
```

**Resultado:** Todos los alumnos de cualquiera de las dos escuelas.

---

### Consulta 4: `$or` con campos diferentes

```js
db.profiles.find({
  $or: [
    { school: "Tec de Monterrey" },
    { grade: "9no Semestre" }
  ]
})
```

**¿Qué hace?** Busca alumnos que sean del Tec **O** que estén en 9no semestre (aunque sean de otra escuela).

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school = 'Tec de Monterrey' OR grade = '9no Semestre';
```

---

### Consulta 5: `$not` — Negar una condición

```js
db.profiles.find({
  school: { $not: { $eq: "UNAM" } }
})
```

**¿Qué hace?** El operador `$not` niega la condición que tiene adentro. Devuelve todos los alumnos que **NO** sean de UNAM.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school != 'UNAM';
```

---

### Consulta 6: `$not` con expresión regular

```js
db.profiles.find({
  email: { $not: /escuela\.edu\.mx/ }
})
```

**¿Qué hace?** Busca todos los documentos cuyo correo **NO** contenga `escuela.edu.mx`. Útil para filtrar correos que no son Gmail.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE email NOT LIKE '%escuela.edu.mx%';
```

---

### Consulta 7: Combinando `$and` con `$or`

```js
db.profiles.find({
  $and: [
    { $or: [{ school: "UNAM" }, { school: "IPN" }] },
    { grade: "5to Semestre" }
  ]
})
```

**¿Qué hace?** Busca alumnos que sean de UNAM o IPN **Y** que además estén en 5to semestre. Combina los dos operadores.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE (school = 'UNAM' OR school = 'IPN') AND grade = '5to Semestre';
```

---

### Consulta 8: `$and` con `$not` — Excluir una escuela de un semestre

```js
db.profiles.find({
  $and: [
    { grade: "3er Semestre" },
    { school: { $not: { $eq: "Ibero" } } }
  ]
})
```

**¿Qué hace?** Busca alumnos en 3er semestre que **NO** sean de la Ibero.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE grade = '3er Semestre' AND school != 'Ibero';
```

---

### Consulta 9: `$or` con tres opciones

```js
db.profiles.find({
  $or: [
    { school: "UNAM" },
    { school: "IPN" },
    { school: "Tec de Monterrey" }
  ]
})
```

**¿Qué hace?** Devuelve alumnos de cualquiera de las tres escuelas.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school IN ('UNAM', 'IPN', 'Tec de Monterrey');
```

> 💡 **Tip:** Para listas largas, MongoDB tiene el operador `$in` que hace lo mismo de forma más corta: `{ school: { $in: ["UNAM", "IPN", "Tec de Monterrey"] } }`

---

### Consulta 10: Contar con operador lógico

```js
db.profiles.countDocuments({
  $or: [
    { school: "UNAM" },
    { school: "IPN" }
  ]
})
```

**¿Qué hace?** Cuenta cuántos alumnos son de UNAM o IPN, sin mostrar los documentos.

**Equivalente en SQL:**
```sql
SELECT COUNT(*) FROM profiles 
WHERE school = 'UNAM' OR school = 'IPN';
```

---

### Consulta 11: `$and` con proyección

```js
db.profiles.find(
  { $and: [{ school: "UNAM" }, { grade: "1er Semestre" }] },
  { name: 1, email: 1, _id: 0 }
)
```

**¿Qué hace?** Filtra con `$and` y además solo muestra nombre y correo (oculta el resto).

**Equivalente en SQL:**
```sql
SELECT name, email FROM profiles 
WHERE school = 'UNAM' AND grade = '1er Semestre';
```

---

### Consulta 12: `$or` con sort

```js
db.profiles.find({
  $or: [{ school: "Anáhuac" }, { school: "UP" }]
}).sort({ name: 1 })
```

**¿Qué hace?** Busca alumnos de Anáhuac o UP y los ordena alfabéticamente por nombre.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE school = 'Anáhuac' OR school = 'UP'
ORDER BY name ASC;
```

---

### Consulta 13: `$not` con `$regex` para validar Gmail

```js
db.profiles.find({
  email: { $not: /^[a-zA-Z0-9._%+\-]+@gmail\.com$/ }
})
```

**¿Qué hace?** Encuentra todos los documentos cuyo correo **NO** sea un Gmail válido. Útil para auditar la base de datos.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles 
WHERE email NOT REGEXP '^[a-zA-Z0-9._%+\\-]+@gmail\\.com$';
```

---

### Consulta 14: Aggregation con `$match` y operador lógico

```js
db.profiles.aggregate([
  {
    $match: {
      $or: [{ school: "UNAM" }, { school: "IPN" }]
    }
  },
  {
    $group: { _id: "$school", total: { $sum: 1 } }
  },
  {
    $sort: { total: -1 }
  }
])
```

**¿Qué hace?** Filtra solo alumnos de UNAM o IPN, luego los agrupa por escuela y cuenta cuántos hay en cada una.

**Equivalente en SQL:**
```sql
SELECT school, COUNT(*) as total 
FROM profiles 
WHERE school = 'UNAM' OR school = 'IPN'
GROUP BY school 
ORDER BY total DESC;
```

**Resultado esperado:**
```json
[
  { "_id": "UNAM", "total": 10 },
  { "_id": "IPN", "total": 10 }
]
```

---

### Consulta 15: `$and` + `$not` + proyección + sort (consulta completa)

```js
db.profiles.find(
  {
    $and: [
      { $or: [{ school: "UNAM" }, { school: "IPN" }, { school: "UAM" }] },
      { grade: { $not: { $eq: "9no Semestre" } } }
    ]
  },
  { name: 1, school: 1, grade: 1, _id: 0 }
).sort({ school: 1, grade: 1 })
```

**¿Qué hace?** Busca alumnos de UNAM, IPN o UAM que **NO** estén en 9no semestre, muestra solo nombre, escuela y grado, y los ordena por escuela y luego por semestre.

**Equivalente en SQL:**
```sql
SELECT name, school, grade 
FROM profiles 
WHERE school IN ('UNAM', 'IPN', 'UAM') AND grade != '9no Semestre'
ORDER BY school ASC, grade ASC;
```

---

## 🏁 Resumen de Operadores Lógicos

| Operador | ¿Para qué sirve? | Ejemplo |
|----------|-----------------|---------|
| `$and` | Todas las condiciones deben cumplirse | UNAM **y** 3er semestre |
| `$or` | Al menos una condición debe cumplirse | UNAM **o** IPN |
| `$not` | Niega la condición | **No** es de UNAM |
| Implícito (`,`) | Igual que `$and` pero más corto | `{ a: 1, b: 2 }` |

### Diferencia clave con SQL

| MongoDB | SQL |
|---------|-----|
| `$and: [{...}, {...}]` | `WHERE ... AND ...` |
| `$or: [{...}, {...}]` | `WHERE ... OR ...` |
| `$not: { $eq: valor }` | `WHERE campo != valor` |
| `$not: /regex/` | `WHERE campo NOT LIKE ...` |

---

*Proyecto: Exam Manager App | Materia: Base de Datos NoSQL | S10: Abr 20-24*
