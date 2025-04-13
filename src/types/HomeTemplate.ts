export interface UserData {
	username: string
	email?: string
}
export interface QuizCategory {
	id: string
	name: string
	description: string
	questionCount: number
	difficulty: 'Fácil' | 'Intermedio' | 'Difícil' | 'Mixto'
	imageUrl?: string
}

export interface HomeTemplateProps {
	quizTitle?: string

	quizDescription?: string

	coverImage?: string

	onStartQuiz: (userData: UserData, categoryId: string) => void

	categories?: QuizCategory[]

	questionCount?: number

	estimatedTime?: number

	showInstructions?: boolean
}
