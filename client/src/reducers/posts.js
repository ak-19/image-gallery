const reducer = (data = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...data, isLoading: true };
        case 'END_LOADING':
            return { ...data, isLoading: false };
        case 'CREATE':
            return { ...data, posts: [...data.posts, action.payload] };
        case 'FETCH_ALL':
            return { ...data, ...action.payload };
        case 'FETCH_SEARCH':
            return { ...data, ...action.payload }
        case 'FETCH_POST':
            return { ...data, post: action.payload.post };
        case 'UPDATE':
            return { ...data, posts: data.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'DELETE':
            return { ...data, posts: data.posts.filter(post => action.payload !== post._id) };
        default:
            return { ...data }
    }
}

export default reducer;