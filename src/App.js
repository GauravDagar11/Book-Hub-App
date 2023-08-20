import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Bookshelves from './components/Bookshelves/Bookshelves'
import BookDetails from './components/BookDetails/BookDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
