import { FETCH_SCHEDULE_START, FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_ERROR } from './actionTypes';
import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/';

export function getNBASchedule(){
    return (dispatch) => {
        dispatch({type: FETCH_SCHEDULE_START});
        axios.get(cors + 'data.nba.com/data/10s/v2015/json/mobile_teams/nba/2017/league/00_full_schedule.json')
            .then((response) => {
                dispatch({type: FETCH_SCHEDULE_SUCCESS, payload: response.data});
            })
            .catch((error) => {
                dispatch({type: FETCH_SCHEDULE_ERROR, payload: error});
            })
    }
}