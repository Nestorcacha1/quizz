import React, { ChangeEvent } from 'react'
import { Input } from '../atoms'

interface FormInputProps {
	/**
	 * El ID único para el input y label
	 */
	id?: string

	/**
	 * El texto de la etiqueta que aparecerá sobre el input
	 */
	label: string

	/**
	 * Si el campo es requerido
	 */
	required?: boolean

	/**
	 * El valor actual del input
	 */
	value: string

	/**
	 * Función que se llama cuando cambia el valor del input
	 */
	onChange: (e: ChangeEvent<HTMLInputElement>) => void

	/**
	 * Tipo de input (text, email, password, etc.)
	 */
	type?: string

	/**
	 * Texto de ayuda opcional que aparece debajo del input
	 */
	helpText?: string

	/**
	 * Mensaje de error para mostrar cuando la validación falla
	 */
	error?: string

	/**
	 * Texto del placeholder
	 */
	placeholder?: string

	/**
	 * Si el input debe ocupar el ancho completo del contenedor
	 */
	fullWidth?: boolean

	/**
	 * Clases adicionales para personalizar el contenedor
	 */
	className?: string

	/**
	 * Variante visual del input
	 */
	variant?: 'outline' | 'filled'

	/**
	 * Si el input está deshabilitado
	 */
	disabled?: boolean

	/**
	 * Nombre del campo para formularios
	 */
	name?: string
}

const FormInput: React.FC<FormInputProps> = ({
	id,
	label,
	required = false,
	value,
	onChange,
	type = 'text',
	helpText,
	error,
	placeholder,
	fullWidth = false,
	className = '',
	variant = 'outline',
	disabled = false,
	name,
}) => {
	// Generamos un ID único si no se proporciona
	const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

	return (
		<div className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
			<div className='flex justify-between mb-1'>
				<label
					htmlFor={inputId}
					className='block text-sm font-medium text-gray-700'
				>
					{label}
					{required && <span className='ml-1 text-red-500'>*</span>}
				</label>
			</div>

			<Input
				id={inputId}
				type={type}
				value={value}
				onChange={onChange}
				error={error}
				helpText={helpText}
				placeholder={placeholder}
				fullWidth={fullWidth}
				variant={variant}
				disabled={disabled}
				name={name}
				className='mt-1'
			/>

			{helpText && !error && (
				<p className='mt-1 text-sm text-gray-500'>{helpText}</p>
			)}

			{error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
		</div>
	)
}

export default FormInput
