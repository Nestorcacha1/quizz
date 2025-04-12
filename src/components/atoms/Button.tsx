import React, { ReactNode } from 'react'

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	fullWidth?: boolean
	label?: string
	children?: ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'medium',
	disabled = false,
	fullWidth = false,
	label,
	children,
	onClick,
	type = 'button',
}) => {
	// Base classes siempre aplicadas
	const baseClasses =
		'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-flame-pea-300'

	// Clases de variante
	const variantClasses = {
		primary:
			'bg-flame-pea-500 text-white hover:bg-flame-pea-600 active:bg-flame-pea-700 disabled:bg-flame-pea-200',
		secondary:
			'bg-flame-pea-100 text-flame-pea-700 hover:bg-flame-pea-200 active:bg-flame-pea-300 disabled:text-flame-pea-300',
		outline:
			'bg-transparent border border-flame-pea-500 text-flame-pea-500 hover:bg-flame-pea-50 active:bg-flame-pea-100 disabled:border-flame-pea-200 disabled:text-flame-pea-200',
	}

	// Clases de tamaño
	const sizeClasses = {
		small: 'text-sm px-3 py-1.5',
		medium: 'text-base px-4 py-2',
		large: 'text-lg px-6 py-3',
	}

	// Ancho completo
	const widthClass = fullWidth ? 'w-full' : ''

	// Combinar todas las clases
	const classes = `${baseClasses} ${variantClasses[variant]} ${
		sizeClasses[size]
	} ${widthClass} ${disabled ? 'cursor-not-allowed' : ''}`

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
		>
			{children || label}
		</button>
	)
}

export default Button
