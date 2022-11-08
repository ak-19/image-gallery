import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography, Paper } from '@mui/material';
import { createPost, setPost, updatePost } from '../../actions/posts'
import './form.css';

export default function Form() {
    const [imageData, setImageData] = useState({ message: '', title: '', selectedFile: '' })
    const post = useSelector(({ data }) => data.post)
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) setImageData(post)
    }, [post])

    const dispatch = useDispatch();

    const clearFormData = () => {
        console.log('...cleaning');
        setImageData({
            message: '', title: '', selectedFile: ''
        })
        dispatch(setPost(undefined))
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = user?.result?.firstName;
        if (post) {
            console.log('Form data check on update => ', imageData);
            dispatch(updatePost(post._id, imageData))
        } else {
            const form = new FormData();
            form.append('message', imageData.message);
            form.append('title', imageData.title);
            form.append('name', name)
            form.append('selectedFile', imageData.selectedFile);
            console.log('Form check  on create => ', form);
            dispatch(createPost(form))
        }
        clearFormData()
    }

    const fileInputChange = (e) => {
        if (e.target.files.length > 0) {
            console.log('Test on file');
            setImageData({
                ...imageData, selectedFile: e.target.files[0]
            })
        }
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
                <Typography variant='h6'>{post ? 'Editing' : 'Creating'} an image item </Typography>
                <TextField className="input-box" name="message" variant="outlined" label="Message" fullWidth value={imageData.message} onChange={(e) => setImageData({ ...imageData, message: e.target.value })} />
                <TextField className="input-box" name="title" variant="outlined" label="Title" fullWidth value={imageData.title} onChange={(e) => setImageData({ ...imageData, title: e.target.value })} />
                <div className="fileInput"><input type="file" name="image" files={[imageData.selectedFile]} multiple={false} onChange={fileInputChange} /></div>
                <Button className="buttonSubmit" variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" className="clearButton" color="secondary" size="small" onClick={clearFormData} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
