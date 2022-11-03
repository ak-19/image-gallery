import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { createPost, updatePost } from '../../actions/posts'
import './form.css';

export default function Form() {
    const [currentId, setCurrentId] = useState(0);
    const [postData, setPostData] = useState({
        message: '', title: '', selectedFile: ''
    })

    const post = useSelector(({ data }) => {
        return currentId ? data.posts.find(p => p._id === currentId) : null
    })

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])


    const dispatch = useDispatch();

    const clearForm = () => {
        setCurrentId(null)
        setPostData({
            message: '', title: '', selectedFile: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.firstName }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.firstName }))
        }
        clearForm()
    }

    if (!user?.result?.firstName) {
        return (
            <Paper className="paper">
                <Typography variant='h6' aligned="center">
                    Please, sign in to make your own stories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className="paper">
            <form autoComplete="off" noValidate className="root form" onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} an image item </Typography>
                <TextField className="input-box" name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField className="input-box" name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <div className="fileInput"><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className="buttonSubmit" variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" className="clearButton" color="secondary" size="small" onClick={clearForm} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
