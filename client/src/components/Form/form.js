import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography, Paper } from '@mui/material';
import { createPost, updatePost } from '../../actions/posts'
import './form.css';


export default function Form() {
    const [currentId, setCurrentId] = useState(0);
    const [selectedFile, setSelectedFile] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useSelector(({ data }) => {
        if (currentId) {
            const post = data.posts.find(p => p._id === currentId)
            const { selectedFile, title, message } = post;
            setSelectedFile(selectedFile)
            setTitle(title)
            setMessage(message)
            return;
        }
    })

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (selectedFile) setSelectedFile(selectedFile)
        if (title) setTitle(title)
        if (message) setMessage(message)
    }, [selectedFile, title, message])


    const dispatch = useDispatch();

    const clearForm = () => {
        setCurrentId(0)
        setSelectedFile('')
        setTitle('')
        setMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = user?.result?.firstName;
        const form = new FormData();
        form.append('message', message);
        form.append('title', title);
        form.append('name', name)
        form.append('selectedFile', selectedFile);

        if (currentId) {
            console.log('Form check => ', form);
            dispatch(updatePost(currentId, form))
        } else {
            console.log('Form check => ', form);
            dispatch(createPost(form))
        }
        clearForm()
    }

    const fileInputChange = (e) => {
        if (e.target.files.length > 0) {
            console.log('Test on file');
            setSelectedFile(e.target.files[0])
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
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} an image item </Typography>
                <TextField className="input-box" name="message" variant="outlined" label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
                <TextField className="input-box" name="title" variant="outlined" label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="fileInput"><input type="file" name="image" files={[selectedFile]} multiple={false} onChange={fileInputChange} /></div>
                <Button className="buttonSubmit" variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" className="clearButton" color="secondary" size="small" onClick={clearForm} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
