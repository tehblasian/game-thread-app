import { FETCH_GAMETHREAD_START, FETCH_GAMETHREAD_SUCCESS, FETCH_GAMETHREAD_ERROR } from './actionTypes';

import Snoowrap from 'snoowrap';
import { config } from '../config';
const reddit = new Snoowrap(config);

const cors = 'https://cors-anywhere.herokuapp.com/';

export function getGameThread(team){
    return (dispatch) => {
        dispatch({type: FETCH_GAMETHREAD_START});
        reddit.getSubreddit('NBA').search({query: 'GAME THREAD ' + team, time: 'day'}).then((response) => {
            response.map((submission) => {
                submission.expandReplies().then((data) => {
                    var comments = data.comments;
                    comments.sort((a, b) => {
                        return new Date(a) < new Date(b)
                    })
                    console.log(comments)
                    dispatch({type: FETCH_GAMETHREAD_SUCCESS, payload: comments});
                })
            })
        })
        .catch((error) => {
            dispatch({type: FETCH_GAMETHREAD_ERROR, payload: error});
        })
    }
}