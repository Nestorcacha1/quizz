import React, { useState } from 'react'
import { Button, Text, Image } from '../atoms'
import { QuestionHeader, OptionList } from '../molecules'
import { Option } from '../molecules/OptionList' // Asegúrate de que esta importación sea correcta

interface QuestionCardProps {
	/**
	 * ID único de la pregunta
	 */
	id: string | number

	/**
	 * Texto de la pregunta
	 */
	questionText: string

	/**
	 * Opciones de respuesta
	 */
	options: Option[]

	/**
	 * Número de la pregunta actual
	 */
	questionNumber: number

	/**
	 * Total de preguntas en el quiz
	 */
	totalQuestions: number

	/**
	 * URL de la imagen asociada a la pregunta (opcional)
	 */
	imageUrl?: string

	/**
	 * Tiempo límite para responder en segundos (opcional)
	 */
	timeLimit?: number

	/**
	 * Función que maneja cuando se pasa a la siguiente pregunta
	 */
	onNext?: (selectedOptionId: string | number | null) => void

	/**
	 * Función que se ejecuta cuando se acaba el tiempo
	 */
	onTimeUp?: () => void

	/**
	 * Si se debe mostrar la respuesta correcta inmediatamente
	 */
	showResultsImmediately?: boolean

	/**
	 * ID de la opción seleccionada por el usuario
	 * Este es un nuevo prop que necesitamos agregar
	 */
	selectedOptionId?: string | number | null

	/**
	 * Función que se ejecuta cuando el usuario selecciona una opción
	 * Este es un nuevo prop que necesitamos agregar
	 */
	onOptionSelect?: (optionId: string | number) => void

	/**
	 * Indica si se deben mostrar los resultados de la pregunta
	 * Este es un nuevo prop que necesitamos agregar
	 */
	showResult?: boolean

	/**
	 * Función que se ejecuta cuando el usuario quiere verificar su respuesta
	 * Este es un nuevo prop que necesitamos agregar
	 */
	onCheckAnswer?: () => void

	/**
	 * Clases adicionales
	 */
	className?: string
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	// id,
	questionText,
	options,
	questionNumber,
	totalQuestions,
	imageUrl,
	timeLimit,
	onNext,
	onTimeUp,
	showResultsImmediately = false,
	selectedOptionId: externalSelectedOptionId = null, // Nuevo prop con valor por defecto
	onOptionSelect: externalOptionSelect, // Nuevo prop
	showResult: externalShowResults = false, // Nuevo prop con valor por defecto
	onCheckAnswer: externalCheckAnswer, // Nuevo prop
	className = '',
}) => {
	// Estado para manejar la opción seleccionada (sólo si no viene del exterior)
	const [internalSelectedOptionId, setInternalSelectedOptionId] = useState<
		string | number | null
	>(null)

	// Estado para saber si se han mostrado los resultados (sólo si no viene del exterior)
	const [internalShowResults, setInternalShowResults] = useState(false)

	// Usar el estado interno o externo según corresponda
	const selectedOptionId =
		externalSelectedOptionId !== undefined
			? externalSelectedOptionId
			: internalSelectedOptionId
	const showResults =
		externalShowResults !== undefined
			? externalShowResults
			: internalShowResults

	// Manejar cuando se selecciona una opción
	const handleOptionSelect = (optionId: string | number) => {
		if (!showResults) {
			// Si tenemos un manejador externo, lo llamamos
			if (externalOptionSelect) {
				externalOptionSelect(optionId)
			} else {
				// Si no, usamos el estado interno
				setInternalSelectedOptionId(optionId)
			}

			// Si está configurado para mostrar resultados inmediatamente
			if (showResultsImmediately && !externalShowResults) {
				setInternalShowResults(true)
			}
		}
	}

	// Manejar cuando se hace clic en verificar respuesta
	const handleCheckAnswer = () => {
		// Si tenemos un manejador externo, lo llamamos
		if (externalCheckAnswer) {
			externalCheckAnswer()
		} else {
			// Si no, usamos el estado interno
			setInternalShowResults(true)
		}
	}

	// Manejar cuando se hace clic en siguiente pregunta
	const handleNextQuestion = () => {
		if (onNext) {
			onNext(selectedOptionId)
		}

		// Resetear estados internos para la siguiente pregunta (sólo si los usamos)
		if (!externalSelectedOptionId) {
			setInternalSelectedOptionId(null)
		}
		if (!externalShowResults) {
			setInternalShowResults(false)
		}
	}

	return (
		<div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
			{/* Cabecera con número de pregunta y temporizador */}
			<QuestionHeader
				currentQuestion={questionNumber}
				totalQuestions={totalQuestions}
				timeLimit={timeLimit}
				onTimeUp={onTimeUp}
				isPaused={showResults}
			/>

			{/* Texto de la pregunta */}
			<Text variant='h4' className='mb-4'>
				{questionText}
			</Text>

			{/* Imagen de la pregunta (si existe) */}
			{imageUrl && (
				<div className='mb-6'>
					<Image
						src={imageUrl}
						alt='Imagen de la pregunta'
						aspectRatio='aspect-video'
						objectFit='contain'
						rounded
						className='mb-4'
					/>
				</div>
			)}

			{/* Lista de opciones */}
			<OptionList
				options={options}
				selectedOptionId={selectedOptionId}
				onOptionSelect={handleOptionSelect}
				showResults={showResults}
				disabled={showResults}
				className='mb-6'
			/>

			{/* Botón para verificar respuesta o pasar a la siguiente pregunta */}
			<div className='flex justify-end'>
				{!showResults ? (
					<Button
						onClick={handleCheckAnswer}
						disabled={selectedOptionId === null}
					>
						Comprobar respuesta
					</Button>
				) : (
					<Button onClick={handleNextQuestion} variant='primary'>
						{questionNumber === totalQuestions
							? 'Ver resultados'
							: 'Siguiente pregunta'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default QuestionCard
