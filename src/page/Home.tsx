import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../components/template'
import { UserData } from '../components/organisms/QuizForm'
import { QuizCategory } from '../components/organisms/CategorySelector'

// Definir las categorías basadas en los lenguajes de programación disponibles
const programmingCategories: QuizCategory[] = [
	{
		id: 'javascript',
		name: 'JavaScript',
		description:
			'Preguntas sobre conceptos fundamentales, ES6+, promesas, async/await y más.',
		questionCount: 10,
		difficulty: 'Mixto',
		imageUrl: '/javascript.png',
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		description:
			'Preguntas sobre tipado, interfaces, generics, decoradores y características avanzadas.',
		questionCount: 10,
		difficulty: 'Intermedio',
		imageUrl: '/typescript.png',
	},
	{
		id: 'java',
		name: 'Java',
		description:
			'Preguntas sobre POO, colecciones, concurrencia, excepciones y patrones.',
		questionCount: 10,
		difficulty: 'Difícil',
		imageUrl: '/java.png',
	},
	{
		id: 'express',
		name: 'Express.js',
		description:
			'Preguntas sobre middleware, rutas, REST, configuración y seguridad.',
		questionCount: 10,
		difficulty: 'Difícil',
		imageUrl: '/express.png',
	},
	{
		id: 'react',
		name: 'React',
		description:
			'Preguntas sobre componentes, hooks, estado, optimización y patrones.',
		questionCount: 10,
		difficulty: 'Mixto',
		imageUrl: '/react.png',
	},
]

function Home() {
	const navigate = useNavigate()

	const handleStartQuiz = (userData: UserData, categoryId: string) => {
		// Guardar los datos del usuario y categoría seleccionada en localStorage
		localStorage.setItem('quizUser', JSON.stringify(userData))
		localStorage.setItem('quizCategory', categoryId)

		// Navegar a la página del quiz con la categoría seleccionada
		navigate(`/quiz/${categoryId}`)
	}

	return (
		<HomeTemplate
			quizTitle='Quiz de Lenguajes de Programación'
			quizDescription='Pon a prueba tus conocimientos sobre diferentes lenguajes y frameworks de programación. ¿Estás listo para el desafío?'
			coverImage='/images.jpeg'
			onStartQuiz={handleStartQuiz}
			categories={programmingCategories}
			questionCount={10}
			estimatedTime={15}
			showInstructions={true}
		/>
	)
}

export default Home
