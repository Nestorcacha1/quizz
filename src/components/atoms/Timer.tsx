import React, { useState, useEffect, useCallback } from 'react'

interface TimerProps {
	initialTime: number // Tiempo inicial en segundos
	onTimeUp?: () => void // Función que se ejecutará cuando el tiempo termine
	isPaused?: boolean // Controlar si el temporizador está en pausa
	showMinutes?: boolean // Mostrar en formato MM:SS o solo SS
	className?: string // Clases personalizadas
	size?: 'small' | 'medium' | 'large' // Tamaño del timer
	variant?: 'default' | 'warning' | 'danger' // Variante visual
}

const Timer: React.FC<TimerProps> = ({
	initialTime,
	onTimeUp,
	isPaused = false,
	showMinutes = true,
	className = '',
	size = 'medium',
	variant = 'default',
}) => {
	const [timeLeft, setTimeLeft] = useState<number>(initialTime)
	const [isRunning, setIsRunning] = useState<boolean>(!isPaused)

	// Efecto para manejar la pausa
	useEffect(() => {
		setIsRunning(!isPaused)
	}, [isPaused])

	// Formatear tiempo en MM:SS o SS
	const formatTime = useCallback(() => {
		if (showMinutes) {
			const minutes = Math.floor(timeLeft / 60)
			const seconds = timeLeft % 60
			return `${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}`
		}
		return timeLeft.toString()
	}, [timeLeft, showMinutes])

	// Efecto principal del temporizador
	useEffect(() => {
		let timerId: NodeJS.Timeout | undefined

		if (isRunning && timeLeft > 0) {
			timerId = setInterval(() => {
				setTimeLeft(prev => prev - 1)
			}, 1000)
		} else if (timeLeft === 0 && onTimeUp) {
			onTimeUp()
		}

		return () => {
			if (timerId) clearInterval(timerId)
		}
	}, [timeLeft, isRunning, onTimeUp])

	// Determinar clases de tamaño
	const sizeClasses = {
		small: 'text-sm px-2 py-1',
		medium: 'text-base px-3 py-1.5',
		large: 'text-lg px-4 py-2',
	}

	// Determinar clases de variante
	const getVariantClasses = () => {
		// Por defecto
		if (variant === 'default') {
			return 'bg-gray-100 text-gray-800'
		}

		// Según el tiempo restante o la variante forzada
		if (variant === 'danger' || timeLeft <= 10) {
			return 'bg-red-100 text-red-800 animate-pulse'
		}

		if (variant === 'warning' || timeLeft <= 30) {
			return 'bg-amber-100 text-amber-800'
		}

		return 'bg-gray-100 text-gray-800'
	}

	// Combinar todas las clases
	const timerClasses = `inline-flex items-center justify-center rounded-md font-medium ${
		sizeClasses[size]
	} ${getVariantClasses()} ${className}`

	return (
		<div className={timerClasses} role='timer' aria-live='polite'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='w-4 h-4 mr-1'
				viewBox='0 0 20 20'
				fill='currentColor'
			>
				<path
					fillRule='evenodd'
					d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
					clipRule='evenodd'
				/>
			</svg>
			<span>{formatTime()}</span>
		</div>
	)
}

export default Timer
