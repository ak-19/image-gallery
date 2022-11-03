import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/post';

export default function Posts() {
    const { posts, isLoading } = useSelector((state) => state.data)
    if (!isLoading) {
        return (
            <Grid container spacing={4}>
                {posts.map(post => <Grid item key={post._id} xs={12} sm={6} md={4}> <Post post={post} /> </Grid>)}
            </Grid>
        )
    }
    return <CircularProgress />;
}
