import React from 'react'
import { Text, Timer } from '../atoms'

interface QuestionHeaderProps {
	/**
	 * Número actual de la pregunta
	 */
	currentQuestion: number

	/**
	 * Número total de preguntas en el quiz
	 */
	totalQuestions: number

	/**
	 * Título de la pregunta (opcional)
	 */
	title?: string

	/**
	 * Tiempo en segundos para responder la pregunta
	 */
	timeLimit?: number

	/**
	 * Función a ejecutar cuando se acaba el tiempo
	 */
	onTimeUp?: () => void

	/**
	 * Si el temporizador está pausado
	 */
	isPaused?: boolean

	/**
	 * Clases adicionales para personalizar
	 */
	className?: string
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
	currentQuestion,
	totalQuestions,
	title,
	timeLimit,
	onTimeUp,
	isPaused = false,
	className = '',
}) => {
	return (
		<div
			className={`flex flex-col md:flex-row md:items-center md:justify-between mb-4 ${className}`}
		>
			<div>
				<div className='flex items-center gap-2 mb-1'>
					<div className='px-3 py-1 bg-flame-pea-100 text-flame-pea-800 font-medium text-sm rounded-full'>
						Pregunta {currentQuestion} de {totalQuestions}
					</div>

					{title && (
						<Text variant='h4' className='ml-2 mb-0'>
							{title}
						</Text>
					)}
				</div>
			</div>

			{timeLimit && (
				<div className='mt-2 md:mt-0'>
					<Timer
						initialTime={timeLimit}
						onTimeUp={onTimeUp}
						isPaused={isPaused}
						size='medium'
						variant={
							timeLimit <= 10
								? 'danger'
								: timeLimit <= 30
								? 'warning'
								: 'default'
						}
					/>
				</div>
			)}
		</div>
	)
}

export default QuestionHeader
