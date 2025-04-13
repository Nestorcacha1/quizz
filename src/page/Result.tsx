import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResultsTemplate } from '../components/template'
import { QuestionResult } from '../types/ResultTemplate'

function ResultsPage() {
	const navigate = useNavigate()
	interface QuizResults {
		username: string
		score: number
		totalScore: number
		totalTime: number
		answers: QuestionResult[]
		categoryName?: string
	}

	const [results, setResults] = useState<QuizResults | null>(null)

	useEffect(() => {
		const storedResults = localStorage.getItem('quizResults')
		if (storedResults) {
			setResults(JSON.parse(storedResults))
		} else {
			// Si no hay resultados, redirigir al inicio
			navigate('/')
		}
	}, [navigate])

	if (!results) {
		return <div>Cargando resultados...</div>
	}

	return (
		<ResultsTemplate
			username={results.username || 'Usuario'}
			score={results.score}
			totalScore={results.totalScore}
			totalTime={results.totalTime}
			questionResults={results.answers} // Asegúrate que esto contenga toda la información
			quizCategory={results.categoryName}
			onRestart={() => navigate('/')}
			onViewRanking={() => navigate('/ranking')}
			onShare={() => {
				if (navigator.share) {
					navigator.share({
						title: `Resultados de ${results.categoryName || 'Quiz'}`,
						text: `¡Obtuve ${results.score} de ${results.totalScore} puntos!`,
						url: window.location.href,
					})
				} else {
					alert('Compartir no está disponible en este navegador')
				}
			}}
			onGoHome={() => navigate('/')}
		/>
	)
}

export default ResultsPage
