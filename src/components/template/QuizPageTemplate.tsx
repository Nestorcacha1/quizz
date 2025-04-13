import React, { useEffect, useState } from 'react'
import { ProgressBar, Text, Timer } from '../atoms'
import UserCard from '../molecules/UserCard'
import { QuestionCard, QuizNavigation, QuizSummary } from '../organisms'
import {
	QuizPageTemplateProps,
	QuizResult,
	UserAnswer,
} from '../../types/QuizPageTemplate'

const QuizPageTemplate: React.FC<QuizPageTemplateProps> = ({
	quizTitle,
	userData,
	questions,
	onQuizComplete,
	showQuizTimer = false,
	quizTimeLimit = 0,
	allowBackNavigation = true,
}) => {
	// Estado para el índice de la pregunta actual
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

	// Estado para la opción seleccionada en la pregunta actual
	const [selectedOptionId, setSelectedOptionId] = useState<
		string | number | null
	>(null)

	// Estado para mostrar resultados de la pregunta actual
	const [showQuestionResult, setShowQuestionResult] = useState(false)

	// Estado para almacenar las respuestas del usuario
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

	// Estado para saber si el quiz ha finalizado
	const [quizCompleted, setQuizCompleted] = useState(false)

	// Estado para el tiempo total del quiz
	const [totalQuizTime, setTotalQuizTime] = useState(0)

	// Estado para el puntaje actual (corregido)
	const [currentScore, setCurrentScore] = useState(0)

	// Estado para rastrear tiempos
	const [questionStartTimes, setQuestionStartTimes] = useState<
		Record<number, number>
	>({})
	const [questionTimeSpent, setQuestionTimeSpent] = useState<
		Record<number, number>
	>({})

	// Timer para contar el tiempo total
	useEffect(() => {
		if (!quizCompleted) {
			const timer = setInterval(() => {
				setTotalQuizTime(prev => prev + 1)
			}, 1000)

			return () => clearInterval(timer)
		}
	}, [quizCompleted])

	// Registrar tiempo de inicio para la pregunta actual
	useEffect(() => {
		setQuestionStartTimes(prev => ({
			...prev,
			[currentQuestionIndex]: Date.now(),
		}))
	}, [currentQuestionIndex])

	// Obtener la pregunta actual
	const currentQuestion = questions[currentQuestionIndex]

	// Manejar cuando se selecciona una opción (descomentado y corregido)
	const handleOptionSelect = (optionId: string | number) => {
		if (!showQuestionResult) {
			setSelectedOptionId(optionId)
		}
	}

	// Manejar cuando se agota el tiempo
	const handleTimeUp = () => {
		if (!showQuestionResult) {
			setShowQuestionResult(true)
			// Cuando se acaba el tiempo, avanzar a la siguiente pregunta automáticamente después de un breve retraso
			setTimeout(() => {
				handleNext()
			}, 2000)
		}
	}

	// Manejar cuando se verifica la respuesta
	const handleCheckAnswer = () => {
		setShowQuestionResult(true)
	}

	// Manejar navegación a la pregunta anterior
	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1)
			setSelectedOptionId(
				userAnswers[currentQuestionIndex - 1]?.selectedOptionId || null
			)
			setShowQuestionResult(false)
		}
	}

	// Actualizar la puntuación basada en las respuestas correctas
	useEffect(() => {
		const correctCount = userAnswers.filter(answer => answer.isCorrect).length
		setCurrentScore(correctCount)
	}, [userAnswers])

	// Manejar navegación a la siguiente pregunta o finalizar quiz
	const handleNext = () => {
		// Calcular tiempo empleado en esta pregunta
		const startTime = questionStartTimes[currentQuestionIndex] || Date.now()
		const timeSpentOnQuestion = Math.round((Date.now() - startTime) / 1000) // en segundos

		// Guardar el tiempo empleado
		setQuestionTimeSpent(prev => ({
			...prev,
			[currentQuestionIndex]: timeSpentOnQuestion,
		}))

		// Guardar la respuesta actual
		const selectedOption = currentQuestion.options.find(
			opt => opt.id === selectedOptionId
		)
		const isCorrect = selectedOption?.isCorrect || false

		// Actualizar las respuestas del usuario
		const updatedAnswers = [...userAnswers]
		updatedAnswers[currentQuestionIndex] = {
			questionId: currentQuestion.id,
			selectedOptionId,
			isCorrect,
		}
		setUserAnswers(updatedAnswers)

		// Si hay más preguntas, avanzar a la siguiente
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
			setSelectedOptionId(
				userAnswers[currentQuestionIndex + 1]?.selectedOptionId || null
			)
			setShowQuestionResult(false)
		} else {
			// Si era la última pregunta, finalizar el quiz
			finishQuiz(updatedAnswers)
		}
	}

	// Finalizar el quiz y calcular resultados
	const finishQuiz = (answers: UserAnswer[]) => {
		setQuizCompleted(true)

		// Calcular puntuación
		const correctAnswers = answers.filter(answer => answer.isCorrect).length

		// Preparar resultados detallados
		const detailedResults = answers.map((answer, index) => {
			const question = questions[index]
			const correctOption = question.options.find(opt => opt.isCorrect)

			return {
				id: question.id,
				question: question.questionText,
				userAnswer:
					question.options.find(opt => opt.id === answer.selectedOptionId)
						?.text || null,
				correctAnswer: correctOption ? correctOption.text : '',
				isCorrect: answer.isCorrect,
				explanation: question.explanation || undefined,
				category: question.category || undefined,
				timeSpent: questionTimeSpent[index] || 0,
			}
		})

		// Resultados finales
		const results: QuizResult = {
			score: correctAnswers,
			totalScore: questions.length,
			answers: detailedResults,
			totalTime: totalQuizTime,
		}

		// Llamar al callback con los resultados
		if (onQuizComplete) {
			onQuizComplete(results)
		}
	}

	// Si el quiz ha terminado, mostrar el resumen
	if (quizCompleted) {
		return (
			<div className='min-h-screen bg-gray-50 py-8'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<Text
							variant='h2'
							align='center'
							className='mb-8 text-flame-pea-600'
						>
							¡Quiz completado!
						</Text>

						<QuizSummary
							username={userData.username}
							score={userAnswers.filter(answer => answer.isCorrect).length}
							totalScore={questions.length}
							totalTime={totalQuizTime}
							questionResults={userAnswers.map((answer, index) => {
								const question = questions[index]
								const correctOption = question.options.find(
									opt => opt.isCorrect
								)

								return {
									id: question.id,
									question: question.questionText,
									userAnswer:
										question.options.find(
											opt => opt.id === answer.selectedOptionId
										)?.text || null,
									correctAnswer: correctOption ? correctOption.text : '',
									isCorrect: answer.isCorrect,
								}
							})}
							onRestart={() => window.location.reload()}
						/>
					</div>
				</div>
			</div>
		)
	}

	// Formatear el tiempo para mostrar
	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className='min-h-screen bg-gray-50 py-4'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					{/* Header con información del quiz */}
					<div className='bg-white rounded-lg shadow-md p-4 mb-4'>
						<div className='flex flex-wrap justify-between items-center'>
							<div>
								<Text variant='h3' className='mb-1 text-flame-pea-600'>
									{quizTitle}
								</Text>
								<Text variant='body2' color='secondary'>
									Pregunta {currentQuestionIndex + 1} de {questions.length}
								</Text>
								<Text variant='caption' color='secondary' className='ml-2'>
									Tiempo: {formatTime(totalQuizTime)}
								</Text>
							</div>

							<div className='flex items-center'>
								<UserCard
									username={userData.username}
									score={currentScore}
									maxScore={currentQuestionIndex}
									size='small'
								/>

								{showQuizTimer && quizTimeLimit > 0 && (
									<div className='ml-4'>
										<Timer
											initialTime={quizTimeLimit}
											size='medium'
											onTimeUp={() => finishQuiz(userAnswers)}
										/>
									</div>
								)}
							</div>
						</div>

						{/* Barra de progreso */}
						<div className='mt-4'>
							<ProgressBar
								value={currentQuestionIndex + 1}
								max={questions.length}
								height='sm'
								variant='primary'
								animated
								showLabel
								labelFormat='fraction'
							/>
						</div>
					</div>

					{/* Tarjeta de la pregunta actual */}
					<QuestionCard
						id={currentQuestion.id}
						questionText={currentQuestion.questionText}
						options={currentQuestion.options}
						questionNumber={currentQuestionIndex + 1}
						totalQuestions={questions.length}
						imageUrl={currentQuestion.imageUrl}
						timeLimit={currentQuestion.timeLimit}
						onNext={handleNext}
						onTimeUp={handleTimeUp}
						showResultsImmediately={false}
						onOptionSelect={handleOptionSelect}
						selectedOptionId={selectedOptionId}
						showResult={showQuestionResult}
						onCheckAnswer={handleCheckAnswer}
					/>

					{/* Navegación entre preguntas */}
					<div className='mt-4'>
						<QuizNavigation
							currentQuestion={currentQuestionIndex + 1}
							totalQuestions={questions.length}
							onPrevious={allowBackNavigation ? handlePrevious : undefined}
							onNext={handleNext}
							isFirstQuestion={currentQuestionIndex === 0}
							isLastQuestion={currentQuestionIndex === questions.length - 1}
							nextDisabled={selectedOptionId === null}
							showProgress={false}
							finishButtonText='Finalizar quiz'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuizPageTemplate
