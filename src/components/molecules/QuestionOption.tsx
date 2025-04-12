import React from 'react'
import { Button, Icon } from '../atoms'

interface QuestionOptionProps {
	/**
	 * Texto de la opción de respuesta
	 */
	text: string

	/**
	 * Si la opción está seleccionada por el usuario
	 */
	isSelected?: boolean

	/**
	 * Si la opción es correcta
	 */
	isCorrect?: boolean

	/**
	 * Si se debe mostrar si la respuesta es correcta o incorrecta
	 */
	showResult?: boolean

	/**
	 * Función para manejar cuando se haga clic en la opción
	 */
	onClick?: () => void

	/**
	 * Si la opción está deshabilitada (por ejemplo, cuando ya se respondió)
	 */
	disabled?: boolean

	/**
	 * Clases adicionales para personalizar el componente
	 */
	className?: string

	/**
	 * Índice o letra de la opción (A, B, C, D, etc.)
	 */
	optionIndex?: string
}

const QuestionOption: React.FC<QuestionOptionProps> = ({
	text,
	isSelected = false,
	isCorrect = false,
	showResult = false,
	onClick,
	disabled = false,
	className = '',
	optionIndex,
}) => {
	// Determinar la variante del botón según el estado
	const getButtonVariant = () => {
		if (!showResult) {
			return isSelected ? 'primary' : 'outline'
		}

		if (isCorrect) {
			return 'primary' // Podría ser un verde personalizado en un sistema real
		}

		if (isSelected && !isCorrect) {
			return 'secondary' // Podría ser un rojo personalizado en un sistema real
		}

		return 'outline'
	}

	// Renderizar el ícono según el estado
	const renderIcon = () => {
		if (!showResult) return null

		if (isCorrect) {
			return <Icon type='correct' size='small' className='ml-2' />
		}

		if (isSelected && !isCorrect) {
			return <Icon type='wrong' size='small' className='ml-2' />
		}

		return null
	}

	return (
		<div className={`mb-3 ${className}`}>
			<button
				onClick={onClick}
				disabled={disabled}
				className={`
          w-full text-left flex items-center justify-between
          px-4 py-3 rounded-md transition-all
          ${isSelected ? 'font-medium' : 'font-normal'}
          ${
						disabled
							? 'cursor-not-allowed opacity-80'
							: 'cursor-pointer hover:bg-flame-pea-50'
					}
          ${
						isSelected && showResult && !isCorrect
							? 'bg-red-50 border-red-300 text-red-800'
							: ''
					}
          ${
						isCorrect && showResult
							? 'bg-green-50 border-green-300 text-green-800'
							: ''
					}
          ${
						isSelected && !showResult
							? 'bg-flame-pea-100 border-flame-pea-200 text-flame-pea-800'
							: ''
					}
          ${!isSelected ? 'bg-white border border-gray-300' : 'border'}
        `}
			>
				<div className='flex items-center'>
					{optionIndex && (
						<span
							className={`
              w-6 h-6 flex items-center justify-center rounded-full mr-3
              ${
								isSelected
									? 'bg-flame-pea-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}
              text-sm font-medium
            `}
						>
							{optionIndex}
						</span>
					)}
					<span>{text}</span>
				</div>

				{renderIcon()}
			</button>
		</div>
	)
}

export default QuestionOption
