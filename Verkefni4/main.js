$("#filename").change(function() {
    showImage();
    var file = document.getElementById('filename').files[0];
    detectFaces(file);
});

function detectFaces(file) {
    var apiKey = "433a44580bab4a18b44326977bd28a75";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    };
    // Call the API
    $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
            type: "POST",
            data: file,
            processData: false
        })
        .done(function(response) {
            // Process the API response.
            processResult(response);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}

function processResult(response) {
    var arrayLength = response.length;

    if (arrayLength > 0) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        context.beginPath();

        // Draw face rectangles into canvas.
        for (var i = 0; i < arrayLength; i++) {
            var faceRectangle = response[i].faceRectangle;
            context.rect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height);
        }

        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.stroke();
    }

    // Show the raw response.
    var data = JSON.stringify(response, null, 2);
    $("#responseTextArea").text(data);
}

function showImage() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    var input = document.getElementById("filename");
    var img = new Image();



    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(input.files[0]);
    console.log(img.src);
}
