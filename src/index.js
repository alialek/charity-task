import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './js/store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import { setStory } from './js/store/router/actions';
import axios from 'axios';
import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';

import App from './App';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const parseQueryString = (string) => {
	return string
		.slice(1)
		.split('&')
		.map((queryParam) => {
			let kvp = queryParam.split('=');
			return { key: kvp[0], value: kvp[1] };
		})
		.reduce((query, kvp) => {
			query[kvp.key] = kvp.value;
			return query;
		}, {});
};
const queryParams = parseQueryString(window.location.search);
axios
	.post('https://app.netquest.ru/charity/api/vk/auth', queryParams)
	.then((resp) => {
		localStorage.setItem('token', resp.data.token);
	})
	.catch((error) => {
		console.error(error);
	});
window.location.hash.includes('campaign')
	? store.dispatch(setStory('viewer', 'base'))
	: store.dispatch(setStory('home', 'base'));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
