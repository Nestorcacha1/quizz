import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizPageTemplate } from '../components/template'
import {
	QuestionJs,
	QuestionTs,
	QuestionJava,
	QuestionEx,
	QuestionReact,
} from '../constants/questions'

// Definir la interfaz de resultados para evitar el "any"
interface QuizResults {
	score: number
	totalScore: number
	answers: {
		id: string | number
		question: string
		userAnswer: string | null
		correctAnswer: string
		isCorrect: boolean
	}[]
	totalTime: number
}

function QuizPage() {
	const navigate = useNavigate()
	const { categoryId } = useParams<{ categoryId: string }>()
	const [userData, setUserData] = useState({ username: 'Usuario' })
	const [loading, setLoading] = useState(true)

	// Cargar los datos del usuario al inicio
	useEffect(() => {
		const storedUserData = localStorage.getItem('quizUser')

		if (storedUserData) {
			setUserData(JSON.parse(storedUserData))
		} else {
			// Si no hay datos de usuario, redirigir al inicio
			navigate('/')
			return
		}

		// Verificar que la categoría existe
		const storedCategory = localStorage.getItem('quizCategory')
		if (!categoryId || !storedCategory || storedCategory !== categoryId) {
			navigate('/')
			return
		}

		setLoading(false)
	}, [navigate, categoryId])

	// Obtener preguntas según la categoría seleccionada
	const getQuestions = () => {
		let questions

		// Seleccionar el conjunto de preguntas según la categoría
		switch (categoryId) {
			case 'javascript':
				questions = QuestionJs.quiz
				break
			case 'typescript':
				questions = QuestionTs.quiz
				break
			case 'java':
				questions = QuestionJava.quiz
				break
			case 'express':
				questions = QuestionEx.quiz
				break
			case 'react':
				questions = QuestionReact.quiz
				break
			default:
				questions = QuestionJs.quiz // Por defecto, mostrar preguntas de JavaScript
		}

		// Convertir al formato esperado por QuizPageTemplate
		return questions.map(q => ({
			id: q.id,
			questionText: q.pregunta,
			options: q.opciones.map((opcion, index) => ({
				id: index,
				text: opcion,
				isCorrect: index === q.respuesta,
			})),
			// imageUrl: q.imagen,
			// explanation: q.explanation,
			// category: q.category,
		}))
	}

	// Manejar cuando el quiz se completa
	const handleQuizComplete = (results: QuizResults) => {
		console.log('Quiz completado:', results)

		// Guardar resultados en localStorage
		localStorage.setItem(
			'quizResults',
			JSON.stringify({
				...results,
				categoryId,
				categoryName: getCategoryTitle(),
				username: userData.username,
			})
		)

		// Navegar a la página de resultados
		navigate('/results')
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-flame-pea-500 mx-auto mb-4'></div>
					<p className='text-flame-pea-600'>Cargando preguntas...</p>
				</div>
			</div>
		)
	}

	// Título dinámico según categoría
	const getCategoryTitle = () => {
		switch (categoryId) {
			case 'javascript':
				return 'Quiz de JavaScript'
			case 'typescript':
				return 'Quiz de TypeScript'
			case 'java':
				return 'Quiz de Java'
			case 'express':
				return 'Quiz de Express.js'
			case 'react':
				return 'Quiz de React'
			default:
				return 'Quiz de Programación'
		}
	}

	return (
		<QuizPageTemplate
			quizTitle={getCategoryTitle()}
			userData={userData}
			questions={getQuestions()}
			onQuizComplete={handleQuizComplete}
			allowBackNavigation={true}
		/>
	)
}

export default QuizPage
