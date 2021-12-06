if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration=>{
        console.log("SW Registered");
        console.log(registration);
    }).catch((error)=>{
        console.log("SW Registratin Failed");
        console.log(error);
    });
}