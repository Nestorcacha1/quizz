import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Text } from '../components/atoms'

// Definir la interfaz para los resultados del quiz
interface QuizResult {
	username: string
	score: number
	totalScore: number
	categoryId: string
	categoryName: string
	totalTime: number
	date: string
	avatarUrl?: string
}

// Interfaz para resultados agrupados por categoría
interface RankingData {
	[key: string]: QuizResult[]
}

function Ranking() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState<string>('all')
	const [rankingData, setRankingData] = useState<RankingData>({})
	const [loading, setLoading] = useState(true)

	// Cargar datos del ranking (normalmente vendrían de una API o localStorage)
	useEffect(() => {
		// Simulación de carga de datos
		setTimeout(() => {
			// En una aplicación real, estos datos vendrían de una base de datos
			// Por ahora, simulamos algunos resultados
			const mockData: QuizResult[] = [
				{
					username: 'María López',
					score: 9,
					totalScore: 10,
					categoryId: 'javascript',
					categoryName: 'JavaScript',
					totalTime: 345, // segundos
					date: '2023-04-10T14:30:00Z',
				},
				{
					username: 'Carlos Gómez',
					score: 8,
					totalScore: 10,
					categoryId: 'javascript',
					categoryName: 'JavaScript',
					totalTime: 412,
					date: '2023-04-09T10:15:00Z',
				},
				{
					username: 'Ana Martínez',
					score: 10,
					totalScore: 10,
					categoryId: 'typescript',
					categoryName: 'TypeScript',
					totalTime: 390,
					date: '2023-04-08T16:45:00Z',
				},
				{
					username: 'Javier Rodríguez',
					score: 7,
					totalScore: 10,
					categoryId: 'typescript',
					categoryName: 'TypeScript',
					totalTime: 480,
					date: '2023-04-07T11:20:00Z',
				},
				{
					username: 'Laura Sánchez',
					score: 9,
					totalScore: 10,
					categoryId: 'react',
					categoryName: 'React',
					totalTime: 420,
					date: '2023-04-06T09:30:00Z',
				},
				{
					username: 'Miguel Fernández',
					score: 6,
					totalScore: 10,
					categoryId: 'java',
					categoryName: 'Java',
					totalTime: 510,
					date: '2023-04-05T15:10:00Z',
				},
				{
					username: 'Sara Pérez',
					score: 8,
					totalScore: 10,
					categoryId: 'express',
					categoryName: 'Express.js',
					totalTime: 375,
					date: '2023-04-04T13:25:00Z',
				},
			]

			// Intentar cargar resultados reales desde localStorage
			try {
				const storedResult = localStorage.getItem('quizResults')
				if (storedResult) {
					const userResult = JSON.parse(storedResult) as QuizResult
					// Añadir fecha actual al resultado del usuario
					userResult.date = new Date().toISOString()
					mockData.push(userResult)
				}
			} catch (error) {
				console.error('Error loading quiz results:', error)
			}

			// Agrupar por categoría
			const groupedData: RankingData = { all: [] }
			mockData.forEach(result => {
				if (!groupedData[result.categoryId]) {
					groupedData[result.categoryId] = []
				}
				groupedData[result.categoryId].push(result)
				groupedData.all.push(result)
			})

			// Ordenar cada grupo por puntuación (primero) y tiempo (segundo criterio)
			Object.keys(groupedData).forEach(key => {
				groupedData[key].sort((a, b) => {
					// Primero por puntuación (porcentaje)
					const scorePercentA = (a.score / a.totalScore) * 100
					const scorePercentB = (b.score / b.totalScore) * 100

					if (scorePercentB !== scorePercentA) {
						return scorePercentB - scorePercentA
					}

					// Si las puntuaciones son iguales, ordenar por tiempo (menor tiempo primero)
					return a.totalTime - b.totalTime
				})
			})

			setRankingData(groupedData)
			setLoading(false)
		}, 800) // Simular tiempo de carga
	}, [])

	// Formatear tiempo en formato mm:ss
	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	// Obtener categorías disponibles
	const categories = Object.keys(rankingData).filter(key => key !== 'all')

	// Determinar el color de medalla según la posición
	const getMedalColor = (index: number): string => {
		switch (index) {
			case 0:
				return 'bg-yellow-500' // Oro
			case 1:
				return 'bg-gray-300' // Plata
			case 2:
				return 'bg-amber-700' // Bronce
			default:
				return 'bg-gray-200'
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 py-8'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<div className='flex justify-between items-center mb-6'>
						<div>
							<Text variant='h2' className='text-flame-pea-600'>
								Ranking de Quizzes
							</Text>
							<Text variant='body2' color='secondary' className='mt-1'>
								Los mejores resultados en cada categoría
							</Text>
						</div>

						<Button
							variant='outline'
							onClick={() => navigate('/')}
							size='small'
						>
							<div className='flex items-center'>
								<Icon type='home' size='small' />
								<span className='ml-2'>Inicio</span>
							</div>
						</Button>
					</div>

					{/* Tabs de categorías */}
					<div className='mb-6 overflow-x-auto'>
						<div className='flex space-x-2 min-w-max'>
							<button
								onClick={() => setActiveTab('all')}
								className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
									activeTab === 'all'
										? 'bg-flame-pea-600 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'
								}`}
							>
								Todos
							</button>

							{categories.map(category => (
								<button
									key={category}
									onClick={() => setActiveTab(category)}
									className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										activeTab === category
											? 'bg-flame-pea-600 text-white'
											: 'bg-white text-gray-700 hover:bg-gray-100'
									}`}
								>
									{rankingData[category]?.[0]?.categoryName || category}
								</button>
							))}
						</div>
					</div>

					{/* Tabla de ranking */}
					<div className='bg-white rounded-lg shadow overflow-hidden'>
						{loading ? (
							<div className='py-12 text-center'>
								<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-flame-pea-500 mx-auto mb-4'></div>
								<Text variant='body2' color='secondary'>
									Cargando ranking...
								</Text>
							</div>
						) : rankingData[activeTab]?.length ? (
							<div className='overflow-x-auto'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												Posición
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												Usuario
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												Categoría
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												Puntuación
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
											>
												Tiempo
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
										{rankingData[activeTab].map((result, index) => (
											<tr
												key={`${result.username}-${result.categoryId}-${index}`}
												className={index < 3 ? 'bg-gray-50' : ''}
											>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='flex items-center'>
														<div
															className={`${getMedalColor(
																index
															)} h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs`}
														>
															{index + 1}
														</div>
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='flex items-center'>
														<div className='flex-shrink-0 h-10 w-10 bg-flame-pea-100 rounded-full flex items-center justify-center text-flame-pea-700 font-bold'>
															{result.username.charAt(0)}
														</div>
														<div className='ml-4'>
															<div className='text-sm font-medium text-gray-900'>
																{result.username}
															</div>
															<div className='text-sm text-gray-500'>
																{new Date(result.date).toLocaleDateString()}
															</div>
														</div>
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<span className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
														{result.categoryName}
													</span>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-900 font-medium'>
														{result.score} / {result.totalScore}
													</div>
													<div className='text-xs text-gray-500'>
														{Math.round(
															(result.score / result.totalScore) * 100
														)}
														%
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{formatTime(result.totalTime)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className='py-12 text-center'>
								<Text variant='body1'>
									No hay datos disponibles para esta categoría.
								</Text>
							</div>
						)}
					</div>

					{/* Información adicional */}
					<div className='mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4'>
						<div className='flex items-start'>
							<Icon
								type='info'
								size='small'
								color='text-blue-600'
								className='mt-0.5'
							/>
							<div className='ml-3'>
								<Text variant='body2' className='text-blue-800'>
									¿Cómo se calcula el ranking?
								</Text>
								<Text variant='caption' className='text-blue-700 mt-1'>
									El ranking se basa primero en el porcentaje de respuestas
									correctas y luego en el tiempo total empleado. Los usuarios
									con mayor puntuación aparecen primero. En caso de empate, gana
									quien completó el quiz en menos tiempo.
								</Text>
							</div>
						</div>
					</div>

					{/* Botones de acción */}
					<div className='flex justify-center mt-8 gap-2'>
						<Button
							onClick={() => navigate('/')}
							variant='primary'
							// className='mr-4'
						>
							Intentar otro quiz
						</Button>
						<Button onClick={() => navigate('/results')} variant='outline'>
							Ver mi resultado
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Ranking
