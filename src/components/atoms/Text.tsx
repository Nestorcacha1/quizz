import React, { JSX, ReactNode } from 'react'

type TextVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'

type TextAlign = 'left' | 'center' | 'right' | 'justify'

type TextColor =
	| 'primary'
	| 'secondary'
	| 'error'
	| 'success'
	| 'warning'
	| 'muted'

interface TextProps {
	children: ReactNode
	variant?: TextVariant
	align?: TextAlign
	color?: TextColor
	bold?: boolean
	italic?: boolean
	className?: string
	gutterBottom?: boolean
}

const Text: React.FC<TextProps> = ({
	children,
	variant = 'body1',
	align = 'left',
	color = 'primary',
	bold = false,
	italic = false,
	className = '',
	gutterBottom = false,
}) => {
	// Mapeo de variantes a elementos HTML
	const variantMap: Record<TextVariant, keyof JSX.IntrinsicElements> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6',
		subtitle1: 'h6',
		subtitle2: 'h6',
		body1: 'p',
		body2: 'p',
		caption: 'span',
	}

	// Mapeo de variantes a clases de Tailwind
	const variantClasses: Record<TextVariant, string> = {
		h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
		h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
		h3: 'text-2xl md:text-3xl lg:text-4xl font-bold',
		h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
		h5: 'text-lg md:text-xl lg:text-2xl font-semibold',
		h6: 'text-base md:text-lg lg:text-xl font-semibold',
		subtitle1: 'text-lg md:text-xl font-medium',
		subtitle2: 'text-base md:text-lg font-medium',
		body1: 'text-base md:text-lg',
		body2: 'text-sm md:text-base',
		caption: 'text-xs md:text-sm text-gray-600',
	}

	// Mapeo de colores a clases de Tailwind
	const colorClasses: Record<TextColor, string> = {
		primary: 'text-gray-900',
		secondary: 'text-gray-700',
		error: 'text-red-600',
		success: 'text-green-600',
		warning: 'text-amber-600',
		muted: 'text-gray-500',
	}

	// Mapeo de alineaciones a clases de Tailwind
	const alignClasses: Record<TextAlign, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
		justify: 'text-justify',
	}

	// Obtener el elemento HTML correspondiente a la variante
	const Component = variantMap[variant]

	// Construir la clase completa
	const classes = [
		variantClasses[variant],
		colorClasses[color],
		alignClasses[align],
		bold ? 'font-bold' : '',
		italic ? 'italic' : '',
		gutterBottom ? 'mb-4' : '',
		className,
	]
		.filter(Boolean)
		.join(' ')

	return <Component className={classes}>{children}</Component>
}

export default Text
