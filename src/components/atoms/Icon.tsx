import React, { JSX } from 'react'

// Tipos de íconos disponibles
type IconType =
	| 'correct'
	| 'wrong'
	| 'info'
	| 'warning'
	| 'help'
	| 'refresh'
	| 'home'
	| 'rank'
	| 'share'

// Tamaños disponibles
type IconSize = 'small' | 'medium' | 'large'

interface IconProps {
	type: IconType
	size?: IconSize
	color?: string
	className?: string
	ariaLabel?: string
}

const Icon: React.FC<IconProps> = ({
	type,
	size = 'medium',
	color,
	className = '',
	ariaLabel,
}) => {
	// Mapeo de tamaños a clases de Tailwind
	const sizeClasses: Record<IconSize, string> = {
		small: 'w-4 h-4 md:w-5 md:h-5',
		medium: 'w-6 h-6 md:w-7 md:h-7',
		large: 'w-8 h-8 md:w-10 md:h-10',
	}

	// Mapeo de tipos a colores por defecto
	const defaultColors: Record<IconType, string> = {
		correct: 'text-green-500',
		wrong: 'text-red-500',
		info: 'text-blue-500',
		warning: 'text-amber-500',
		help: 'text-purple-500',
		refresh: 'text-flame-pea-500',
		home: 'text-flame-pea-500',
		rank: 'text-flame-pea-500',
		share: 'text-flame-pea-500',
	}

	// Usar color personalizado o el color predeterminado para el tipo
	const colorClass = color || defaultColors[type]

	// Construir la clase completa
	const classes = `${sizeClasses[size]} ${colorClass} ${className}`

	// SVGs para cada tipo de ícono
	const iconSvg: Record<IconType, JSX.Element> = {
		correct: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Correcto'}
			>
				<path
					fillRule='evenodd'
					d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
					clipRule='evenodd'
				/>
			</svg>
		),
		wrong: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Incorrecto'}
			>
				<path
					fillRule='evenodd'
					d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
					clipRule='evenodd'
				/>
			</svg>
		),
		info: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Información'}
			>
				<path
					fillRule='evenodd'
					d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
					clipRule='evenodd'
				/>
			</svg>
		),
		warning: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Advertencia'}
			>
				<path
					fillRule='evenodd'
					d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
					clipRule='evenodd'
				/>
			</svg>
		),
		help: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Ayuda'}
			>
				<path
					fillRule='evenodd'
					d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z'
					clipRule='evenodd'
				/>
			</svg>
		),
		// Nuevos íconos
		refresh: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={`${classes} text-white`}
				aria-label={ariaLabel || 'Reiniciar'}
			>
				<path
					fillRule='evenodd'
					d='M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z'
					clipRule='evenodd'
				/>
			</svg>
		),
		home: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Inicio'}
			>
				<path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
				<path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
			</svg>
		),
		rank: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Ranking'}
			>
				<path
					fillRule='evenodd'
					d='M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z'
					clipRule='evenodd'
				/>
				<path d='M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z' />
			</svg>
		),
		share: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='currentColor'
				className={classes}
				aria-label={ariaLabel || 'Compartir'}
			>
				<path
					fillRule='evenodd'
					d='M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z'
					clipRule='evenodd'
				/>
			</svg>
		),
	}

	return iconSvg[type]
}

export default Icon
