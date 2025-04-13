export interface QuestionResult {
	id: string | number
	question: string
	userAnswer: string | null
	correctAnswer: string
	isCorrect: boolean
	explanation?: string // Añadido campo para explicación
	category?: string // Añadido campo para categorizar preguntas
	timeSpent?: number // Añadido campo para tiempo por pregunta
}

export interface ResultsTemplateProps {
	/**
	 * Nombre del usuario
	 */
	username: string

	/**
	 * URL del avatar (opcional)
	 */
	avatarUrl?: string

	/**
	 * Puntuación obtenida
	 */
	score: number

	/**
	 * Puntuación máxima posible
	 */
	totalScore: number

	/**
	 * Tiempo total empleado en segundos
	 */
	totalTime: number

	/**
	 * Resultados detallados de cada pregunta
	 */
	questionResults?: QuestionResult[]

	/**
	 * Función para reiniciar el quiz
	 */
	onRestart: () => void

	/**
	 * Función para ir a la página de ranking
	 */
	onViewRanking?: () => void

	/**
	 * Función para compartir resultados
	 */
	onShare?: () => void

	/**
	 * Función para volver a la página de inicio
	 */
	onGoHome?: () => void

	/**
	 * Título personalizado del quiz
	 */
	quizTitle?: string

	/**
	 * Categoría del quiz
	 */
	quizCategory?: string
}
