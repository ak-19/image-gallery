import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { getPosts } from '../../actions/posts';

import './paginator.css';
import { useEffect } from 'react';

const Paginator = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (<Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />)}
    />);
}

export default Paginator;