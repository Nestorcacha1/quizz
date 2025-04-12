import React from 'react'
import { Button, ProgressBar, Text } from '../atoms'

interface QuizNavigationProps {
	/**
	 * Número actual de la pregunta
	 */
	currentQuestion: number

	/**
	 * Total de preguntas en el quiz
	 */
	totalQuestions: number

	/**
	 * Función para ir a la pregunta anterior
	 */
	onPrevious?: () => void

	/**
	 * Función para ir a la pregunta siguiente
	 */
	onNext?: () => void

	/**
	 * Si está en la primera pregunta
	 */
	isFirstQuestion?: boolean

	/**
	 * Si está en la última pregunta
	 */
	isLastQuestion?: boolean

	/**
	 * Si el botón siguiente está deshabilitado (ej: hasta que se seleccione una respuesta)
	 */
	nextDisabled?: boolean

	/**
	 * Texto para el botón siguiente (por defecto "Siguiente")
	 */
	nextButtonText?: string

	/**
	 * Texto para el botón anterior (por defecto "Anterior")
	 */
	previousButtonText?: string

	/**
	 * Texto para el último botón (por defecto "Finalizar")
	 */
	finishButtonText?: string

	/**
	 * Clases adicionales para el componente
	 */
	className?: string

	/**
	 * Si se debe mostrar la barra de progreso
	 */
	showProgress?: boolean
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
	currentQuestion,
	totalQuestions,
	onPrevious,
	onNext,
	isFirstQuestion = currentQuestion === 1,
	isLastQuestion = currentQuestion === totalQuestions,
	nextDisabled = false,
	nextButtonText = 'Siguiente',
	previousButtonText = 'Anterior',
	finishButtonText = 'Finalizar quiz',
	className = '',
	showProgress = true,
}) => {
	return (
		<div className={`${className}`}>
			{/* Barra de progreso */}
			{showProgress && (
				<div className='mb-4'>
					<div className='flex justify-between items-center mb-1'>
						<Text variant='caption' color='secondary'>
							Progreso
						</Text>
						<Text variant='caption' color='secondary'>
							{currentQuestion} / {totalQuestions}
						</Text>
					</div>
					<ProgressBar
						value={currentQuestion}
						max={totalQuestions}
						height='sm'
						variant='primary'
						animated
						rounded
					/>
				</div>
			)}

			{/* Botones de navegación */}
			<div className='flex justify-between mt-4'>
				<div>
					{/* Botón Anterior, oculto si es la primera pregunta */}
					{!isFirstQuestion && onPrevious && (
						<Button onClick={onPrevious} variant='outline'>
							{previousButtonText}
						</Button>
					)}
				</div>

				<div className='flex items-center'>
					{/* Indicador de preguntas en móvil (visible solo cuando no se muestra la barra de progreso) */}
					{!showProgress && (
						<Text variant='body2' className='mx-4 text-gray-600'>
							{currentQuestion} / {totalQuestions}
						</Text>
					)}
				</div>

				<div>
					{/* Botón Siguiente o Finalizar */}
					<Button onClick={onNext} disabled={nextDisabled} variant='primary'>
						{isLastQuestion ? finishButtonText : nextButtonText}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default QuizNavigation
