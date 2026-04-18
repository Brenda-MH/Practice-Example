# Consultas en MongoDB con Filtros de Listas

## Introducción
En este ejercicio se trabajó con una colección de estudiantes que contiene campos simples como `name`, `email`, `school` y `grade`. Se realizaron consultas utilizando filtros de listas como `$in` y `$nin`.

---

Te mostrare solo unos ejemplos de las consultas que realizamos.
## Ejemplos de Consultas

### Consulta por grado (6to semestre)

![Consulta por grado](screen1.jpeg)


{
  grade: { $in: ["6to Semestre"] }
}
```

---

###  Consulta por escuela (UNAM y UAM)

![Consulta por escuela](screen4.jpeg)

Consulta utilizada:
```js
{
  school: { $in: ["UNAM", "UAM"] }
}
```

---

## AYUDA DE NUESTRO SENIOR MANAGER (IA)
Para comenzar a hacer estas consultas ,primero le pedimos ayuda a la ia para poder entender los filtros que
 utilizariamos ,solo trabajamos con este tipo de filtros ya que nuestros registros de datos son unicamente de texto ,despues de que comprendimos que hacia o como utilizarlos empezamos a hacer nuestros comandos y los mandabamos a la ia para que nos pudiera guiar en las cosas que podriamos mejorar o si este comando funcionaba o era compatible con mongo db .Al finalizar todas las consultas que hicimos nos topamos con ciertos errores de escritura ,de algunos campos que no estaban completos (por ende no aparecian cuando los buscabamos )
  y los corregimos(Todos estos errores los identificamos y pudimos solucionarlos con ayuda de la IA).

  ya explicado lo anterior estas son algunas de las preguntas que se hicieron a nuestro senior manager (IA):
 1: ¿Cómo se filtran documentos en MongoDB cuando un campo debe coincidir con varios valores posibles?
 2:¿Cómo puedo filtrar estudiantes que pertenezcan a más de una escuela específica?
 3:¿Cómo saber si un error se debe a la estructura de los datos o a la consulta?
 4:¿Cómo puedo identificar por qué una consulta en MongoDB no devuelve resultados?




## Complicaciones al realizar las consultas

Una de las principales complicaciones fue que los datos no contienen estructuras de tipo arreglo (arrays). Esto limita el uso de operadores más avanzados como `$all`, `$elemMatch` o `$size`, que están diseñados específicamente para trabajar con listas dentro de los documentos.

Otra dificultad fue entender cuándo aplicar correctamente los filtros de listas. Por ejemplo, puede ser confuso diferenciar entre buscar múltiples valores en un mismo campo (uso de `$in`) y combinar múltiples condiciones en distintos campos.

También se presentó el problema de consistencia en los datos. Si los valores no coinciden exactamente (por ejemplo, "UNAM" vs "unam"), la consulta no devuelve resultados, ya que MongoDB es sensible a mayúsculas y minúsculas.

---

## Fallos o Bugs comunes

- **Error de escritura en los valores**: Si el nombre de la escuela o grado está mal escrito, la consulta no encuentra coincidencias.
- **Uso incorrecto de operadores**: Intentar usar operadores como `$all` en campos que no son arrays genera resultados vacíos o errores lógicos.
- **Confusión entre tipos de datos**: Comparar strings con números o viceversa puede provocar que la consulta no funcione.
- **Falta de coincidencias exactas**: MongoDB requiere coincidencias exactas a menos que se usen expresiones regulares (`regex`).
- **Datos incompletos**: Si algún documento no tiene un campo, puede no aparecer en los resultados esperados.

---

## ¿Por qué solo utilizamos 2 filtros?

En este caso solo se utilizaron los filtros `$in` y `$nin` porque los datos son simples y no contienen listas dentro de los documentos.

- `$in`: Permite buscar documentos donde un campo coincida con cualquiera de los valores de una lista.
- `$nin`: Permite excluir documentos que coincidan con ciertos valores.

Estos dos operadores son suficientes para este tipo de estructura porque:

1. Los campos (`school`, `grade`, `name`) contienen un solo valor, no múltiples.
2. No existen arrays que requieran operadores más avanzados.
3. Se busca simplicidad en las consultas.
4. Son los más adecuados para filtrar múltiples opciones en un mismo campo.

---

## Conclusión

El uso de filtros de listas en MongoDB depende mucho de la estructura de los datos. En este caso, al trabajar con datos simples, solo fue necesario utilizar `$in` y `$nin`. Para consultas más complejas, sería necesario diseñar documentos que incluyan arrays y así aprovechar operadores más avanzados.
