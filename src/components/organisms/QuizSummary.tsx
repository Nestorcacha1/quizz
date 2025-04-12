import React from 'react'
import { Button, Icon, ProgressBar, Text } from '../atoms'
import UserCard from '../molecules/UserCard'
// import { UserCard } from '../molecules'

interface QuestionResult {
	id: string | number
	question: string
	userAnswer: string | null
	correctAnswer: string
	isCorrect: boolean
}

interface QuizSummaryProps {
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
	 * Tiempo total empleado en segundos (opcional)
	 */
	totalTime?: number

	/**
	 * Resultados detallados de cada pregunta
	 */
	questionResults?: QuestionResult[]

	/**
	 * Función para reiniciar el quiz
	 */
	onRestart?: () => void

	/**
	 * Función para compartir resultados (opcional)
	 */
	onShare?: () => void

	/**
	 * Mensaje personalizado según el resultado (opcional)
	 */
	feedbackMessage?: string

	/**
	 * Clases adicionales
	 */
	className?: string
}

const QuizSummary: React.FC<QuizSummaryProps> = ({
	username,
	avatarUrl,
	score,
	totalScore,
	totalTime,
	questionResults = [],
	onRestart,
	onShare,
	feedbackMessage,
	className = '',
}) => {
	// Calcular porcentaje de acierto
	const percentage = Math.round((score / totalScore) * 100)

	// Determinar mensaje según porcentaje si no se proporciona uno personalizado
	const getDefaultFeedback = () => {
		if (percentage >= 80) {
			return '¡Excelente trabajo! Tienes un gran conocimiento.'
		} else if (percentage >= 60) {
			return 'Buen trabajo, tienes un conocimiento sólido.'
		} else if (percentage >= 40) {
			return 'Buen intento, pero podrías mejorar un poco más.'
		} else {
			return 'Sigue practicando para mejorar tu conocimiento.'
		}
	}

	// Formatear tiempo total
	const formatTime = (seconds?: number) => {
		if (!seconds) return 'N/A'
		const minutes = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${minutes}m ${secs}s`
	}

	return (
		<div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
			<div className='text-center mb-8'>
				<Text variant='h3' className='mb-2'>
					Resultados del Quiz
				</Text>

				<Text variant='body1' color='secondary' className='mb-6'>
					{feedbackMessage || getDefaultFeedback()}
				</Text>

				<div className='flex justify-center mb-6'>
					<UserCard
						username={username}
						score={score}
						maxScore={totalScore}
						avatarUrl={avatarUrl}
						size='large'
						variant='filled'
					/>
				</div>

				<div className='mb-6'>
					<Text variant='subtitle2' className='mb-2'>
						Puntuación: {score} de {totalScore} puntos ({percentage}%)
					</Text>
					<ProgressBar
						value={score}
						max={totalScore}
						height='md'
						variant={
							percentage >= 70
								? 'success'
								: percentage >= 40
								? 'warning'
								: 'danger'
						}
						rounded
						animated
						showLabel
					/>
				</div>

				{totalTime && (
					<div className='flex items-center justify-center gap-2 mb-6'>
						<Icon type='info' size='small' />
						<Text variant='body2'>Tiempo total: {formatTime(totalTime)}</Text>
					</div>
				)}
			</div>

			{questionResults.length > 0 && (
				<div className='mb-8'>
					<Text variant='subtitle1' className='mb-4 border-b pb-2'>
						Resumen de respuestas
					</Text>

					<div className='space-y-4'>
						{questionResults.map(result => (
							<div
								key={result.id}
								className={`p-4 rounded-md border ${
									result.isCorrect
										? 'bg-green-50 border-green-200'
										: 'bg-red-50 border-red-200'
								}`}
							>
								<div className='flex items-start gap-3'>
									<div className='mt-1'>
										{result.isCorrect ? (
											<Icon type='correct' size='small' />
										) : (
											<Icon type='wrong' size='small' />
										)}
									</div>
									<div>
										<Text variant='body2' bold>
											{result.question}
										</Text>

										<div className='mt-2'>
											<Text variant='caption' color='secondary'>
												Tu respuesta: {result.userAnswer || 'Sin respuesta'}
											</Text>

											{!result.isCorrect && (
												<Text
													variant='caption'
													className='block mt-1 text-green-700'
												>
													Respuesta correcta: {result.correctAnswer}
												</Text>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className='flex flex-col sm:flex-row gap-4 justify-center'>
				{onRestart && (
					<Button onClick={onRestart} variant='primary'>
						Volver a intentar
					</Button>
				)}

				{onShare && (
					<Button onClick={onShare} variant='outline'>
						Compartir resultados
					</Button>
				)}
			</div>
		</div>
	)
}

export default QuizSummary
