import React from 'react'

interface ProgressBarProps {
	/**
	 * Valor actual del progreso (entre 0 y 100)
	 */
	value: number

	/**
	 * Valor máximo que puede alcanzar el progreso (default: 100)
	 */
	max?: number

	/**
	 * Altura de la barra de progreso
	 */
	height?: 'xs' | 'sm' | 'md' | 'lg'

	/**
	 * Mostrar etiqueta de porcentaje
	 */
	showLabel?: boolean

	/**
	 * Formato de la etiqueta de porcentaje
	 */
	labelFormat?: 'percentage' | 'fraction' | 'custom'

	/**
	 * Etiqueta personalizada
	 */
	customLabel?: string

	/**
	 * Variante de color
	 */
	variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'

	/**
	 * Clases adicionales
	 */
	className?: string

	/**
	 * Animación de la barra
	 */
	animated?: boolean

	/**
	 * Mostrar bordes redondeados
	 */
	rounded?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	max = 100,
	height = 'md',
	showLabel = false,
	labelFormat = 'percentage',
	customLabel,
	variant = 'primary',
	className = '',
	animated = true,
	rounded = true,
}) => {
	// Aseguramos que el valor esté entre 0 y max
	const normalizedValue = Math.min(Math.max(0, value), max)

	// Calculamos el porcentaje para el ancho de la barra
	const percentage = (normalizedValue / max) * 100

	// Mapeo de alturas a clases de Tailwind
	const heightClasses = {
		xs: 'h-1',
		sm: 'h-2',
		md: 'h-3',
		lg: 'h-4',
	}

	// Mapeo de variantes a clases de colores
	const variantClasses = {
		primary: 'bg-flame-pea-500',
		secondary: 'bg-gray-500',
		success: 'bg-green-500',
		info: 'bg-blue-500',
		warning: 'bg-amber-500',
		danger: 'bg-red-500',
	}

	// Determinar la etiqueta a mostrar
	const getLabel = () => {
		if (customLabel) return customLabel

		switch (labelFormat) {
			case 'percentage':
				return `${Math.round(percentage)}%`
			case 'fraction':
				return `${normalizedValue}/${max}`
			default:
				return `${Math.round(percentage)}%`
		}
	}

	// Clases para el contenedor
	const containerClasses = `w-full bg-gray-200 ${heightClasses[height]} ${
		rounded ? 'rounded-full' : ''
	} ${className}`

	// Clases para la barra de progreso
	const barClasses = `${variantClasses[variant]} ${heightClasses[height]} ${
		rounded ? 'rounded-full' : ''
	} ${animated ? 'transition-all duration-300' : ''}`

	return (
		<div className='relative'>
			<div className={containerClasses}>
				<div
					className={barClasses}
					style={{ width: `${percentage}%` }}
					role='progressbar'
					aria-valuenow={normalizedValue}
					aria-valuemin={0}
					aria-valuemax={max}
				></div>
			</div>

			{showLabel && (
				<div className='mt-1 text-xs text-center font-medium'>{getLabel()}</div>
			)}
		</div>
	)
}

export default ProgressBar
