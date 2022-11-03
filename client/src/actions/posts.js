import * as api from '../api';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: payload } = await api.fetchPosts(page);
        dispatch({ type: 'FETCH_ALL', payload })
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};


export const getPostsSearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchPostsSearch(searchQuery)
        dispatch({ type: 'FETCH_SEARCH', payload: data })
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}


export const createPost = (newPost) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.makePost(newPost);
        dispatch({ type: 'CREATE', payload: data })
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};


export const updatePost = (id, postData) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.updatePost(id, postData);
        dispatch({ type: 'UPDATE', payload: data })
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id })
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: post } = await api.fetchPost(id);
        dispatch({ type: 'FETCH_POST', payload: { post } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
};
