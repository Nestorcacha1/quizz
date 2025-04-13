import React, { useState } from 'react'
import { Button, Text } from '../atoms'
import { HomeTemplateProps } from '../../types/HomeTemplate'
import CategorySelector from '../organisms/CategorySelector'

const HomeTemplate: React.FC<HomeTemplateProps> = ({
	quizTitle = 'Quiz de Conocimientos Generales',
	quizDescription = 'Pon a prueba tu conocimiento con este divertido quiz.',
	onStartQuiz,
	categories = [],
	questionCount = 10,
	estimatedTime = 5,
	showInstructions = true,
}) => {
	// Estado para la categoría seleccionada
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		categories.length > 0 ? categories[0].id : null
	)

	// Estado para el nombre de usuario
	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>('')

	// Estado para controlar el paso del formulario
	const [step, setStep] = useState<'user-info' | 'category'>('user-info')

	// Manejar el envío del formulario de usuario simplificado
	const handleUserSubmit = () => {
		if (!username.trim()) {
			setUsernameError('Por favor, ingresa tu nombre')
			return
		}

		setUsernameError('')
		// const userData: UserData = { username: username.trim() }
		setStep('category')
	}

	// Manejar el inicio del quiz con la categoría seleccionada
	const handleStartQuiz = () => {
		if (selectedCategoryId && username) {
			onStartQuiz({ username }, selectedCategoryId)
		}
	}

	// Obtener la categoría seleccionada
	const selectedCategory = categories.find(cat => cat.id === selectedCategoryId)

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<div className='text-center mb-10'>
						<Text variant='h3' className='text-flame-pea-600 mb-4'>
							{quizTitle}
						</Text>
						<Text
							variant='body1'
							color='secondary'
							className='max-w-2xl mx-auto'
						>
							{quizDescription}
						</Text>
					</div>

					{/* Paso 1: Solo nombre de usuario */}
					{step === 'user-info' && (
						<div className='bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto'>
							<div className='text-center mb-6'>
								<Text variant='h5' className='mb-2'>
									¿Cómo te llamas?
								</Text>
								<Text variant='body2' color='secondary'>
									Ingresa tu nombre para comenzar
								</Text>
							</div>

							<div className='mb-6'>
								<label
									htmlFor='username'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Nombre
								</label>
								<input
									id='username'
									type='text'
									value={username}
									onChange={e => setUsername(e.target.value)}
									className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-flame-pea-500 ${
										usernameError ? 'border-red-500' : 'border-gray-300'
									}`}
									placeholder='Escribe tu nombre aquí'
								/>
								{usernameError && (
									<p className='mt-1 text-sm text-red-600'>{usernameError}</p>
								)}
							</div>

							<Button
								onClick={handleUserSubmit}
								variant='primary'
								// className='w-full'
							>
								Continuar
							</Button>

							{showInstructions && (
								<div className='mt-8 pt-6 border-t border-gray-200'>
									<Text variant='subtitle2' className='mb-3'>
										Instrucciones rápidas:
									</Text>

									<ul className='space-y-2 text-sm text-gray-600'>
										<li className='flex items-center'>
											<div className='bg-flame-pea-100 text-flame-pea-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0'>
												1
											</div>
											<span>Ingresa tu nombre y selecciona una categoría</span>
										</li>
										<li className='flex items-center'>
											<div className='bg-flame-pea-100 text-flame-pea-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0'>
												2
											</div>
											<span>
												Responde {questionCount} preguntas en aproximadamente{' '}
												{estimatedTime} minutos
											</span>
										</li>
										<li className='flex items-center'>
											<div className='bg-flame-pea-100 text-flame-pea-700 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0'>
												3
											</div>
											<span>
												Revisa tu puntuación y comparte tus resultados
											</span>
										</li>
									</ul>
								</div>
							)}
						</div>
					)}

					{/* Paso 2: Selección de Categoría */}
					{step === 'category' && (
						<div className='bg-white rounded-lg shadow-md p-6'>
							<div className='text-center mb-6'>
								<Text variant='h4' className='mb-2'>
									Hola, {username}!
								</Text>
								<Text variant='body2'>
									Elige la categoría de preguntas para tu quiz
								</Text>
							</div>

							{categories.length > 0 ? (
								<>
									<CategorySelector
										categories={categories}
										selectedCategoryId={selectedCategoryId}
										onSelectCategory={setSelectedCategoryId}
										className='mb-6'
									/>

									{selectedCategory && (
										<div className='border-t pt-4'>
											<div className='flex justify-between items-center'>
												<div>
													<Text variant='subtitle2'>
														Categoría seleccionada: {selectedCategory.name}
													</Text>
													<Text variant='caption' color='secondary'>
														{selectedCategory.questionCount} preguntas •
														Dificultad: {selectedCategory.difficulty}
													</Text>
												</div>

												<Button
													onClick={handleStartQuiz}
													variant='primary'
													size='medium'
												>
													Iniciar Quiz
												</Button>
											</div>
										</div>
									)}
								</>
							) : (
								<div className='text-center p-6'>
									<Text variant='body1' color='secondary'>
										No hay categorías disponibles en este momento.
									</Text>
								</div>
							)}

							<div className='mt-4 text-center'>
								<button
									onClick={() => setStep('user-info')}
									className='text-flame-pea-600 text-sm underline'
								>
									Volver atrás
								</button>
							</div>
						</div>
					)}

					{/* Footer */}
					<div className='text-center mt-12 text-sm text-gray-500'>
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

export default HomeTemplate
