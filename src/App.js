import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import HomeTrivia from './pages/HomeTrivia';
import './App.css';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/trivia" component={ HomeTrivia } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
