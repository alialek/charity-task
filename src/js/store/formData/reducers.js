import {SET_FORM_DATA} from './actionTypes';

const initialState = {
    allPosts: [
        {
            type: '', //regular or target
            title: '',
            sum: '',
            target: '',
            description: '',
            wallet: '',
            picture: '',
            author: {
                name: 'Сергей',
                id: '',
                photo_100: ''
            },
            reasonToFinish: 0,
            until: '2020-09-15'
        },
    ],
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

        default: {
            return state;
        }

    }

};
