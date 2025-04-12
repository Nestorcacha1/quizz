import React from 'react'
import { Text, Icon } from '../atoms'

interface UserCardProps {
	/**
	 * Nombre del jugador
	 */
	username: string

	/**
	 * Puntuación actual del jugador
	 */
	score: number

	/**
	 * Puntuación máxima posible (opcional)
	 */
	maxScore?: number

	/**
	 * URL de la imagen de avatar (opcional)
	 */
	avatarUrl?: string

	/**
	 * Posición en el ranking (opcional)
	 */
	rank?: number

	/**
	 * Clases adicionales para personalizar
	 */
	className?: string

	/**
	 * Tamaño del componente
	 */
	size?: 'small' | 'medium' | 'large'

	/**
	 * Variante visual
	 */
	variant?: 'default' | 'outlined' | 'filled'
}

const UserCard: React.FC<UserCardProps> = ({
	username,
	score,
	maxScore,
	avatarUrl,
	rank,
	className = '',
	size = 'medium',
	variant = 'default',
}) => {
	// Determinar clases según el tamaño
	const sizeClasses = {
		small: 'py-2 px-3 text-sm',
		medium: 'py-3 px-4',
		large: 'py-4 px-6 text-lg',
	}

	// Determinar clases según la variante
	const variantClasses = {
		default: 'bg-white border border-gray-200',
		outlined: 'bg-transparent border border-flame-pea-300',
		filled: 'bg-flame-pea-50',
	}

	// Obtener las iniciales para el avatar fallback
	const getInitials = () => {
		return username
			.split(' ')
			.map(name => name[0])
			.join('')
			.toUpperCase()
			.substring(0, 2)
	}

	// Determinar el color adecuado para el puntaje
	const getScoreColor = () => {
		if (!maxScore) return 'text-flame-pea-600'

		const scorePercentage = (score / maxScore) * 100
		if (scorePercentage >= 80) return 'text-green-600'
		if (scorePercentage >= 50) return 'text-amber-600'
		return 'text-red-600'
	}

	return (
		<div
			className={`
      flex items-center rounded-lg shadow-sm
      ${sizeClasses[size]} ${variantClasses[variant]} ${className}
    `}
		>
			{/* Avatar o Iniciales */}
			<div className='relative'>
				{avatarUrl ? (
					<img
						src={avatarUrl}
						alt={`Avatar de ${username}`}
						className='w-10 h-10 rounded-full object-cover'
					/>
				) : (
					<div className='w-10 h-10 rounded-full bg-flame-pea-100 text-flame-pea-800 flex items-center justify-center font-medium'>
						{getInitials()}
					</div>
				)}

				{rank && (
					<div className='absolute -top-1 -right-1 w-5 h-5 bg-flame-pea-500 text-white rounded-full text-xs flex items-center justify-center'>
						{rank}
					</div>
				)}
			</div>

			{/* Información del usuario */}
			<div className='ml-3 flex-1'>
				<Text variant='subtitle2' bold className='line-clamp-1'>
					{username}
				</Text>

				<div className='flex items-center mt-0.5'>
					<Icon type='info' size='small' className='text-flame-pea-400' />
					<span className={`ml-1 font-medium ${getScoreColor()}`}>
						{score} {maxScore ? `/ ${maxScore}` : ''} puntos
					</span>
				</div>
			</div>
		</div>
	)
}

export default UserCard
