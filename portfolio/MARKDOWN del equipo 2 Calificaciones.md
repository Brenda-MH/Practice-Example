# 📚 Guía de Consultas en MongoDB
## Proyecto: Exam Manager — Base de datos de 50 usuarios
### T8: CRUD Read (Básico) — find(), findOne(), Proyecciones

---

Imagina que tienes una libreta donde guardas información de tus compañeros de clase. En esa libreta cada persona tiene su propia hoja con su nombre, correo, escuela y semestre. MongoDB hace exactamente eso, pero de forma digital y súper rápida.

MongoDB guarda la información en algo que se llama **documentos**, que se ven así:

```json
{
  "_id": "69c71c1cdb587874f9142dde",
  "name": "Carlos Mendoza López",
  "email": "carlos.mendoza@escuela.edu.mx",
  "school": "UNAM",
  "grade": "3er Semestre"
}
```

Cada cajita de esas es un **documento**, y todos los documentos juntos forman una **colección** (que sería como toda la libreta). En nuestro proyecto, la colección se llama `profiles` y tiene **50 documentos** (uno por cada usuario).

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
| `name` | Nombre completo | `"Carlos Mendoza López"` |
| `email` | Correo electrónico | `"carlos.mendoza@escuela.edu.mx"` |
| `school` | Escuela | `"UNAM"` |
| `grade` | Semestre | `"3er Semestre"` |

---

## 🛠️ Complicaciones que tuvimos y cómo las resolvimos

### Complicación 1: El servidor no se conectaba a MongoDB Atlas ❌

**¿Qué pasó?**
Cuando intentamos correr el servidor Node.js para conectarlo a MongoDB Atlas (la versión en la nube), nos apareció este error:

```
❌ Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.un0fhsq.mongodb.net
```

**¿Por qué pasó?**
MongoDB Atlas tiene una lista de IPs permitidas (como una lista de invitados en una fiesta). Nuestra computadora no estaba en la lista, entonces MongoDB dijo "tú no puedes entrar".

**¿Cómo lo resolvimos?**
Fuimos a MongoDB Atlas → Security → Network Access y agregamos `0.0.0.0/0` que significa "dejar entrar a cualquier IP". Esto funciona para desarrollo, aunque en producción sería más seguro.

---

### Complicación 2: El archivo `.env` apuntaba a MongoDB local en vez de Atlas ❌

**¿Qué pasó?**
El archivo `.env` (que es donde guardamos la dirección de la base de datos) tenía esto:

```
MONGO_URI=mongodb://localhost:27017/examapp
```

Eso significa "conéctate a MongoDB que está instalado en esta misma computadora". Pero nosotros queríamos conectarnos a la nube (Atlas).

**¿Cómo lo resolvimos?**
Cambiamos la URI a la dirección correcta de Atlas:

```
MONGO_URI=mongodb+srv://owalther01_db_user:password@cluster0.un0fhsq.mongodb.net/examapp
PORT=3000
```

La diferencia es que `mongodb+srv://` significa "conéctate por internet a Atlas", mientras que `mongodb://localhost` significa "conéctate aquí en mi computadora".

---

### Complicación 3: La terminal estaba en la carpeta equivocada ❌

**¿Qué pasó?**
Varias veces al intentar correr comandos como `node server.js` o `flutter run`, aparecía este error:

```
Error: No pubspec.yaml file found
```
o
```
Error: Cannot find module 'server.js'
```

**¿Por qué pasó?**
La terminal estaba parada en una carpeta diferente a donde estaban los archivos. Es como querer abrir una puerta pero estar parado en otra habitación.

**¿Cómo lo resolvimos?**
Siempre hay que asegurarse de estar en la carpeta correcta con el comando `cd`:

```bash
# Para correr el servidor:
cd lib\exam_api
node server.js

# Para correr Flutter:
cd flutter_application_1
flutter run
```

---

### Complicación 4: npm no podía ejecutarse en Windows ❌

**¿Qué pasó?**
Al intentar correr `npm install` apareció este error:

```
npm: No se puede cargar el archivo porque la ejecución de scripts está deshabilitada
PSSecurityException: UnauthorizedAccess
```

**¿Por qué pasó?**
Windows tiene una política de seguridad que bloquea la ejecución de scripts por default para proteger la computadora de virus.

**¿Cómo lo resolvimos?**
Corrimos este comando para dar permiso:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Esto le dice a Windows "confía en los scripts que yo mismo descargué" sin quitar toda la seguridad.

