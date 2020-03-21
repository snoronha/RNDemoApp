import { createStore } from 'redux'
// import Counter from './components/Counter'
import counter from './reducers'
const store = createStore(counter)

export default store
