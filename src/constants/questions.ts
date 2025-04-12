export interface QuizQuestion {
	id: number
	pregunta: string
	opciones: string[]
	respuesta: number
	imagen?: string
}
export const QuestionJs = {
	quiz: [
		{
			id: 1,
			pregunta: "¿Cuál es la diferencia entre 'let' y 'var' en JavaScript?",
			opciones: [
				'Ambos son iguales',
				"'let' tiene scope de bloque y 'var' de función",
				"'var' es para constantes",
				"'let' solo funciona en navegadores modernos",
			],
			respuesta: 1,
			explicacion:
				"'let' tiene alcance de bloque ({}), mientras que 'var' tiene alcance de función completa o global.",
			dificultad: 'básico',
			categoria: 'Variables',
			keywords: ['scope', 'variables', 'ES6'],
		},
		{
			id: 2,
			pregunta: "¿Qué devuelve 3 + '3' en JavaScript?",
			opciones: ['6', '33', 'Error', 'NaN'],
			respuesta: 1,
			explicacion:
				"JavaScript realiza coerción de tipos, convierte el número a string y concatena: '3' + '3' = '33'",
			dificultad: 'básico',
			categoria: 'Operadores',
			keywords: ['coerción', 'tipos', 'concatenación'],
		},
		{
			id: 3,
			pregunta: '¿Qué método de array NO modifica el array original?',
			opciones: ['push()', 'splice()', 'slice()', 'pop()'],
			respuesta: 2,
			explicacion:
				'slice() devuelve una copia del array, los demás métodos modifican el array original.',
			dificultad: 'intermedio',
			categoria: 'Arrays',
			keywords: ['mutabilidad', 'métodos', 'arrays'],
		},
		{
			id: 4,
			pregunta: '¿Qué es un closure en JavaScript?',
			opciones: [
				'Una función anónima',
				'Una función con acceso al ámbito padre incluso después de cerrarlo',
				'Un método de objetos',
				'Un tipo de bucle',
			],
			respuesta: 1,
			explicacion:
				'Los closures permiten acceder al ámbito léxico exterior desde una función interna.',
			dificultad: 'avanzado',
			categoria: 'Funciones',
			keywords: ['scope', 'lexical', 'memoria'],
		},
		{
			id: 5,
			pregunta: "¿Qué hace 'document.querySelector('#btn')'?",
			opciones: [
				'Selecciona todos los botones',
				"Selecciona el primer elemento con clase 'btn'",
				"Selecciona el elemento con ID 'btn'",
				'Crea un nuevo elemento button',
			],
			respuesta: 2,
			explicacion:
				'querySelector usa sintaxis CSS, # selecciona por ID, . por clase',
			dificultad: 'intermedio',
			categoria: 'DOM',
			keywords: ['selectores', 'DOM', 'web'],
		},
		{
			id: 6,
			pregunta: "¿Qué muestra 'console.log(typeof NaN)'?",
			opciones: ['number', 'string', 'NaN', 'undefined'],
			respuesta: 0,
			explicacion:
				'NaN es técnicamente de tipo number según la especificación de JavaScript',
			dificultad: 'intermedio',
			categoria: 'Tipos',
			keywords: ['NaN', 'typeof', 'number'],
		},
		{
			id: 7,
			pregunta:
				"¿Qué patrón usa este código: 'const obj = Object.create(proto)'?",
			opciones: ['Factory', 'Constructor', 'Prototype', 'Singleton'],
			respuesta: 2,
			explicacion: 'Object.create() establece el prototipo del nuevo objeto',
			dificultad: 'avanzado',
			categoria: 'Patrones',
			keywords: ['herencia', 'prototipos', 'POO'],
		},
		{
			id: 8,
			pregunta: "¿Qué hace 'setTimeout(() => {}, 0)'?",
			opciones: [
				'Ejecuta inmediatamente la función',
				'Ejecuta la función al final de la pila de ejecución',
				'Es equivalente a setInterval',
				'Detiene la ejecución',
			],
			respuesta: 1,
			explicacion:
				'Aunque el delay es 0, se envía al event loop y se ejecuta después del código sincrónico',
			dificultad: 'intermedio',
			categoria: 'Asincronía',
			keywords: ['event loop', 'callbacks', 'timers'],
		},
		{
			id: 9,
			pregunta: "¿Qué es 'use strict' en JavaScript?",
			opciones: [
				'Un tipo de variable',
				'Una directiva para habilitar el modo estricto',
				'Una función de depuración',
				'Un operador lógico',
			],
			respuesta: 1,
			explicacion:
				'El modo estricto previene errores comunes, deshabilita sintaxis problemática y optimiza ejecución',
			dificultad: 'intermedio',
			categoria: 'Sintaxis',
			keywords: ['modo estricto', 'seguridad', 'optimización'],
		},
		{
			id: 10,
			pregunta: "¿Qué hace el operador '??' en JavaScript?",
			opciones: [
				'Comparación estricta',
				'Nullish Coalescing',
				'Operador lógico AND',
				'Operador ternario',
			],
			respuesta: 1,
			explicacion:
				'El Nullish Coalescing operator (??) devuelve el operando derecho si el izquierdo es null/undefined',
			dificultad: 'intermedio',
			categoria: 'Operadores',
			keywords: ['ES2020', 'nullish', 'coalescing'],
		},
	],
	config: {
		totalPreguntas: 10,
		dificultades: ['básico', 'intermedio', 'avanzado'],
		categorias: [
			'Variables',
			'Operadores',
			'Arrays',
			'Funciones',
			'DOM',
			'Tipos',
			'Patrones',
			'Asincronía',
			'Sintaxis',
		],
	},
}
export const QuestionTs = {
	quiz: [
		{
			id: 1,
			pregunta: "¿Cuál es la diferencia entre 'any' y 'unknown' en TypeScript?",
			opciones: [
				'Son iguales',
				"'unknown' permite cualquier tipo pero requiere verificación, 'any' no",
				"'any' es solo para números",
				"'unknown' no existe en TypeScript",
			],
			respuesta: 1,
			explicacion:
				"'unknown' requiere type checking antes de su uso, mientras que 'any' desactiva el type checking.",
			dificultad: 'básico',
			categoria: 'Tipos',
			keywords: ['type safety', 'type checking', 'any'],
		},
		{
			id: 2,
			pregunta: '¿Cómo se define una propiedad opcional en una interfaz?',
			opciones: [
				'Usando el operador !',
				'Agregando ? después del nombre',
				'Con la palabra clave optional',
				'Usando undefined como tipo',
			],
			respuesta: 1,
			explicacion:
				'Las propiedades opcionales en interfaces se definen con el operador ?: interface User { name?: string }',
			dificultad: 'básico',
			categoria: 'Interfaces',
			keywords: ['optional', 'interfaces', 'propiedades'],
		},
		{
			id: 3,
			pregunta: "¿Qué es una 'tupla' en TypeScript?",
			opciones: [
				'Un array de longitud fija con tipos definidos',
				'Un tipo de dato para números',
				'Una función genérica',
				'Un tipo de decorador',
			],
			respuesta: 0,
			explicacion:
				'Las tuplas permiten definir arrays con tipos específicos en cada posición: type StringNumberPair = [string, number]',
			dificultad: 'intermedio',
			categoria: 'Tipos',
			keywords: ['tuples', 'arrays', 'tipado'],
		},
		{
			id: 4,
			pregunta: "¿Qué hace el operador 'as' en TypeScript?",
			opciones: [
				'Conversión de tipos',
				'Comparación de tipos',
				'Definir una clase',
				'Importar módulos',
			],
			respuesta: 0,
			explicacion:
				'Type Assertion: indica al compilador que trate una variable como un tipo específico: let value = input as string;',
			dificultad: 'básico',
			categoria: 'Sintaxis',
			keywords: ['type assertion', 'casting', 'operadores'],
		},
		{
			id: 5,
			pregunta: "¿Qué es un 'enum' en TypeScript?",
			opciones: [
				'Una estructura de datos clave-valor',
				'Un tipo de función asíncrona',
				'Un conjunto de constantes nombradas',
				'Un tipo de decorador',
			],
			respuesta: 2,
			explicacion:
				'Los enums permiten definir un conjunto de constantes con nombre: enum Direction { Up, Down }',
			dificultad: 'intermedio',
			categoria: 'Tipos',
			keywords: ['enums', 'constantes', 'numericos'],
		},
		{
			id: 6,
			pregunta: "¿Qué es 'Generics' en TypeScript?",
			opciones: [
				'Tipos dinámicos que funcionan con múltiples tipos',
				'Un tipo específico para números',
				'Un patrón de diseño para clases',
				'Un tipo de interfaz especial',
			],
			respuesta: 0,
			explicacion:
				'Los genéricos permiten crear componentes reutilizables que funcionan con múltiples tipos: function identity<T>(arg: T): T',
			dificultad: 'avanzado',
			categoria: 'Genéricos',
			keywords: ['generics', 'T', 'reusabilidad'],
		},
		{
			id: 7,
			pregunta: "¿Qué hace el tipo 'Partial<T>'?",
			opciones: [
				'Hace todas las propiedades requeridas',
				'Hace todas las propiedades opcionales',
				'Convierte el tipo en una unión',
				'Crea una copia del tipo',
			],
			respuesta: 1,
			explicacion:
				'Partial<T> construye un tipo con todas las propiedades de T establecidas como opcionales',
			dificultad: 'avanzado',
			categoria: 'Utilidades',
			keywords: ['utility types', 'partial', 'opcional'],
		},
		{
			id: 8,
			pregunta: '¿Para qué se usan los decoradores en TypeScript?',
			opciones: [
				'Modificar la apariencia de variables',
				'Añadir metadatos o modificar clases/métodos',
				'Optimizar el rendimiento',
				'Definir tipos complejos',
			],
			respuesta: 1,
			explicacion:
				'Los decoradores permiten añadir funcionalidad extra a clases/métodos mediante metaprogramación',
			dificultad: 'avanzado',
			categoria: 'Decoradores',
			keywords: ['decorators', 'metadata', 'experimental'],
		},
		{
			id: 9,
			pregunta: "¿Qué es 'type narrowing' en TypeScript?",
			opciones: [
				'Reducir el tamaño del código',
				'Reducir el tipo de una variable mediante condicionales',
				'Un tipo de interfaz estrecha',
				'Un error de compilación',
			],
			respuesta: 1,
			explicacion:
				'Type narrowing es cuando TypeScript deduce un tipo más específico basado en condicionales: typeof checks, truthiness, etc.',
			dificultad: 'intermedio',
			categoria: 'Tipos',
			keywords: ['type guards', 'narrowing', 'typeof'],
		},
		{
			id: 10,
			pregunta: "¿Qué significa 'readonly' en TypeScript?",
			opciones: [
				'La propiedad solo puede leerse en tiempo de compilación',
				'La propiedad no puede ser modificada después de su inicialización',
				'La propiedad es privada',
				'La propiedad es estática',
			],
			respuesta: 1,
			explicacion:
				"'readonly' marca una propiedad como inmutable después de su asignación inicial",
			dificultad: 'intermedio',
			categoria: 'Clases',
			keywords: ['inmutable', 'propiedades', 'modificadores'],
		},
	],
	config: {
		totalPreguntas: 10,
		dificultades: ['básico', 'intermedio', 'avanzado'],
		categorias: [
			'Tipos',
			'Interfaces',
			'Genéricos',
			'Utilidades',
			'Decoradores',
			'Clases',
			'Sintaxis',
		],
	},
}
export const QuestionJava = {
	quiz: [
		{
			id: 1,
			pregunta: "¿Qué diferencia hay entre '=='' y 'equals()' en Java?",
			opciones: [
				'Son iguales',
				"'==' compara valores, 'equals()' compara referencias",
				"'==' compara referencias, 'equals()' compara valores",
				"Solo se usa 'equals()' en primitivos",
			],
			respuesta: 2,
			explicacion:
				"'==' compara la igualdad de referencias para objetos y valores para primitivos. 'equals()' compara la igualdad semántica (debe ser sobrescrito).",
			dificultad: 'básico',
			categoria: 'Fundamentos',
			keywords: ['comparación', 'objetos', 'primitivos'],
		},
		{
			id: 2,
			pregunta: '¿Qué es el autoboxing en Java?',
			opciones: [
				'Conversión automática de wrappers a primitivos',
				'Conversión automática entre primitivos y sus wrappers',
				'Un tipo de colección',
				'Un patrón de diseño',
			],
			respuesta: 1,
			explicacion:
				'Autoboxing: conversión automática de int a Integer y viceversa. Unboxing: el proceso inverso.',
			dificultad: 'intermedio',
			categoria: 'Tipos',
			keywords: ['wrappers', 'conversión', 'primitivos'],
		},
		{
			id: 3,
			pregunta: '¿Qué es la herencia múltiple en Java?',
			opciones: [
				'Permitida mediante clases',
				'Permitida mediante interfaces',
				'No permitida en absoluto',
				'Permitida con clases abstractas',
			],
			respuesta: 1,
			explicacion:
				'Java no permite herencia múltiple de clases, pero sí implementación múltiple de interfaces.',
			dificultad: 'intermedio',
			categoria: 'POO',
			keywords: ['herencia', 'interfaces', 'clases'],
		},
		{
			id: 4,
			pregunta: '¿Qué es el polimorfismo en Java?',
			opciones: [
				'Múltiples métodos con mismo nombre',
				'Capacidad de un objeto de tomar muchas formas',
				'Uso de genéricos',
				'Sobrecarga de operadores',
			],
			respuesta: 1,
			explicacion:
				'Polimorfismo permite que un objeto sea tratado como instancia de su clase padre o interfaces que implementa.',
			dificultad: 'básico',
			categoria: 'POO',
			keywords: ['polimorfismo', 'sobreescritura', 'sobrecarga'],
		},
		{
			id: 5,
			pregunta: '¿Qué es una clase abstracta?',
			opciones: [
				'Clase con al menos un método abstracto',
				'Clase que no puede ser instanciada',
				'Ambas son correctas',
				'Clase con métodos estáticos',
			],
			respuesta: 2,
			explicacion:
				'Una clase abstracta no puede ser instanciada y puede contener métodos abstractos y concretos.',
			dificultad: 'intermedio',
			categoria: 'POO',
			keywords: ['abstract', 'herencia', 'métodos'],
		},
		{
			id: 6,
			pregunta: '¿Qué implementación de List es más eficiente para búsquedas?',
			opciones: ['ArrayList', 'LinkedList', 'Vector', 'Stack'],
			respuesta: 0,
			explicacion:
				'ArrayList tiene acceso aleatorio O(1) por índice, mientras que LinkedList requiere recorrer la lista O(n).',
			dificultad: 'avanzado',
			categoria: 'Colecciones',
			keywords: ['list', 'arraylist', 'linkedlist'],
		},
		{
			id: 7,
			pregunta: "¿Qué es un 'checked exception'?",
			opciones: [
				'Error en tiempo de compilación',
				'Excepción que debe ser declarada o capturada',
				'Error de lógica',
				'Excepción no crítica',
			],
			respuesta: 1,
			explicacion:
				'Checked exceptions (IOException, SQLException) deben ser manejadas con try-catch o declaradas en la firma del método.',
			dificultad: 'intermedio',
			categoria: 'Excepciones',
			keywords: ['excepciones', 'try-catch', 'compilación'],
		},
		{
			id: 8,
			pregunta: "¿Qué hace 'synchronized' en Java?",
			opciones: [
				'Serializa objetos',
				'Sincroniza acceso a recursos en hilos',
				'Ordena colecciones',
				'Optimiza código',
			],
			respuesta: 1,
			explicacion:
				'synchronized previene condiciones de carrera al permitir solo un hilo acceder al recurso a la vez.',
			dificultad: 'avanzado',
			categoria: 'Concurrencia',
			keywords: ['hilos', 'sincronización', 'multithreading'],
		},
		{
			id: 9,
			pregunta: '¿Qué es JVM?',
			opciones: [
				'Máquina virtual para ejecutar bytecode',
				'Lenguaje de programación',
				'Entorno de desarrollo',
				'Tipo de dato primitivo',
			],
			respuesta: 0,
			explicacion:
				"La Java Virtual Machine (JVM) ejecuta el bytecode compilado, permitiendo 'write once, run anywhere'.",
			dificultad: 'básico',
			categoria: 'JVM',
			keywords: ['bytecode', 'compilación', 'plataforma'],
		},
		{
			id: 10,
			pregunta: '¿Qué patrón usa java.util.Collections#sort()?',
			opciones: ['Strategy', 'Singleton', 'Factory', 'Observer'],
			respuesta: 0,
			explicacion:
				'El método sort() usa el patrón Strategy al permitir diferentes implementaciones de Comparator.',
			dificultad: 'avanzado',
			categoria: 'Patrones',
			keywords: ['strategy', 'comparator', 'sort'],
		},
	],
	config: {
		totalPreguntas: 10,
		dificultades: ['básico', 'intermedio', 'avanzado'],
		categorias: [
			'Fundamentos',
			'POO',
			'Tipos',
			'Colecciones',
			'Excepciones',
			'Concurrencia',
			'JVM',
			'Patrones',
		],
	},
}

