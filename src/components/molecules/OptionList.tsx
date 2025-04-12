import React, { useState } from 'react'
import QuestionOption from './QuestionOption'

// Definición de una opción de respuesta
export interface Option {
	id: string | number
	text: string
	isCorrect: boolean
}

interface OptionListProps {
	/**
	 * Array de opciones para mostrar
	 */
	options: Option[]

	/**
	 * Si se deben mostrar los resultados (correcto/incorrecto)
	 */
	showResults?: boolean

	/**
	 * Función que se llama cuando se selecciona una opción
	 */
	onOptionSelect?: (optionId: string | number) => void

	/**
	 * ID de la opción actualmente seleccionada
	 */
	selectedOptionId?: string | number | null

	/**
	 * Si las opciones están deshabilitadas (por ejemplo, cuando ya se respondió)
	 */
	disabled?: boolean

	/**
	 * Si se debe mostrar letras (A, B, C, D) como índices
	 */
	showLetterIndices?: boolean

	/**
	 * Clases adicionales para el contenedor
	 */
	className?: string

	/**
	 * Permitir selección múltiple (para preguntas con múltiples respuestas correctas)
	 */
	multiSelect?: boolean
}

const OptionList: React.FC<OptionListProps> = ({
	options,
	showResults = false,
	onOptionSelect,
	selectedOptionId = null,
	disabled = false,
	showLetterIndices = true,
	className = '',
	multiSelect = false,
}) => {
	// Estado para manejar selección múltiple
	const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
		[]
	)

	// Manejar clic en una opción
	const handleOptionClick = (optionId: string | number) => {
		if (disabled) return

		if (multiSelect) {
			// Lógica para selección múltiple
			const newSelectedOptions = selectedOptions.includes(optionId)
				? selectedOptions.filter(id => id !== optionId)
				: [...selectedOptions, optionId]

			setSelectedOptions(newSelectedOptions)
			if (onOptionSelect) {
				onOptionSelect(optionId)
			}
		} else {
			// Lógica para selección única
			if (onOptionSelect) {
				onOptionSelect(optionId)
			}
		}
	}

	// Verificar si una opción está seleccionada
	const isOptionSelected = (optionId: string | number): boolean => {
		if (multiSelect) {
			return selectedOptions.includes(optionId)
		}
		return selectedOptionId === optionId
	}

	return (
		<div className={`space-y-3 ${className}`}>
			{options.map((option, index) => (
				<QuestionOption
					key={option.id}
					text={option.text}
					isSelected={isOptionSelected(option.id)}
					isCorrect={option.isCorrect}
					showResult={showResults}
					onClick={() => handleOptionClick(option.id)}
					disabled={disabled}
					optionIndex={
						showLetterIndices ? String.fromCharCode(65 + index) : undefined
					}
				/>
			))}
		</div>
	)
}

export default OptionList
