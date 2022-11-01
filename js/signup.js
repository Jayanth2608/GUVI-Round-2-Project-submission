
$("#signup_button").on("click", function(event){
    console.log("signup button pressed!");
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
            const name = $("#name").val();
            const emailID = $("#signup_email").val();
            const password = $("#signup_password").val();
            const confirm_password = $("#confirm_password").val();
            const requestData = `name=${name}&email=${emailID}&password=${password}&confirm_password=${confirm_password}`;
            console.log(requestData);
            request.open('post', '../php/signup.php');
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(requestData);
});

function handleResponse (responseObject) {
    console.log('inside handle response');
    if (responseObject.signup) {
        console.log('inside sucess login dashboard redirection!');
        location.href = 'home.html';
    } else {
        $("#signup_password").on("click", function(){
            if($("#confirm_password").hasClass("is-invalid")){
                $("#confirm_password").removeClass("is-invalid");
                $("#signup_password").removeClass("is-invalid");
            }
        })
        $("#confirm_password").on("click", function(){
            if($("#confirm_password").hasClass("is-invalid")){
                $("#confirm_password").removeClass("is-invalid");
                $("#signup_password").removeClass("is-invalid");
            }
        })
        $("#name").on("keyup", function(){
            if($("#name").hasClass("is-invalid")){
                $("#name").removeClass("is-invalid")
            }
        })
        $("#signup_email").on("keyup", function(){
            if($("#signup_email").hasClass("is-invalid")){
                $("#signup_email").removeClass("is-invalid")
            }
        })
        $("#signup_password").on("keyup", function(){
        if($("#signup_password").hasClass("is-invalid")){
            $("#signup_password").removeClass("is-invalid")
        }
        })
        responseObject.messages.forEach((message) => {
            console.log(typeof(message));
            if(message=="emailId cannot be empty!" || message=="Enter valid email!"){
                $("#signup_email~div").text(message);
                $("#signup_email").addClass("is-invalid");
            } else if(message=="Password cannot be empty!"){
                $("#signup_password~div").text(message);
                $("#signup_password").addClass("is-invalid");
            } else if(message=="name cannot be empty!"){
                $("#name~div").text(message);
                $("#name").addClass("is-invalid");
            } else if(message=="Passwords must match!"){
               $("#signup_password~div").text('');
               $("#signup_password").addClass("is-invalid")
               $("#confirm_password~div").text(message);
               $("#confirm_password").addClass("is-invalid")
            }
        });

        // $("#error-message").css("display", "block");
    }
}