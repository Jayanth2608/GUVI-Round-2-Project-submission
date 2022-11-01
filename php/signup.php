<?php

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $emailId = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';

    $signup = true;
    $messages = array();

    $con = mysqli_connect('127.0.0.1', 'root', '', 'db_users');

    $select = mysqli_query($con, "SELECT * FROM `tb_usercredentials` WHERE email_id = '$emailId' AND user_password = '$password'");
    $row = mysqli_fetch_array($select);

    if ( !isset($name) || empty($name) ) {
        $signup = false;
        $messages[] = 'name cannot be empty!';
    }

    if ( !isset($emailId) || empty($emailId) ) {
        $signup = false;
        $messages[] = 'emailId cannot be empty!';
    } elseif (! filter_var($emailId, FILTER_VALIDATE_EMAIL)) {
        $signup = false;
        $messages[] = 'Enter valid email!';
    }

    if ( !isset($password) || empty($password) ) {
        $signup = false;
        $messages[] = 'Password cannot be empty!';
    }

    if ( $password !== $confirm_password ) {
        $signup = false;
        $messages[] = 'Passwords must match!';
    }

    if ($signup) {
        mysqli_query($con, "INSERT INTO `tb_usercredentials`(`user_name`, `email_id`, `user_password`) VALUES ('$name','$emailId','$password')");
        $signup = true;
        $messages[] = 'Successful signup!';
    }

    echo json_encode(
        array(
            'signup' => $signup,
            'messages' => $messages
        )
    );

?>