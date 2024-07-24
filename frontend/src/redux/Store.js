import {createStore} from 'redux'
import { CounterReducer } from './Reducer';

const store = createStore(CounterReducer);