import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import DefaultLayout from 'components/layout/default/DefaultLayout';
import Rate from 'components/rate/Rate';
import Blog from 'pages/blog/Blog';
import Classes from 'pages/classes/Classes';
import Courses from 'pages/courses/Courses';
import Franchising from 'pages/franchising/Franchising';
import Games from 'pages/games/Games';
import Home from 'pages/home/Home';
import Homework from 'pages/homework/Homework';
import HomeworkAddEdit from 'pages/homework/HomeworkAddEdit/HomeworkAddEdit';
import Login from 'pages/login/Login';
import Olympiads from 'pages/olympiads/Olympiads';
import Pay from 'pages/pay/Pay';
import Report from 'pages/report/Report';
import Schedule from 'pages/schedule/Schedule';
import Statistic from 'pages/statistic/Statistic';
import Testing from 'pages/testing/Testing';
import UserInfo from 'pages/user-info/UserInfo';
import Users from 'pages/users/Users';

const App = () => (
  <Router>
    <Routes>
      <Route path={AppRoutes.Index} element={<DefaultLayout />}>
        <Route path={AppRoutes.Index} element={<Home />} />
        <Route path={AppRoutes.Blog} element={<Blog />} />
        <Route path={AppRoutes.Classes} element={<Classes />} />
        <Route path={AppRoutes.Courses} element={<Courses />} />
        <Route path={AppRoutes.Franchising} element={<Franchising />} />
        <Route path={AppRoutes.Games} element={<Games />} />
        <Route path={AppRoutes.Homework} element={<Homework />} />
        <Route path={`${AppRoutes.Homework}${AppRoutes.Add}`} element={<HomeworkAddEdit />} />
        <Route path={AppRoutes.Signin} element={<Login />} />
        <Route path={AppRoutes.Olympiads} element={<Olympiads />} />
        <Route path={AppRoutes.Payment} element={<Pay />} />
        <Route path={AppRoutes.Rate} element={<Rate />} />
        <Route path={AppRoutes.Report} element={<Report />} />
        <Route path={AppRoutes.Schedule} element={<Schedule />} />
        <Route path={AppRoutes.Statistic} element={<Statistic />} />
        <Route path={AppRoutes.Testing} element={<Testing />} />
        <Route path={AppRoutes.UserInfo} element={<UserInfo />} />
        <Route path={AppRoutes.Users} element={<Users />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