export const QuestionEx = {
	quiz: [
		{
			id: 1,
			pregunta: '¿Qué es middleware en Express?',
			opciones: [
				'Un tipo de base de datos',
				'Funciones con acceso al objeto req, res y next',
				'Un motor de plantillas',
				'Un sistema de rutas estáticas',
			],
			respuesta: 1,
			explicacion:
				'Middleware son funciones que se ejecutan en el ciclo de solicitud-respuesta, pueden modificar req/res o terminar el proceso.',
			dificultad: 'básico',
			categoria: 'Middleware',
			keywords: ['funciones', 'next', 'ciclo'],
		},
		{
			id: 2,
			pregunta: '¿Cómo se sirven archivos estáticos en Express?',
			opciones: [
				"app.get('/static')",
				'express.static()',
				'router.use()',
				'res.sendFile()',
			],
			respuesta: 1,
			explicacion:
				'express.static() es el middleware integrado para servir archivos estáticos como imágenes, CSS, etc.',
			dificultad: 'básico',
			categoria: 'Configuración',
			keywords: ['archivos', 'public', 'middleware'],
		},
		{
			id: 3,
			pregunta: "¿Qué hace app.set('view engine', 'ejs')?",
			opciones: [
				'Configura el motor de plantillas EJS',
				'Establece una variable de entorno',
				'Crea una nueva ruta para vistas',
				'Importa el módulo EJS',
			],
			respuesta: 0,
			explicacion:
				'Configura Express para usar EJS como motor de plantillas sin necesidad de especificar la extensión en res.render().',
			dificultad: 'intermedio',
			categoria: 'Vistas',
			keywords: ['template engine', 'ejs', 'config'],
		},
		{
			id: 4,
			pregunta: '¿Qué método HTTP corresponde a actualizar un recurso en REST?',
			opciones: ['POST', 'GET', 'PUT', 'DELETE'],
			respuesta: 2,
			explicacion:
				'PUT se usa para actualizar recursos existentes, mientras que PATCH para actualizaciones parciales.',
			dificultad: 'intermedio',
			categoria: 'REST',
			keywords: ['http methods', 'crud', 'api'],
		},
		{
			id: 5,
			pregunta: '¿Qué hace app.param()?',
			opciones: [
				'Define parámetros de configuración',
				'Maneja parámetros de ruta con lógica específica',
				'Establece parámetros de consulta',
				'Valida el cuerpo de la solicitud',
			],
			respuesta: 1,
			explicacion:
				'app.param() ejecuta código cuando un parámetro específico existe en la ruta, útil para validaciones.',
			dificultad: 'avanzado',
			categoria: 'Rutas',
			keywords: ['parameters', 'validación', 'middleware'],
		},
		{
			id: 6,
			pregunta: '¿Cómo se manejan errores asíncronos en Express?',
			opciones: [
				'Usando try/catch',
				'Con middleware de errores de 4 parámetros',
				"Usando process.on('error')",
				'No se pueden manejar',
			],
			respuesta: 1,
			explicacion:
				'Middleware de errores se define con (err, req, res, next). Para async/await, se debe envolver en try/catch y pasar el error a next().',
			dificultad: 'avanzado',
			categoria: 'Errores',
			keywords: ['async', 'try catch', 'next'],
		},
		{
			id: 7,
			pregunta: '¿Qué es Express Router?',
			opciones: [
				'Un sistema de navegación del cliente',
				'Un middleware para agrupar rutas modularmente',
				'Un gestor de paquetes',
				'Un tipo de template engine',
			],
			respuesta: 1,
			explicacion:
				'express.Router() permite crear manejadores de rutas modulares y montables como middleware.',
			dificultad: 'intermedio',
			categoria: 'Rutas',
			keywords: ['modular', 'routes', 'organización'],
		},
		{
			id: 8,
			pregunta: '¿Qué cabecera se usa para CORS en Express?',
			opciones: [
				'Content-Type',
				'Access-Control-Allow-Origin',
				'Authorization',
				'Accept',
			],
			respuesta: 1,
			explicacion:
				'Access-Control-Allow-Origin controla qué dominios pueden acceder al recurso. Se configura con el paquete cors.',
			dificultad: 'intermedio',
			categoria: 'Seguridad',
			keywords: ['cors', 'headers', 'seguridad'],
		},
		{
			id: 9,
			pregunta: '¿Qué hace morgan en Express?',
			opciones: [
				'Maneja autenticación',
				'Registra logs de solicitudes HTTP',
				'Compila assets',
				'Sirve archivos estáticos',
			],
			respuesta: 1,
			explicacion:
				'Morgan es un middleware de logging que registra detalles de las solicitudes (método, URL, status code, etc.).',
			dificultad: 'básico',
			categoria: 'Middleware',
			keywords: ['logging', 'dev', 'http'],
		},
		{
			id: 10,
			pregunta:
				'¿Qué variable de entorno usa Express para el entorno de ejecución?',
			opciones: ['PORT', 'DB_HOST', 'NODE_ENV', 'API_KEY'],
			respuesta: 2,
			explicacion:
				'NODE_ENV determina el entorno (development/production). Express usa esto para ciertas optimizaciones.',
			dificultad: 'intermedio',
			categoria: 'Configuración',
			keywords: ['environment', 'production', 'variables'],
		},
	],
	config: {
		totalPreguntas: 10,
		dificultades: ['básico', 'intermedio', 'avanzado'],
		categorias: [
			'Middleware',
			'Configuración',
			'Vistas',
			'REST',
			'Rutas',
			'Errores',
			'Seguridad',
		],
	},
}

