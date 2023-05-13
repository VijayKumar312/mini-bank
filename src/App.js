import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Register from './components/Register'
import ProtectedRoute from './ProtectedRoute'

const App = () => (
  <Switch>
    <Route path="/register" component={Register} />
    <Route path="/navbar" component={Navbar} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
