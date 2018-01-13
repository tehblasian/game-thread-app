import { FETCH_SCHEDULE_START, FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_ERROR } from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    gamesByDate: [],
    error: false
}

const scheduleReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_SCHEDULE_START: {
            return {
                ...state, isLoading: true
            }
        }
        case FETCH_SCHEDULE_SUCCESS: {
            return {
                ...state, isLoading: false, gamesByDate: extractGamesFromSchedule(action.payload)
            }
        }
        case FETCH_SCHEDULE_ERROR: {
            return {
                ...state, isLoading: false, error: action.payload
            }
        }
        default: return state;
    }
}

export default scheduleReducer;

const extractGamesFromSchedule = (data) => {
    const schedule = filterScheduleToCurrentMonth(data.lscd); //TODO: trim schedule array to current month only 
    const monthlySchedule = schedule.map((month) => {
        return month.mscd.g;
    });

    const scheduleByMonth = monthlySchedule.map((month) => {
        return month.map((game) => {
                return {
                    id: game.gid,
                    date: formatDate(game.gdte),
                    time: game.stt.toUpperCase(),
                    home_team: {
                        name: game.h.tn,
                        logo: '../assets/nba_primary_logos/' + game.h.tn + '.png'
                    },
                    away_team: {
                        name: game.v.tn,
                        logo: '../assets/nba_primary_logos/' + game.v.tn + '.png'
                    },
                    location: game.an + ', ' + game.ac
                }
        }).filter((game) => {
            return game.time !== 'FINAL';
        })
    })

    const extractedSchedule = scheduleByMonth.reduce((prev, curr) =>{
        return prev.concat(curr);
    });

    const gamesByDate = groupBy('date', extractedSchedule)
    return gamesByDate;
}

const groupBy = (property, list) => {
    var grouped = list.reduce(function(groups, item) {
        var val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, []);

    var temp = [];
    for(let property in grouped){
        if(grouped.hasOwnProperty(property))
            temp.push({
                date: property,
                games: grouped[property]
            });
    }

    return temp;
}

const formatDate = (date) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date(date);
    var formattedDate = days[d.getUTCDay()] + ', ' + months[d.getUTCMonth()] + ' ' + d.getUTCDate();
    return formattedDate.toLocaleUpperCase();
}

const filterScheduleToCurrentMonth = (schedule) => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var month = months[d.getUTCMonth()];
    return schedule.filter((item) => {
        return item.mscd.mon === month;
    });
}