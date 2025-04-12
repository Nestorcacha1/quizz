import React, { InputHTMLAttributes, ChangeEvent } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	helpText?: string
	fullWidth?: boolean
	variant?: 'outline' | 'filled'
	value?: string | number | readonly string[]
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
	label,
	error,
	helpText,
	fullWidth = false,
	variant = 'outline',
	className = '',
	id,
	value,
	onChange,
	...rest
}) => {
	// Generamos un ID único si no se proporciona uno
	const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

	// Clases base del input
	const baseInputClasses =
		'px-4 py-2 text-base transition-colors rounded-md focus:outline-none focus:ring-2'

	// Variantes del input
	const variantClasses = {
		outline:
			'border border-gray-300 focus:border-flame-pea-500 focus:ring-flame-pea-200',
		filled: 'bg-gray-100 border-0 focus:bg-white focus:ring-flame-pea-200',
	}

	// Estado de error
	const errorClasses = error
		? 'border-red-500 focus:border-red-500 focus:ring-red-200'
		: ''

	// Ancho completo
	const widthClass = fullWidth ? 'w-full' : ''

	// Combinamos todas las clases
	const inputClasses = `${baseInputClasses} ${variantClasses[variant]} ${errorClasses} ${widthClass} ${className}`

	return (
		<div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
			{label && (
				<label
					htmlFor={inputId}
					className='block mb-1 font-medium text-gray-700'
				>
					{label}
				</label>
			)}

			<input
				id={inputId}
				className={inputClasses}
				value={value}
				onChange={onChange}
				{...rest}
			/>

			{helpText && !error && (
				<p className='mt-1 text-sm text-gray-500'>{helpText}</p>
			)}

			{error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
		</div>
	)
}

export default Input
