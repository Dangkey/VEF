$("#filename").change(function() {
    showUpload();
    var file = document.getElementById('filename').files[0];
    AnalyzeUpload(file);
});

function AnalyzeUpload(file) {
    var apiKey = "433a44580bab4a18b44326977bd28a75";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,facialHair,emotion",
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
            processUpload(response);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
}

function processUpload(response) {
    var arrayLength = response.length;

    if (arrayLength > 0) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        context.beginPath();

        // Draw face rectangles into canvas.
        for (var i = 0; i < arrayLength; i++) {
            var faceRectangle = response[i].faceRectangle;
            $("#responseTextArea").text("Gender: " + response[i].faceAttributes.gender +
             "\nAge: " + response[i].faceAttributes.age);
            var gender = response[i].faceAttributes.gender;
            context.rect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height);
        }

        context.lineWidth = 3;
        context.strokeStyle = 'white';
        context.stroke();
    }
}

function showUpload() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    var input = document.getElementById("filename");
    var img = new Image();




    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(input.files[0]);

}
