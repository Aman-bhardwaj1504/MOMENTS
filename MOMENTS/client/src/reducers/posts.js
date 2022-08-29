import { FETCH_ALL,FETCH_POST, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH , START_LOADING, END_LOADING, COMMENT} from '../constants/actionTypes';

const actions= (state={isLoading: true,posts: []},action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state,isLoading: true};
        
        case END_LOADING: 
            return { ...state,isLoading: false};

        case FETCH_POST:
            return {
                ...state, post: action.payload};

        case FETCH_BY_SEARCH:
            return {
                ...state, posts: action.payload};
        case DELETE:
            return {...state,posts: state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
        case LIKE:
            return{...state,posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};

        case COMMENT: 
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id){
                        return action.payload;
                    }
                    return post;
                }),
            };
            
        case FETCH_ALL:

            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE:
            return{...state,posts: [...state, action.payload]};
        default:
            return state;        
    }
}

export default actions;