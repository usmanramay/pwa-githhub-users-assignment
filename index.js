// dta="<ul>";
//       for(var i=0;i<users.length;i++){
//         dta+="<li>"+users[i].login  +"</li>";
//       }
     
//       dta+="</ul>";
// document.getElementById("users").innerHTML=dta;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }

//var server = "http://localhost:3000/users";

  function getData(e){
    console.log("called");
    e.preventDefault();
    let inputvalue=document.getElementById("inpu").value;
    const server = `https://api.github.com/users/${inputvalue}/followers`;
    fetch(server).then(function(response) {
      // fetch("https://api.github.com/users/octocat/followers").then(function(response) {

      return response.json();
    }).then(function(users) {
       console.log("data from network",users);
       let usersdata=document.getElementById('users');
       
       users.map(dta=>{
        usersdata.innerHTML +=`<div class="panel panel-info">
        <div class="panel-heading">${dta.login}</div>
        <a href="${dta.html_url}" class="btn btn-default center-block" target="_blank">Go To Profile</a>
        <div class="panel-body"> <img class="img-thumbnail" src="${dta.avatar_url}" width="200px"/>
        
        </div>
      </div>`;


      })
      
     
    }).catch(function() {
      console.log("error cought from network");
    });
  
    
    caches.match(server).then(function(response){
      if(!response){
        console.log("No response");
      }
      return response.json();
    }).then(function(data){
      console.log("data from cache =",data);
    }).catch(function(){
    console.log("Error");
  })
  
  }

  