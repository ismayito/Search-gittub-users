import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import Followers from '../components/Followers';

const rootUrl = 'https://api.github.com';

const AppContext= React.createContext();
// Provider , Consumer
const AppProvider=({children})=>{
const [gittubUsers,setGitTubUsers]=useState(mockUser);
const [repos,setRepos]=useState(mockRepos);
const [followers,setFollowers]=useState(mockFollowers);
const [requests,setRequests]=useState(0);
const [loading,setLoading]=useState(false);
const [error,setError]=useState({show:false,msg:""});

const CheckRequests=()=>{
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
    let {rate:{remaining}}=data;
    //console.log(data);
    
    setRequests(remaining );
    if(remaining===0){
        myError(true,"sorry you have used up your requests")
    }        
    }).catch((err)=>console.log(err));
}
 function myError(show=false,msg=""){
    setError({show,msg})
    console.log(show);
 }
 const searchUser=async(user)=>{
        myError();
        setLoading(true)
   
    const response= await axios(`${rootUrl}/users/${user}`).catch(err=>console.log(err));
    console.log(response)
    if(response){
    setGitTubUsers(response.data);
     const {login,repos_url,followers_url}=response.data;
     //repos
     axios(`${repos_url}?per_page=100`).then(response=>setRepos(response.data));
     //axios( `${rootUrl}/users/${login}/repos?per_page=100`).then(response=>setRepos(response.data));
     //followers
     axios(`${followers_url}?per_page=100`).then(response=>setFollowers(response.data));
    //  await Promise.allSettled([axios(`${repos_url}?per_page=100`),axios(`${followers_url}?per_page=100`)]).then(results=>
        
    //     {
    //         console.log(results)
    //         const {followers,repos}=results
    //         console.log(results);
    //         const status="fulfilled";
    //         if(repos.status ===status){
    //             setRepos(repos.value.data)
    //         }
    //         if(followers.status===status){
    //             setFollowers(followers.value.data);
    //         }
    //     })
    }
    
    else{
        myError(true,"there is no user with that username")
    }
    CheckRequests();
    setLoading(false);
    
 }

useEffect(CheckRequests,[])

    return <AppContext.Provider value={{gittubUsers,repos,followers,searchUser,requests,error,loading}}>{children}</AppContext.Provider>
}
export {AppContext,AppProvider};