---

### Complicación 5: Los datos no aparecían en Atlas ❌

**¿Qué pasó?**
Corrimos el script `seed.js` que insertaba los 50 usuarios y decía "✅ 50 usuarios insertados correctamente", pero cuando íbamos a Atlas a verlos, la colección aparecía vacía.

**¿Por qué pasó?**
El script se estaba conectando a MongoDB **local** (en la computadora) pero nosotros estábamos viendo Atlas (en la nube). Son dos bases de datos diferentes. Los datos llegaron a la computadora pero no a la nube.

**¿Cómo lo resolvimos?**
En lugar de luchar con la conexión remota, importamos el archivo `seeds.json` directamente en Atlas usando su interfaz web:

1. Atlas → Browse Collections → `profiles`
2. Clic en "Add Data" → "Import JSON or CSV file"
3. Seleccionamos el archivo `seeds.json`
4. ¡Listo! Los 50 usuarios aparecieron en la nube

---

## 📋 Las 15 Consultas — Explicación paso a paso

### ¿Dónde se ejecutan?

En MongoDB Atlas: Data Explorer → `examapp` → `profiles` → escribes la consulta en el cuadro de búsqueda y das clic en "Find".

---

### Consulta 1: Traer TODOS los usuarios

```javascript
db.profiles.find({})
```

**¿Qué hace?** Las llaves vacías `{}` significan "sin filtro", o sea, trae todo.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles;
```

**Resultado:** Los 50 usuarios completos con todos sus campos.

---

### Consulta 2: Proyección — Solo algunos campos

```javascript
db.profiles.find({}, { name: 1, school: 1, grade: 1, _id: 0 })
```

**¿Qué hace?** El segundo `{}` es la proyección. El `1` significa "muéstrame este campo" y el `0` significa "oculta este campo". Con `_id: 0` ocultamos el ID que MongoDB agrega automáticamente.

**Equivalente en SQL:**
```sql
SELECT name, school, grade FROM profiles;
```

**Resultado:** Solo aparece nombre, escuela y semestre. Sin el ID feo.

---

### Consulta 3: findOne() — Solo el primero que encuentre

```javascript
db.profiles.findOne({ name: "Carlos Mendoza López" })
```

**¿Qué hace?** Busca al usuario con ese nombre exacto y solo devuelve UNO aunque hubiera varios.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE name = 'Carlos Mendoza López' LIMIT 1;
```

**Resultado:** Solo el documento de Carlos Mendoza López.

---

### Consulta 4: Filtrar por escuela

```javascript
db.profiles.find({ school: "UNAM" })
```

**¿Qué hace?** Busca todos los documentos donde el campo `school` sea exactamente "UNAM".

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE school = 'UNAM';
```

**Resultado:** Todos los alumnos de la UNAM (hay varios en nuestros 50 usuarios).

---

### Consulta 5: Filtrar por semestre

```javascript
db.profiles.find({ grade: "3er Semestre" })
```

**¿Qué hace?** Igual que la anterior pero filtrando por semestre.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE grade = '3er Semestre';
```

---

### Consulta 6: Dos filtros al mismo tiempo (AND)

```javascript
db.profiles.find({ school: "UNAM", grade: "3er Semestre" })
```

**¿Qué hace?** Cuando pones dos campos separados por coma, MongoDB los trata como "Y" (AND). Busca alumnos que sean de UNAM **Y** que estén en 3er semestre al mismo tiempo.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE school = 'UNAM' AND grade = '3er Semestre';
```

---

### Consulta 7: Buscar uno u otro ($or)

```javascript
db.profiles.find({ $or: [{ school: "UNAM" }, { school: "IPN" }] })
```

**¿Qué hace?** El operador `$or` busca documentos que cumplan AL MENOS UNA de las condiciones. En este caso, alumnos de UNAM **O** de IPN.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE school = 'UNAM' OR school = 'IPN';
```

**Nota:** Los operadores especiales de MongoDB siempre empiezan con `$`.

---

### Consulta 8: Buscar por texto parcial ($regex)

```javascript
db.profiles.find({ name: { $regex: "García", $options: "i" } })
```

