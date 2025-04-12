import React from 'react'
import { Text } from '../atoms'

export interface QuizCategory {
	id: string
	name: string
	description: string
	questionCount: number
	difficulty: 'Fácil' | 'Intermedio' | 'Difícil' | 'Mixto'
	imageUrl?: string
}

interface CategorySelectorProps {
	categories: QuizCategory[]
	selectedCategoryId: string | null
	onSelectCategory: (categoryId: string) => void
	className?: string
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
	categories,
	selectedCategoryId,
	onSelectCategory,
	className = '',
}) => {
	return (
		<div className={`space-y-4 ${className}`}>
			<Text variant='subtitle1' className='mb-2'>
				Selecciona una categoría
			</Text>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				{categories.map(category => (
					<div
						key={category.id}
						className={`
              cursor-pointer rounded-lg p-4 transition-all border
              ${
								selectedCategoryId === category.id
									? 'border-flame-pea-500 bg-flame-pea-50 shadow-md'
									: 'border-gray-200 bg-white hover:border-flame-pea-200'
							}
            `}
						onClick={() => onSelectCategory(category.id)}
					>
						<div className='flex items-center'>
							<div className='flex-shrink-0'>
								{category.imageUrl ? (
									<img
										src={category.imageUrl}
										alt={category.name}
										className='w-12 h-12 rounded object-cover'
									/>
								) : (
									<div className='w-12 h-12 rounded bg-flame-pea-100 flex items-center justify-center text-flame-pea-700 font-bold'>
										{category.name.charAt(0)}
									</div>
								)}
							</div>

							<div className='ml-4'>
								<Text variant='subtitle2' className='mb-1'>
									{category.name}
								</Text>
								<div className='flex items-center text-xs text-gray-500 space-x-2'>
									<span>{category.questionCount} preguntas</span>
									<span>•</span>
									<span
										className={`
                      px-2 py-0.5 rounded-full text-xs
                      ${
												category.difficulty === 'Fácil'
													? 'bg-green-100 text-green-800'
													: category.difficulty === 'Intermedio'
													? 'bg-yellow-100 text-yellow-800'
													: category.difficulty === 'Difícil'
													? 'bg-red-100 text-red-800'
													: 'bg-blue-100 text-blue-800'
											}
                    `}
									>
										{category.difficulty}
									</span>
								</div>
							</div>
						</div>

						<p className='text-sm text-gray-600 mt-2'>{category.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default CategorySelector
