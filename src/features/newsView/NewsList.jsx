import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from './newsSlice'

export default function NewsList() {
    const dispatch = useDispatch();
    const news = useSelector(({news}) => news);
    
    useEffect(() => {
        dispatch(getNews());
    },[]);

    return (
        <div>
            {news.isLoading? 
                <h1>Loading...</h1>:
                <h1>Completed!</h1>
            }
            {!news.isLoading && news.articles.map(article => (
                <p>{article.title}</p>
            ))}
        </div>
    )
}
