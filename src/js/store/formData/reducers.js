import {SET_FORM_DATA, SET_USER, SET_POSTS} from './actionTypes';

const initialState = {
    allPosts: [
      
    ],
    user: {
        name: 'Павел Дуров',
        id: 1
    },
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
        until: '2020-09-15'
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
        case SET_USER: {
            return {
                ...state,
                user: action.payload.data
            };
        }

        case SET_POSTS: {
            return {
                ...state,
                allPosts: action.payload.data
            };
        }

        default: {
            return state;
        }

    }

};