export const QuestionReact = {
	quiz: [
		{
			id: 1,
			pregunta: '¿Qué es JSX en React?',
			opciones: [
				'Un lenguaje de plantillas',
				'Sintaxis que permite HTML en JavaScript',
				'Un transpilador',
				'Un tipo de estado',
			],
			respuesta: 1,
			explicacion:
				'JSX es una extensión de sintaxis que permite escribir estructuras similares a HTML en JavaScript, que luego se compila a React.createElement().',
			dificultad: 'básico',
			categoria: 'Fundamentos',
			keywords: ['sintaxis', 'compilación', 'elementos'],
		},
		{
			id: 2,
			pregunta:
				'¿Cómo se actualiza el estado correctamente en un componente funcional?',
			opciones: [
				'this.setState()',
				'Usando variables directamente',
				'Con el hook useState y la función actualizadora',
				'Modificando el estado directamente',
			],
			respuesta: 2,
			explicacion:
				'En componentes funcionales se usa useState: const [state, setState] = useState(valorInicial). Nunca modificar el estado directamente.',
			dificultad: 'básico',
			categoria: 'Estado',
			keywords: ['hooks', 'useState', 'inmutabilidad'],
		},
		{
			id: 3,
			pregunta: '¿Qué hace useEffect sin dependencias?',
			opciones: [
				'Se ejecuta solo en el montaje',
				'Se ejecuta en cada renderizado',
				'Solo en actualizaciones',
				'Nunca se ejecuta',
			],
			respuesta: 1,
			explicacion:
				'useEffect(() => { ... }) sin array de dependencias se ejecuta después de cada renderizado.',
			dificultad: 'intermedio',
			categoria: 'Hooks',
			keywords: ['efectos', 'ciclo de vida', 'dependencias'],
		},
		{
			id: 4,
			pregunta: '¿Cuál es la diferencia entre props y state?',
			opciones: [
				'Ambos son iguales',
				'Props son inmutables, state es mutable',
				'State se pasa entre componentes',
				'Props son solo para clases',
			],
			respuesta: 1,
			explicacion:
				'Props (propiedades) son datos pasados de padre a hijo (inmutables). State es interno al componente y mutable.',
			dificultad: 'básico',
			categoria: 'Componentes',
			keywords: ['propiedades', 'flujo de datos', 'inmutabilidad'],
		},
		{
			id: 5,
			pregunta: '¿Qué es un Higher-Order Component (HOC)?',
			opciones: [
				'Un componente de alto rendimiento',
				'Función que toma un componente y devuelve otro',
				'Componente con múltiples hijos',
				'Un hook especial',
			],
			respuesta: 1,
			explicacion:
				'HOC es un patrón avanzado para reutilizar lógica de componentes (ej: connect de Redux).',
			dificultad: 'avanzado',
			categoria: 'Patrones',
			keywords: ['HOC', 'reutilización', 'composición'],
		},
		{
			id: 6,
			pregunta: '¿Cómo se maneja el enrutamiento en React?',
			opciones: [
				'Con el componente Window',
				'Usando React Router',
				'Nativamente con <a> tags',
				'Con useHistory',
			],
			respuesta: 1,
			explicacion:
				'React Router es la librería más usada: BrowserRouter, Route, Routes y Link son componentes clave.',
			dificultad: 'intermedio',
			categoria: 'Routing',
			keywords: ['react-router', 'SPA', 'navegación'],
		},
		{
			id: 7,
			pregunta: '¿Para qué sirve React.memo?',
			opciones: [
				'Memorizar valores',
				'Optimizar renders de componentes',
				'Gestionar el estado global',
				'Crear efectos secundarios',
			],
			respuesta: 1,
			explicacion:
				'React.memo memoiza componentes funcionales para evitar rerenders innecesarios cuando las props no cambian.',
			dificultad: 'avanzado',
			categoria: 'Optimización',
			keywords: ['memoización', 'rendimiento', 'pure components'],
		},
		{
			id: 8,
			pregunta: '¿Qué devuelve customHook?',
			opciones: [
				'Solo estados',
				'JSX',
				'Lo que el desarrollador decida',
				'Siempre un array',
			],
			respuesta: 2,
			explicacion:
				'Los custom hooks son funciones que pueden retornar cualquier valor necesario para reutilizar lógica.',
			dificultad: 'intermedio',
			categoria: 'Hooks',
			keywords: ['custom hooks', 'reutilización', 'lógica'],
		},
		{
			id: 9,
			pregunta: '¿Qué es el Context API?',
			opciones: [
				'Sistema de plantillas',
				'Manejo de estado global sin librerías externas',
				'Herramienta de testing',
				'Lenguaje de consultas',
			],
			respuesta: 1,
			explicacion:
				'Context API permite pasar datos a través del árbol de componentes sin props drilling, usando Provider y Consumer.',
			dificultad: 'intermedio',
			categoria: 'Estado',
			keywords: ['context', 'provider', 'estado global'],
		},
		{
			id: 10,
			pregunta: '¿Qué patrón usa Redux?',
			opciones: ['Singleton', 'Flux', 'MVC', 'Observer'],
			respuesta: 1,
			explicacion:
				'Redux implementa el patrón Flux: Acciones -> Dispatcher -> Store -> View (Actualización unidireccional).',
			dificultad: 'avanzado',
			categoria: 'Estado',
			keywords: ['redux', 'flux', 'unidirectional'],
		},
	],
	config: {
		totalPreguntas: 10,
		dificultades: ['básico', 'intermedio', 'avanzado'],
		categorias: [
			'Fundamentos',
			'Componentes',
			'Estado',
			'Hooks',
			'Patrones',
			'Routing',
			'Optimización',
		],
	},
}
