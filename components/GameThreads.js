import React from 'react';
import { connect } from 'react-redux'; 

import { getGameThread } from '../actions/redditActions';

@connect((store) => {
    return {
        comments: store.reddit.comments,
        isLoading: store.reddit.isLoading,
        error: store.reddit.error
    }
})
export default class GameThreads extends React.Component{
    componentWillMount(){
        this.props.dispatch(getGameThread('warriors'))
    }
    render(){
        return (
            <div>
                {this.props.isLoading && <h1 className='header'>Loading Schedule</h1>}
                {this.props.error && <h1 className='header'>Oops! Something went wrong...</h1>}
                <ul>
                    {this.props.comments.map((comment) => {
                        return <li key={comment.id}>
                            <RedditComment 
                                flair={comment.author_flair_text}
                                username={comment.author.name}
                                points={comment.score}
                                timestamp={comment.created_utc}
                                text={comment.body}
                            />
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

const RedditComment = (props) => {
    return (
        <div className='reddit-comment'>
            <ul>
                <li><h1 className='header-small'>{props.points}</h1></li>
                <li><h1 className='header-small'>{props.username}</h1></li>
                <li><h1 className='header-small'>{props.flair}</h1></li>
            </ul>
            <ul>
                <li><h1 className='header-small'>{props.text}</h1></li>
            </ul>
        </div>
    )
}