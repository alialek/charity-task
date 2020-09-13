import {SET_FORM_DATA} from './actionTypes';

const initialState = {
    form: {
        type: '', //regular or target
        title: '',
        sum: '',
        target: '',
        description: '',
        wallet: '',
        picture: '',
        author: {
            name: '',
            id: ''
        },
        reasonToFinish: 0,
        until: '02-03-2021'
    }
};

export const formDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_FORM_DATA: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.key]: action.payload.data
                }
            };
        }

        default: {
            return state;
        }

    }

};