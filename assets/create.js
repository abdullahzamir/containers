CTFd.plugin.run((_CTFd) => {
    const $ = _CTFd.lib.$;
    const md = _CTFd.lib.markdown();
});

var containerImage = document.getElementById("container-image");
var containerImageDefault = document.getElementById("container-image-default");
var path = "/containers/api/images";

fetch(path, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "CSRF-Token": init.csrfNonce
    }
})
.then(response => {
    if (!response.ok) {
        // Handle error response
        return Promise.reject("Error fetching data");
    }
    return response.json();
})
.then(data => {
    if (data.error != undefined) {
        // Error
        containerImageDefault.innerHTML = data.error;
    } else {
        // Success
        for (var i = 0; i < data.images.length; i++) {
            var opt = document.createElement("option");
            opt.value = data.images[i];
            opt.innerHTML = data.images[i];
            containerImage.appendChild(opt);
        }
        containerImageDefault.innerHTML = "Choose an image...";
        containerImage.removeAttribute("disabled");
    }
    console.log(data);
})
.catch(error => {
    // Handle fetch error
    console.error(error);
});


var containerServer = document.getElementById("container-server");
var containerServerDefault = document.getElementById("container-server-default");

var server_path = "/containers/api/running_servers";

fetch(server_path, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "CSRF-Token": init.csrfNonce
    }
})
.then(response => {
    if (!response.ok) {
        // Handle error response
        return Promise.reject("Error fetching data");
    }
    return response.json();
})
.then(data => {
    if (data.error != undefined) {
        // Error
        containerServerDefault.innerHTML = data.error;
    } else {
        // Success
        for (var i = 0; i < data.servers.length; i++) {
            var opt = document.createElement("option");
            opt.value = data.servers[i];
            opt.innerHTML = data.servers[i];
            containerServer.appendChild(opt);
        }
        containerServerDefault.innerHTML = "Choose a server...";
        containerServer.removeAttribute("disabled");
    }
    console.log(data);
})
.catch(error => {
    // Handle fetch error
    console.error(error);
});