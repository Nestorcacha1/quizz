import React, { ReactElement } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import Home from '../page/Home'
import Quizz from '../page/Quizz'

import Ranking from '../page/Ranking'
import ResultsPage from '../page/Result'

// Routes principal con tipado adecuado
const MyRoutes: React.FC = (): ReactElement => {
	return (
		<Router>
			<Routes>
				{/* Ruta de inicio */}
				<Route path='/' element={<Home />} />

				{/* Rutas para cada lenguaje de programación */}
				<Route path='/quiz/:categoryId' element={<Quizz />} />

				{/* Ruta directa para quiz necesita redirigir a home */}
				<Route path='/quiz' element={<Navigate to='/' replace />} />

				{/* Rutas para resultados y ranking */}
				<Route path='/results' element={<ResultsPage />} />
				<Route path='/ranking' element={<Ranking />} />

				{/* Ruta para manejar URLs no encontradas */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Router>
	)
}

export default MyRoutes
