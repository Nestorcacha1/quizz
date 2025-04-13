export interface UserAnswer {
	questionId: string | number
	selectedOptionId: string | number | null
	isCorrect: boolean
}

export interface QuizResult {
	score: number
	totalScore: number
	answers: {
		id: string | number
		question: string
		userAnswer: string | null
		correctAnswer: string
		isCorrect: boolean
		explanation?: string
		category?: string
		timeSpent?: number
	}[]
	totalTime: number
}

export interface Option {
	id: string | number
	text: string
	isCorrect: boolean
}
interface Question {
	id: string | number
	questionText: string
	options: Option[]
	imageUrl?: string
	timeLimit?: number
	explanation?: string
	category?: string
	timeSpent?: number
}

export interface QuizPageTemplateProps {
	quizTitle: string
	userData: {
		username: string
		email?: string
	}
	questions: Question[]
	onQuizComplete?: (results: QuizResult) => void
	showQuizTimer?: boolean
	quizTimeLimit?: number
	allowBackNavigation?: boolean
}
