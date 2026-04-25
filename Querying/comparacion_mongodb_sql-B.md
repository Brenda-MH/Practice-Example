# Comparación entre MongoDB y SQL (Operadores Lógicos)

##  Introducción
En este documento se comparan consultas realizadas en **MongoDB** utilizando operadores lógicos (`$and`, `$or`, `$not`) con su equivalente en **SQL**, explicando tanto la sintaxis como la forma en que funcionan internamente.

---

## 🧠 1. Diferencias que encontramos  general entre MongoDB y SQL

| Característica | MongoDB | SQL |
|--------------|--------|-----|
| Tipo de base de datos | No relacional (NoSQL) | Relacional |
| Estructura | Documentos (JSON/BSON) | Tablas con filas y columnas |
| Esquema | Flexible | Fijo |
| Lenguaje de consulta | JSON-like | SQL |
| Relaciones | Embebidas o referencias | Claves foráneas |

---
## Te muestro algunas consultas que realizamoss con los operadores lógicos y su explicacion en cuanto la diferencia de sintaxis en SQL 

##  2. Consulta con `$and`

### 🟢 MongoDB
```js
{
  $and: [
    { school: "UNAM" },
    { grade: "1er Semestre" }
  ]
}
```

###  SQL equivalente
```sql
SELECT * 
FROM profiles
WHERE school = 'UNAM' 
AND grade = '1er Semestre';
```

###  Diferncia
- En **MongoDB**, `$and` recibe un arreglo de condiciones.
- En **SQL**, simplemente se usa `AND` entre condiciones.
- Ambos devuelven registros que cumplen **todas** las condiciones.

---

##  3. Consulta con `$or`

### 🟢 MongoDB
```js
{
  $or: [
    { grade: "1er Semestre" },
    { grade: "2do Semestre" }
  ]
}
```

###  SQL equivalente
```sql
SELECT * 
FROM profiles
WHERE grade = '1er Semestre'
OR grade = '2do Semestre';
```

###  Diferencia
- `$or` en MongoDB también usa un arreglo.
- `OR` en SQL evalúa múltiples condiciones.
- Devuelve registros que cumplen **al menos una** condición.

---

##  4. Operador `$not`

### 🟢 MongoDB
```js
{
  grade: { $not: { $eq: "1er Semestre" } }
}
```

###  SQL equivalente
sql
SELECT * 
FROM profiles
WHERE grade != '1er Semestre';


### Diferencia
- `$not` niega una condición.
- En SQL se usa `!=` o `NOT`.
- MongoDB requiere envolver la condición dentro de `$not`.

---

##  5. Diferencias que notamos clave en cómo funcionan

###  MongoDB
- Trabaja con documentos tipo JSON.
- Las consultas son objetos.
- Permite estructuras más flexibles.
- Ideal para datos no estructurados o cambiantes.

### SQL
- Usa tablas estructuradas.
- Requiere definir esquema previamente.
- Es más estricto pero más consistente.
- Ideal para relaciones complejas y datos estructurados.

---


## Nuestras complicaciones o bugs al hacer estas compraciones 
### Confundir operadores 
al estar haciendo nuestras consultas  en mongoDB(que y teniamos la informacion de como hacerlas en SQL) nos confundiamos de operadores ya que MongoDB usa $and, $or, $not.
SQL usa AND, OR, NOT. Nuestro error comun fue  olvidar que MongoDB requiere objetos y arreglos.

### Diferencias en tipos de datos
En MongoDB, los datos son más flexibles (ej. strings, números mezclados).
En SQL, los tipos son estrictos.
Nuestro Bug común fue comparar un número con texto puede fallar en SQL pero no en MongoDB.

### Diferencias en la estructura
MongoDB permite documentos anidados.
SQL requiere JOIN para relaciones.
Nuestro problema fue que las  consultas complejas en MongoDB no siempre tienen equivalente directo en SQL.

## EN CONCLUSIÓN 


La comparación entre MongoDB y SQL muestra que, aunque ambos sistemas pueden realizar consultas similares, su forma de trabajar es muy diferente.

MongoDB destaca por su flexibilidad y facilidad para manejar datos no estructurados.
SQL es más rígido, pero mucho más sólido para relaciones complejas y consistencia de datos.

Al convertir consultas entre ambos:

Es importante entender la lógica detrás de la consulta, no solo copiar la sintaxis.
Se deben considerar tipos de datos, estructura y rendimiento.
Muchos errores surgen por asumir que ambos sistemas funcionan exactamente igual, cuando en realidad tienen enfoques distintos.