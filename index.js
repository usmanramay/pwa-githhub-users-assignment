if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }

  function getData(){
    fetch("http://localhost:3000/users").then(function(response) {
      return response.json();
    }).then(function(users) {
      console.log("data from network",users);
    }).catch(function() {
      console.log("error cought");
    });
  
    
    caches.match("http://localhost:3000/users").then(function(response){
      if(!response){
        console.log("No data found");
      }
      return response.json();
    }).then(function(data){
      console.log("data from cache =",data);
    }).catch(function(){
    console.log("Error");
  })
  
  }

  