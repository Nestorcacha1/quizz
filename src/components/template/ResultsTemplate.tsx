import React from 'react'
import { Button, Icon, ProgressBar, Text } from '../atoms'
import UserCard from '../molecules/UserCard'
import { ResultsTemplateProps } from '../../types/ResultTemplate'

const ResultsTemplate: React.FC<ResultsTemplateProps> = ({
	username,
	avatarUrl,
	score,
	totalScore,
	totalTime,
	questionResults = [],
	onRestart,
	onViewRanking,
	onShare,
	onGoHome,
	quizTitle = 'Quiz',
	quizCategory = '',
}) => {
	// Calcular porcentaje
	const percentage = Math.round((score / totalScore) * 100)

	// Obtener mensaje personalizado según el rendimiento
	const getFeedbackMessage = () => {
		if (percentage >= 90) {
			return '¡Extraordinario! Dominas el tema a la perfección.'
		} else if (percentage >= 70) {
			return '¡Muy buen trabajo! Tienes un gran conocimiento.'
		} else if (percentage >= 50) {
			return 'Buen esfuerzo. Hay margen para mejorar.'
		} else if (percentage >= 30) {
			return 'Puedes hacerlo mejor. ¡Sigue practicando!'
		} else {
			return 'No te desanimes, intenta de nuevo para mejorar tu puntuación.'
		}
	}

	// Determinar el nivel
	const getLevel = () => {
		if (percentage >= 90) return 'Experto'
		if (percentage >= 70) return 'Avanzado'
		if (percentage >= 50) return 'Intermedio'
		if (percentage >= 30) return 'Principiante'
		return 'Novato'
	}

	// Formatear tiempo
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	// Calcular tiempo promedio por pregunta
	const averageTimePerQuestion = Math.round(totalTime / totalScore)

	// Calcular estadísticas por categorías (si existen)
	const getCategoryStats = () => {
		const categories: Record<string, { total: number; correct: number }> = {}

		questionResults.forEach(result => {
			const category = result.category || 'General'

			if (!categories[category]) {
				categories[category] = { total: 0, correct: 0 }
			}

			categories[category].total++
			if (result.isCorrect) {
				categories[category].correct++
			}
		})

		return Object.entries(categories).map(([name, stats]) => ({
			name,
			percentage: Math.round((stats.correct / stats.total) * 100),
			correct: stats.correct,
			total: stats.total,
		}))
	}

	// Encontrar fortalezas y debilidades
	const findStrengthsAndWeaknesses = () => {
		const categoryStats = getCategoryStats()

		const strengths = categoryStats
			.filter(cat => cat.percentage >= 70)
			.map(cat => cat.name)

		const weaknesses = categoryStats
			.filter(cat => cat.percentage < 50)
			.map(cat => cat.name)

		return { strengths, weaknesses }
	}

	const { strengths, weaknesses } = findStrengthsAndWeaknesses()

	// Generar sugerencias personalizadas
	const getPersonalizedSuggestions = () => {
		if (percentage >= 90) {
			return [
				'Comparte tu conocimiento con otros',
				'Profundiza con material más avanzado',
				'Intenta abordar retos más complejos',
			]
		} else if (percentage >= 70) {
			return [
				'Repasa los conceptos donde cometiste errores',
				'Explora más a fondo los temas relacionados',
				'Practica con ejercicios prácticos',
			]
		} else if (percentage >= 50) {
			return [
				'Dedica más tiempo a estudiar los conceptos básicos',
				'Intenta practicar regularmente con ejemplos',
				'Busca diferentes fuentes de aprendizaje',
			]
		} else {
			return [
				'Comienza con lo fundamental y construye desde ahí',
				'Dedica sesiones cortas pero regulares al estudio',
				'Busca material introductorio y tutoriales paso a paso',
				'No te desanimes, el aprendizaje lleva tiempo',
			]
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					{/* Cabecera con título y botón para volver */}
					<div className='flex justify-between items-center mb-6'>
						<Text variant='h2' className='text-flame-pea-600'>
							Resultados del {quizTitle}
						</Text>

						{onGoHome && (
							<Button variant='outline' onClick={onGoHome} size='small'>
								<div className='flex items-center'>
									<Icon type='home' size='small' />
									<span className='ml-2'>Inicio</span>
								</div>
							</Button>
						)}
					</div>

					{/* Tarjeta de resultados principales */}
					<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
						<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
							<div className='mb-4 md:mb-0'>
								<Text variant='h3' className='mb-2'>
									{getFeedbackMessage()}
								</Text>
								<Text variant='body2' color='secondary' className='mb-2'>
									Has completado el quiz en{' '}
									<span className='font-semibold'>{formatTime(totalTime)}</span>
								</Text>
								<div className='flex items-center mt-3 space-x-3'>
									<div className='bg-flame-pea-50 text-flame-pea-700 px-3 py-1 rounded-full font-medium text-sm'>
										Nivel: {getLevel()}
									</div>
									{quizCategory && (
										<div className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium text-sm'>
											{quizCategory}
										</div>
									)}
								</div>
							</div>

							<div className='flex-shrink-0'>
								<UserCard
									username={username}
									score={score}
									maxScore={totalScore}
									avatarUrl={avatarUrl}
									size='large'
									variant='filled'
								/>
							</div>
						</div>

						{/* Estadísticas detalladas */}
						<div className='mt-6 pt-4 border-t border-gray-100'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='bg-gray-50 rounded-lg p-3'>
									<div className='text-sm text-gray-500 mb-1'>Precisión</div>
									<div className='text-xl font-bold text-flame-pea-600'>
										{percentage}%
									</div>
									<ProgressBar
										value={percentage}
										max={100}
										height='sm'
										variant={
											percentage >= 70
												? 'primary'
												: percentage >= 50
												? 'secondary'
												: 'danger'
										}
										className='mt-2'
									/>
								</div>

								<div className='bg-gray-50 rounded-lg p-3'>
									<div className='text-sm text-gray-500 mb-1'>Tiempo total</div>
									<div className='text-xl font-bold text-flame-pea-600'>
										{formatTime(totalTime)}
									</div>
									<div className='text-xs text-gray-500 mt-2'>
										Tiempo promedio por pregunta:{' '}
										{formatTime(averageTimePerQuestion)}
									</div>
								</div>

								<div className='bg-gray-50 rounded-lg p-3'>
									<div className='text-sm text-gray-500 mb-1'>Puntuación</div>
									<div className='text-xl font-bold text-flame-pea-600'>
										{score}/{totalScore}
									</div>
									<div className='text-xs text-gray-500 mt-2'>
										{totalScore - score} respuestas incorrectas
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Análisis de rendimiento por categorías */}
					{getCategoryStats().length > 1 && (
						<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
							<Text variant='h4' className='mb-4'>
								Análisis por categorías
							</Text>

							<div className='space-y-4'>
								{getCategoryStats().map((cat, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm font-medium'>{cat.name}</span>
											<span className='text-sm font-medium'>
												{cat.correct}/{cat.total} ({cat.percentage}%)
											</span>
										</div>
										<ProgressBar
											value={cat.percentage}
											max={100}
											height='sm'
											variant={
												cat.percentage >= 70
													? 'primary'
													: cat.percentage >= 50
													? 'secondary'
													: 'danger'
											}
										/>
									</div>
								))}
							</div>

							<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
								{strengths.length > 0 && (
									<div className='bg-green-50 rounded-lg p-4 border border-green-100'>
										<Text variant='subtitle2' className='text-green-800 mb-2'>
											Tus fortalezas
										</Text>
										<ul className='list-disc pl-5 text-green-700 text-sm'>
											{strengths.map((strength, idx) => (
												<li key={idx}>{strength}</li>
											))}
										</ul>
									</div>
								)}

								{weaknesses.length > 0 && (
									<div className='bg-red-50 rounded-lg p-4 border border-red-100'>
										<Text variant='subtitle2' className='text-red-800 mb-2'>
											Áreas de mejora
										</Text>
										<ul className='list-disc pl-5 text-red-700 text-sm'>
											{weaknesses.map((weakness, idx) => (
												<li key={idx}>{weakness}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Resumen detallado de preguntas */}
					<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
						<Text variant='h4' className='mb-4'>
							Detalle de respuestas
						</Text>

						<div className='space-y-6'>
							{questionResults.map((result, index) => (
								<div
									key={result.id}
									className={`p-4 rounded-lg ${
										result.isCorrect
											? 'bg-green-50 border border-green-100'
											: 'bg-red-50 border border-red-100'
									}`}
								>
									<div className='flex items-start'>
										<div
											className={`flex-shrink-0 rounded-full h-6 w-6 flex items-center justify-center text-white ${
												result.isCorrect ? 'bg-green-500' : 'bg-red-500'
											}`}
										>
											{index + 1}
										</div>
										<div className='ml-3 flex-grow'>
											<Text
												variant='subtitle2'
												className={`${
													result.isCorrect ? 'text-green-800' : 'text-red-800'
												}`}
											>
												{result.question}
											</Text>

											<div className='mt-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
												<div>
													<div className='text-xs text-gray-500 mb-1'>
														Tu respuesta:
													</div>
													<div
														className={`text-sm ${
															result.isCorrect
																? 'text-green-600 font-medium'
																: 'text-red-600'
														}`}
													>
														{result.userAnswer || 'Sin respuesta'}
													</div>
												</div>

												<div>
													<div className='text-xs text-gray-500 mb-1'>
														Respuesta correcta:
													</div>
													<div className='text-sm text-green-600 font-medium'>
														{result.correctAnswer}
													</div>
												</div>
											</div>

											{result.timeSpent && (
												<div className='mt-2 text-xs text-gray-500'>
													Tiempo empleado: {formatTime(result.timeSpent)}
												</div>
											)}

											{result.explanation && (
												<div className='mt-3 bg-white p-3 rounded border border-gray-100'>
													<div className='text-xs text-gray-500 mb-1'>
														Explicación:
													</div>
													<div className='text-sm text-gray-700'>
														{result.explanation}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Sugerencias personalizadas */}
					<div className='bg-white rounded-lg shadow-md p-6 mb-8'>
						<Text variant='h4' className='mb-4'>
							Sugerencias personalizadas
						</Text>

						<div className='bg-blue-50 rounded-lg p-4 border border-blue-100'>
							<Text variant='subtitle2' className='text-blue-800 mb-3'>
								<span className='flex items-center'>
									<Icon type='info' size='small' />
									<span className='ml-2'>Para seguir mejorando</span>
								</span>
							</Text>

							<ul className='list-disc pl-5 text-blue-700 space-y-2'>
								{getPersonalizedSuggestions().map((suggestion, idx) => (
									<li key={idx}>{suggestion}</li>
								))}
							</ul>
						</div>

						{percentage < 70 && (
							<div className='mt-4'>
								<Text variant='body2' color='secondary' className='mb-2'>
									Recuerda que la práctica constante es la clave del
									aprendizaje. No te desanimes por los errores, son parte del
									proceso.
								</Text>
							</div>
						)}
					</div>

					{/* Botones de acción */}
					<div className='flex flex-wrap gap-4 justify-center'>
						<Button onClick={onRestart} variant='primary'>
							<div className='flex items-center'>
								<Icon type='refresh' size='small' />
								<span className='ml-2'>Volver a intentar</span>
							</div>
						</Button>

						{onViewRanking && (
							<Button onClick={onViewRanking} variant='secondary'>
								<div className='flex items-center'>
									<Icon type='rank' size='small' />
									<span className='ml-2'>Ver ranking</span>
								</div>
							</Button>
						)}

						{onShare && (
							<Button onClick={onShare} variant='outline'>
								<div className='flex items-center'>
									<Icon type='share' size='small' />
									<span className='ml-2'>Compartir resultados</span>
								</div>
							</Button>
						)}
					</div>

					{/* Pie de página */}
					<div className='text-center mt-10 text-sm text-gray-500'>
						<p>
							© {new Date().getFullYear()} Quiz App. Todos los derechos
							reservados.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResultsTemplate
