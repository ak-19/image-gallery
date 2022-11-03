import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost } from '../../actions/posts';

import './PostDetails.css'

const PostDetils = () => {
    const { post, isLoading } = useSelector(({ data }) => data);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className="loadingPaper">
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className="card">
                <div className="section">
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className="imageSection">
                    <img className="details-image-style" src={post.selectedFile} alt={post.title} />
                </div>
            </div>
        </Paper>
    );
};

export default PostDetils;