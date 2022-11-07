import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardMedia, CardContent, Typography, Link } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts'
import { API } from '../../../api';

export default function Post({ post }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();
    const renderDelete = () => {
        if (user?.result?._id === post.creator)
            return (<Button size="small" onClick={() => { dispatch(deletePost(post._id)) }} color="primary">
                <Delete fontSize='small' />
                Delete
            </Button>)
        return ''
    }
    const renderEdit = () => {
        if (user?.result?._id === post.creator)
            return (<Button size="small" onClick={editPost}>
                <Edit fontSize='small' />
                Edit
            </Button>)
        return ''
    }

    const editPost = () => {
        history(`/addimage`)
    }

    const openPost = () => {
        history(`/posts/${post._id}`)
    }

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link
                component="button"
                variant="string"
                onClick={openPost}
                underline="none"
                sx={{ textAlign: 'left' }}
            >
                <CardMedia sx={{ paddingTop: '56.25%', backgroundColor: '#000000 .5' }} image={API.defaults.baseURL + '/' + post.thumb} title={post.title} />
            </Link>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption">{moment(post.createdAt).fromNow()}</Typography>
                <Typography variant="caption"> by {post.name}</Typography>
                <Typography color="textSecondary" variant="h4">{post.title} </Typography>
                <Typography variant="body" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                {renderEdit()}
                {renderDelete()}
            </CardActions>
        </Card>
    )
}
