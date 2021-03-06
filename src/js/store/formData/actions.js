import { SET_FORM_DATA, SET_USER, SET_POSTS, SET_POST } from './actionTypes';

export const setFormData = (key, inputData) => {
	return {
		type: SET_FORM_DATA,
		payload: {
			key: key,
			data: inputData,
		},
	};
};

export const setUser = (inputData) => {
	return {
		type: SET_USER,
		payload: {
			data: inputData,
		},
	};
};

export const setPosts = (inputData) => {
	return {
		type: SET_POSTS,
		payload: {
			data: inputData,
		},
	};
};

export const setPost = (inputData) => {
	return {
		type: SET_POST,
		payload: {
			data: inputData,
		},
	};
};

