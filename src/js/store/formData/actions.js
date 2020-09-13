import {SET_FORM_DATA} from './actionTypes';

export const setFormData = (key, inputData) => (
    {
        type: SET_FORM_DATA,
        payload: {
            key: key,
            data: inputData,
        }
    }
);