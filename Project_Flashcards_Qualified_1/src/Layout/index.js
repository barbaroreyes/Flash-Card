import React from "react";
import {Route, Switch} from 'react-router-dom'
import Header from "./Header";
import NotFound from "./NotFound";



function Layout() {
  return (
    <div className ='tc'>
      <Header/>
      <div className="container">
       <Switch>
       
       <Route>
       <NotFound />
       </Route>
       </Switch>
        
      </div>
    </div>
  );
}

export default Layout;
