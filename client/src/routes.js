import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import MainPage from './pages/MainPage/MainPage';
import ScoreBoardPage from './pages/ScoreBoardPage/ScoreBoardPage'

var routes = [
    {
        path: '/login',
        exact: false,
        main: ({history})=> <LoginPage history={history} />
    },
    {
        path: '/',
        exact: true,
        main: ({history})=> <MainPage history={history}/>
    },
    {
        path: '/scoreboard',
        exact: false,
        main: ({history})=> <ScoreBoardPage history={history}/>
    },
    {
        path: '',
        exact: false,
        main: ()=> <NotFoundPage />
    }
]

export default routes;