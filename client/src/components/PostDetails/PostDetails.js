import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Paper, Typography, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import ModalImage from "react-modal-image";
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost } from '../../actions/posts';
import { API } from '../../api/index';

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
        <Paper style={{ margin: '10px', padding: '20px', borderRadius: '15px' }} elevation={6}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={post.title}
                    subheader={moment(post.createdAt).fromNow() + ' by ' + post.name}
                />
                <CardContent sx={{ margin: '20px' }}>
                    <ModalImage small={API.defaults.baseURL + '/' + post.thumb} large={API.defaults.baseURL + '/' + post.selectedFile} alt={post.title} width="500" />
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="secondary">
                        {post.message}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
};

export default PostDetils;