**¿Qué hace?** `$regex` busca un patrón dentro del texto (como el Ctrl+F de Word). La `$options: "i"` significa que no importa si está en mayúsculas o minúsculas.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles WHERE name LIKE '%García%';
```

**Resultado:** Encuentra "María Fernández **García**", "Ana Martínez **García**", etc.

---

### Consulta 9: Ordenar resultados (sort)

```javascript
db.profiles.find({}).sort({ name: 1 })
```

**¿Qué hace?** El `sort()` ordena los resultados. El `1` significa A-Z (ascendente) y el `-1` significa Z-A (descendente).

**Equivalente en SQL:**
```sql
SELECT * FROM profiles ORDER BY name ASC;
```

---

### Consulta 10: Limitar resultados (limit)

```javascript
db.profiles.find({}).limit(5)
```

**¿Qué hace?** Solo devuelve los primeros 5 documentos, aunque haya 50.

**Equivalente en SQL:**
```sql
SELECT * FROM profiles LIMIT 5;
```

---

### Consulta 11: Paginación (skip + limit)

```javascript
db.profiles.find({}).skip(10).limit(10)
```

**¿Qué hace?** Salta los primeros 10 documentos y luego trae los siguientes 10. Esto se usa para hacer paginación (como cuando ves "página 2 de 5" en Google).

- `skip(0).limit(10)` → Página 1 (usuarios 1-10)
- `skip(10).limit(10)` → Página 2 (usuarios 11-20)
- `skip(20).limit(10)` → Página 3 (usuarios 21-30)

**Equivalente en SQL:**
```sql
SELECT * FROM profiles LIMIT 10 OFFSET 10;
```

---

### Consulta 12: Contar documentos

```javascript
db.profiles.countDocuments({})
```

**¿Qué hace?** Cuenta cuántos documentos hay en total. Las llaves vacías significa "cuenta todos".

**Equivalente en SQL:**
```sql
SELECT COUNT(*) FROM profiles;
```

**Resultado:** `50`

---

### Consulta 13: Contar con filtro

```javascript
db.profiles.countDocuments({ school: "TEC" })
```

**¿Qué hace?** Cuenta cuántos alumnos son del TEC.

**Equivalente en SQL:**
```sql
SELECT COUNT(*) FROM profiles WHERE school = 'TEC';
```

---

### Consulta 14: Valores únicos (distinct)

```javascript
db.profiles.distinct("school")
```

**¿Qué hace?** Devuelve una lista de todos los valores diferentes que existe en el campo `school`, sin repetir.

**Equivalente en SQL:**
```sql
SELECT DISTINCT school FROM profiles;
```

**Resultado:** `["IPN", "TEC", "UAM", "UDLAP", "UNAM"]`

---

### Consulta 15: Aggregation — Contar por escuela

```javascript
db.profiles.aggregate([
  { $group: { _id: "$school", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])
```

**¿Qué hace?** Esta es la más avanzada. El Aggregation Framework es como una cadena de transformaciones:

1. `$group` — Agrupa todos los documentos por escuela y cuenta cuántos hay en cada grupo
2. `$sort` — Ordena el resultado de mayor a menor

**Equivalente en SQL:**
```sql
SELECT school, COUNT(*) as total 
FROM profiles 
GROUP BY school 
ORDER BY total DESC;
```

**Resultado esperado:**
```json
[
  { "_id": "UNAM", "total": 10 },
  { "_id": "IPN", "total": 10 },
  { "_id": "TEC", "total": 10 },
  { "_id": "UAM", "total": 10 },
  { "_id": "UDLAP", "total": 10 }
]
```

---

## 🏁 Resumen de todo lo que aprendimos

| Concepto | ¿Para qué sirve? | Ejemplo |
|----------|-----------------|---------|
| `find({})` | Traer todos los documentos | Como "mostrar todo" |
| `find({ campo: valor })` | Filtrar por un campo | Como buscar en Google |
| `findOne()` | Traer solo el primero | Cuando solo necesitas uno |
| Proyección `{ campo: 1 }` | Elegir qué campos mostrar | Como ocultar columnas en Excel |
| `$or` | Buscar uno u otro | Como buscar "rojo o azul" |
| `$regex` | Buscar texto parcial | Como Ctrl+F |
| `sort()` | Ordenar resultados | Como ordenar A-Z |
| `limit()` | Limitar cuántos trae | Como ver solo la primera página |
| `skip()` | Saltar documentos | Para ver la página 2, 3, etc. |
| `countDocuments()` | Contar cuántos hay | Para saber el total |
| `distinct()` | Valores únicos | Sin repetidos |
| `aggregate()` | Cálculos avanzados | Como tablas dinámicas en Excel |


---

*Proyecto: Exam Manager App | Materia: Base de Datos NoSQL | T8: Mar 23-27*