import React, { useState } from 'react'

interface ImageProps {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
	rounded?: boolean
	fallbackSrc?: string
	onClick?: () => void
	aspectRatio?: string
	lazy?: boolean
}

const Image: React.FC<ImageProps> = ({
	src,
	alt,
	width,
	height,
	className = '',
	objectFit = 'cover',
	rounded = false,
	fallbackSrc = '../assets/img/img.jpg',
	onClick,
	aspectRatio = 'aspect-auto',
	lazy = true,
}) => {
	const [error, setError] = useState(false)

	// Manejador para errores de carga de imagen
	const handleError = () => {
		if (!error && fallbackSrc) {
			setError(true)
		}
	}

	// Clases de estilo para la imagen
	const imageClasses = [
		objectFit ? `object-${objectFit}` : '',
		rounded ? 'rounded-lg' : '',
		aspectRatio,
		onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '',
		className,
	]
		.filter(Boolean)
		.join(' ')

	// Atributos de dimensiones
	const dimensionProps: { width?: number; height?: number } = {}
	if (width) dimensionProps.width = width
	if (height) dimensionProps.height = height

	return (
		<div className={`overflow-hidden ${aspectRatio}`}>
			<img
				src={error ? fallbackSrc : src}
				alt={alt}
				className={imageClasses}
				onError={handleError}
				onClick={onClick}
				loading={lazy ? 'lazy' : 'eager'}
				{...dimensionProps}
			/>
		</div>
	)
}

export default Image
