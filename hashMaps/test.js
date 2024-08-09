class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null).map(() => new Map());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    this.hashmap[arrayIndex].set(key, value);
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].get(key) || null;
  }

  delete(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].delete(key);
  }

  has(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex].has(key);
  }
}


// Primero, asegúrate de que la clase HashMap está definida correctamente

// Función de ayuda para imprimir resultados de prueba
function assertTest(condition, message) {
  console.log(condition ? `✅ ${message}` : `❌ ${message}`);
}

// Crear una instancia de HashMap
const hashMap = new HashMap(10);

// Prueba 1: Asignar y recuperar un valor
hashMap.assign("nombre", "Alice");
assertTest(hashMap.retrieve("nombre") === "Alice", "Asignar y recuperar un valor");

// Prueba 2: Sobrescribir un valor existente
hashMap.assign("nombre", "Bob");
assertTest(hashMap.retrieve("nombre") === "Bob", "Sobrescribir un valor existente");

// Prueba 3: Recuperar un valor que no existe
assertTest(hashMap.retrieve("edad") === null, "Recuperar un valor que no existe");

// Prueba 4: Verificar si una clave existe
assertTest(hashMap.has("nombre") === true, "Verificar si una clave existe (true)");
assertTest(hashMap.has("edad") === false, "Verificar si una clave no existe (false)");

// Prueba 5: Eliminar un valor
hashMap.assign("eliminar", "valor");
hashMap.delete("eliminar");
assertTest(hashMap.retrieve("eliminar") === null, "Eliminar un valor");

// Prueba 6: Manejar colisiones
// Nota: Esta prueba asume que "abc" y "cba" generarán la misma clave hash
// Si no lo hacen en tu implementación, puedes modificar las claves según sea necesario
hashMap.assign("abc", "valor1");
hashMap.assign("cba", "valor2");
assertTest(hashMap.retrieve("abc") === "valor1" && hashMap.retrieve("cba") === "valor2", "Manejar colisiones");

// Prueba 7: Asignar y recuperar múltiples valores
hashMap.assign("uno", 1);
hashMap.assign("dos", 2);
hashMap.assign("tres", 3);
assertTest(
  hashMap.retrieve("uno") === 1 && 
  hashMap.retrieve("dos") === 2 && 
  hashMap.retrieve("tres") === 3, 
  "Asignar y recuperar múltiples valores"
);

console.log("Pruebas completadas.");