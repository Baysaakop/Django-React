import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemDetailView from './containers/ItemDetailView';
import ItemListView from './containers/ItemListView';
import Home from './containers/Home';
import Login from './user/Login';
import Signup from './user/Signup';
import Profile from './user/Profile';
import ItemCreate from './components/ItemCreate';
import ItemUpdate from './components/ItemUpdate';
import ProfileEdit from './user/ProfileEdit';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {/* Item urls */}
            <Route exact path="/items" component={ItemListView} />
            <Route exact path="/items/:itemID" component={ItemDetailView} />
            <Route exact path="/newitem" component={ItemCreate} />
            <Route exact path="/updateitem/:itemID" component={ItemUpdate} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/editprofile" component={ProfileEdit} />
        </Switch>
    )    
}

export default BaseRouter;