import React, { useState, FormEvent } from 'react'
import { Text, Button } from '../atoms'
import { FormInput } from '../molecules'

interface QuizFormProps {
	/**
	 * Función que se ejecuta al enviar el formulario con los datos del usuario
	 */
	onSubmit: (userData: UserData) => void

	/**
	 * Título personalizado para el formulario
	 */
	title?: string

	/**
	 * Texto personalizado para el botón de envío
	 */
	submitButtonText?: string

	/**
	 * Clases adicionales para el componente
	 */
	className?: string
}

export interface UserData {
	username: string
	email?: string
}

const QuizForm: React.FC<QuizFormProps> = ({
	onSubmit,
	title = '¡Bienvenido al Quiz!',
	submitButtonText = 'Comenzar Quiz',
	className = '',
}) => {
	const [userData, setUserData] = useState<UserData>({
		username: '',
		email: '',
	})

	const [errors, setErrors] = useState<Partial<UserData>>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData(prev => ({
			...prev,
			[name]: value,
		}))

		// Limpiar errores al escribir
		if (errors[name as keyof UserData]) {
			setErrors(prev => ({
				...prev,
				[name]: '',
			}))
		}
	}

	const validateForm = (): boolean => {
		const newErrors: Partial<UserData> = {}

		if (!userData.username.trim()) {
			newErrors.username = 'Por favor ingresa tu nombre'
		} else if (userData.username.length < 2) {
			newErrors.username = 'El nombre debe tener al menos 2 caracteres'
		}

		if (userData.email && !/^\S+@\S+\.\S+$/.test(userData.email)) {
			newErrors.email = 'Por favor ingresa un email válido'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			onSubmit(userData)
		}
	}

	return (
		<div
			className={`bg-white rounded-lg shadow-md p-6 max-w-md mx-auto ${className}`}
		>
			<Text variant='h3' align='center' className='mb-6'>
				{title}
			</Text>

			<div className='mb-6'>
				<Text variant='body1' color='secondary' align='center'>
					Por favor ingresa tu información para comenzar el quiz
				</Text>
			</div>

			<form onSubmit={handleSubmit}>
				<FormInput
					label='Nombre'
					name='username'
					value={userData.username}
					onChange={handleChange}
					placeholder='Ingresa tu nombre'
					required
					error={errors.username}
					fullWidth
					className='mb-4'
				/>

				<FormInput
					label='Email (opcional)'
					name='email'
					type='email'
					value={userData.email || ''}
					onChange={handleChange}
					placeholder='tu@email.com'
					helpText='Solo para enviarte el certificado al finalizar'
					error={errors.email}
					fullWidth
					className='mb-6'
				/>

				<Button type='submit' variant='primary' size='large' fullWidth>
					{submitButtonText}
				</Button>
			</form>
		</div>
	)
}

export default QuizForm
