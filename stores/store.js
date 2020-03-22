import {createStore} from 'redux';
import reduxTree from '../reducers/index';

const store = createStore(reduxTree);

export default store;
