import { store } from '../../index';

import axios from 'axios';

export const sendCollection = (req, type) => {
	console.log('sending');
	let data = {
		type,
		title: req.title,
		sum: req.sum,
		target: req.target,
		description: req.description,
		wallet: req.wallet,
		picture: req.picture,
		author: req.author,
		reasonToFinish: req.reasonToFinish || '',
		until: req.until || '',
	};

	let headers = {
		'x-auth-token': localStorage.getItem('token'),
		'Content-Type': 'application/json',
	};
	return axios.post('https://app.netquest.ru/charity/api/collection', data, { headers })
};

export const getCollections = (req) => {
	let headers = {
		'x-auth-token': localStorage.getItem('token'),
		'Content-Type': 'application/json',
	};
	return axios.get('https://app.netquest.ru/charity/api/collection', { headers });
};

export const getCollection = (id) => {
	let headers = {
		'x-auth-token': localStorage.getItem('token'),
		'Content-Type': 'application/json',
	};
	return axios.get(`https://app.netquest.ru/charity/api/collection/${id}`, { headers });
};
