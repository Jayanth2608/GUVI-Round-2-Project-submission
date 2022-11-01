<?php

    $emailId = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $login = true;
    $messages = array();

    $con = mysqli_connect('127.0.0.1', 'root', '', 'db_users');

    $select = mysqli_query($con, "SELECT * FROM `tb_usercredentials` WHERE email_id = '$emailId' AND user_password = '$password'");
    $row = mysqli_fetch_array($select);

    if ( !isset($emailId) || empty($emailId) ) {
        $login = false;
        $messages[] = 'emailId cannot be empty!';
    } elseif (! filter_var($emailId, FILTER_VALIDATE_EMAIL)) {
        $login = false;
        $messages[] = 'Enter valid email!';
    }

    if ( !isset($password) || empty($password) ) {
        $login = false;
        $messages[] = 'Password cannot be empty!';
    }

    if ($login) {
        // if ($emailId === 'abiramilingam2018@gmail.com' && $password === 'Sabi@2002') {
        if (is_array($row)) {    
            $login = true;
            $messages[] = 'Successful login!';
        } else {
            $login = false;
            $messages[] = 'Incorrect emailId/password combination!';
        }
    }

    echo json_encode(
        array(
            'login' => $login,
            'messages' => $messages
        )
    );

?>