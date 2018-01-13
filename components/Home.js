import React from 'react';
import { connect } from 'react-redux'; 

import { getNBASchedule } from '../actions/scheduleActions';

import Snoowrap from 'snoowrap';
import { config } from '../config';
const reddit = new Snoowrap(config);

import Loading from './Loading';

@connect((store) => {
    return {
        isLoading: store.schedule.isLoading,
        gamesByDate: store.schedule.gamesByDate,
        error: store.schedule.error
    }
})
export default class Home extends React.Component{
    componentWillMount(){
        this.props.dispatch(getNBASchedule());
    }
    render(){
        return (
            <div className='home-container'>
                <h1 className='header'>NBA LIVE GAME THREADS</h1>    
                <GameList gamesByDate={this.props.gamesByDate} range={7} isLoading={this.props.isLoading} error={this.props.error}/>
            </div>
        )
    }
}

const GameList = (props) => {
    return (
        <div className='game-list-container'>
            {props.isLoading && <Loading text='Loading Schedule' speed={500}/>}
            {props.error && <h1 className='header'>Oops! Something went wrong...</h1>}
            <ul className='vertical'>
                {props.gamesByDate.slice(0, props.range).map((day, index) => { //props.range specifies the number of days in the schedule to display
                    return (
                        <li key={day.date} className='game-list-item'>
                            {index == 0 && <h1 className='date'>TODAY</h1>}
                            {index == 1 && <h1 className='date'>UPCOMING GAMES</h1>}
                            <h1 className='date'>{day.date}</h1>
                            {day.games.map((game, index) => {
                            return <div key={game.id}>
                                <GamePreview
                                    time={game.time} 
                                    location={game.location}
                                    awayName={game.away_team.name}
                                    awayLogo={game.away_team.logo}
                                    homeName={game.home_team.name}
                                    homeLogo={game.home_team.logo}/>
                                    <div className='line-separator'></div>
                            </div>
                            })} 
                        </li>
                    )
                })}                        
            </ul>
        </div>
    )
}

const GamePreview = (props) => {
    return (
        <div className='game-preview-container'>
            <h1 className='header-small' style={{textAlign: 'left'}}>{props.location}</h1>
            <h1 className='header-small' style={{textAlign: 'left'}}>{props.time}</h1>
            <table className='game-preview-table'>
                <tbody>
                    <tr>
                        <td className='team-preview-cell'><TeamPreview logo={props.awayLogo} team={props.awayName}/></td>
                        <td><h1 className='header-small' style={{fontSize: '25px'}}>at</h1></td>
                        <td className='team-preview-cell'><TeamPreview logo={props.homeLogo} team={props.homeName}/></td>                     
                    </tr>
                </tbody>                
            </table>
        </div>
    )
}

const TeamPreview = (props) => {
    return (
        <div className='team-preview'>
            <ul className='horizontal'>
                <li><img className='logo-small' src={props.logo}/></li>
                <li className='header-small' style={{fontSize: '30px', marginLeft: '.5em'}}>{props.team}</li>
            </ul>
            
        </div>
    )
}