import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './account/Login';
import Signup from './account/Signup';
import Profile from './account/Profile';
import ItemList from './item/ItemList';
import ItemDetail from './item/ItemDetail';
import ItemCreate from './item/ItemCreate';
import ItemUpdate from './item/ItemUpdate';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {/* Item urls */}
            <Route exact path="/items" component={ItemList} />
            <Route exact path="/items/:itemID" component={ItemDetail} />
            <Route exact path="/newitem" component={ItemCreate} />
            <Route exact path="/updateitem/:itemID" component={ItemUpdate} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />            
        </Switch>
    )    
}
export default BaseRouter;