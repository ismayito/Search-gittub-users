import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { AppContext} from '../context/context';
const Dashboard = () => {

  const {loading} = React.useContext(AppContext);
  console.log(loading);
  if(loading){
    return(
      <main>
        <Navbar></Navbar>
        <Search/>
        <img src={loadingImage} alt="loading" className="loading-img"></img>
      </main>
    )
  }
 
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos/>
    </main>
  );
};

export default Dashboard;
