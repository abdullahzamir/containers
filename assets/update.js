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
    .then(response => response.json())
    .then(data => {
        if (data.error !== undefined) {
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
            containerImage.value = container_image_selected;
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

var currentURL = window.location.href;
var match = currentURL.match(/\/challenges\/(\d+)/);

if (match && match[1]) {
    var challenge_id = parseInt(match[1]);

    var connectType = document.getElementById("connect-type");
    var connectTypeDefault = document.getElementById("connect-type-default");

    var connectTypeEndpoint = "/containers/api/get_connect_type/" + challenge_id;

    fetch(connectTypeEndpoint, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "CSRF-Token": init.csrfNonce
        }
    })
        .then(response => response.json())
        .then(connectTypeData => {
            if (connectTypeData.error !== undefined) {
                console.error("Error:", connectTypeData.error);
            } else {
                var connectTypeValue = connectTypeData.connect;
                connectTypeDefault.innerHTML = "Choose...";
                connectType.removeAttribute("disabled");
                connectType.value = connectTypeValue;
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
} else {
    console.error("Challenge ID not found in the URL.");
}

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