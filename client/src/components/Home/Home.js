import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Paper, AppBar, TextField, Button, CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';

import Posts from '../Posts/posts';
import { getPosts, getPostsSearch } from '../../actions/posts';
import Paginator from '../Paginator/paginator';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const theme = createTheme();

function Home() {
    const dispatch = useDispatch();

    const query = useQuery();
    const history = useNavigate();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')

    const [search, setSearch] = useState('');

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            searchPost();
        }
    }

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsSearch({ search }))
            history(`/posts/search?searchQuery=${search.trim()}`);
        } else {
            history('/');
        }
    }

    useEffect(() => {
        dispatch(getPosts(page))
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            My travel images
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Images recorded during my travels.
                        </Typography>
                    </Container>
                    <AppBar position="static" color="inherit">
                        <TextField
                            name="search"
                            variant="outlined"
                            label="Search images"
                            fullWidth
                            value={search}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => { setSearch(e.target.value) }}>
                        </TextField>
                        <Button onClick={searchPost} color="primary" varian="contained">Search images</Button>
                    </AppBar>
                </Box>

                <Container sx={{ py: 8 }} maxWidth="md">
                    <Posts />
                </Container>
                <Grid item xs={12} sm={6} md={3}>
                    {(!searchQuery) && (
                        <Paper elevation={6} className="pagination">
                            <Paginator page={page} />
                        </Paper>
                    )}
                </Grid>
            </main>


        </ThemeProvider>
    );
}

export default Home;