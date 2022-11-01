
$("#btn-submit").on("click", function(event){
    console.log("login button pressed!");
    const request = new XMLHttpRequest();

            request.onload = () => {
                let responseObject = null;

                try {
                    console.log(request.responseText);
                    responseObject = JSON.parse(request.responseText);
                } catch (e) {
                    console.error('Could not parse JSON!');
                }

                if (responseObject) {
                    handleResponse(responseObject);
                }
            };
            const emailID = $("#email-id").val();
            const password = $("#password").val();
            const requestData = `email=${emailID}&password=${password}`;
            console.log(requestData);
            request.open('post', '../php/login.php');
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(requestData);
});

function handleResponse (responseObject) {
    console.log('inside handle response');
    if (responseObject.login) {
        console.log('inside sucess login dashboard redirection!');
        location.href = 'home.html';
    } else {
        $("#email-id").on("click", function(){
            if($("#password~div").text()=="Incorrect emailId/password combination!"){
                if($("#password").hasClass("is-invalid")){
                    $("#password").removeClass("is-invalid");
                    $("#email-id").removeClass("is-invalid");
                }
            }
        })
        $("#password").on("click", function(){
            if($("#password~div").text()=="Incorrect emailId/password combination!"){
                if($("#password").hasClass("is-invalid")){
                    $("#password").removeClass("is-invalid");
                    $("#email-id").removeClass("is-invalid");
                }
            }
        })
        $("#email-id").on("keyup", function(){
            if($("#email-id").hasClass("is-invalid")){
                $("#email-id").removeClass("is-invalid")
            }
        })
        $("#password").on("keyup", function(){
        if($("#password").hasClass("is-invalid")){
            $("#password").removeClass("is-invalid")
        }
        })
        responseObject.messages.forEach((message) => {
            console.log(typeof(message));
            if(message=="emailId cannot be empty!"|| message=="Enter valid email!"){
                $("#email-id~div").text(message);
                $("#email-id").addClass("is-invalid");
            } else if(message=="Password cannot be empty!"){
                $("#password~div").text(message);
                $("#password").addClass("is-invalid");
            } else if(message=="Incorrect emailId/password combination!"){
               $("#email-id~div").text('');
               $("#email-id").addClass("is-invalid")
               $("#password~div").text(message);
               $("#password").addClass("is-invalid")
            }
        });

        // $("#error-message").css("display", "block");
    }
}