const TAB_LOGIN = '.tab-login';
const TAB_PASSWORD = '.tab-password';
const TAB_REGISTER = '.tab-register';
const TOAST_CLASS = '.toast';
const VERIFYING = 'Verifying';
const NEXT = 'Next';
/*
    let us assume that this list of usernames and password comes from a database
 */
let users = [{username: "sampleuser", password: "samplepass"}];


$(document).ready(function () {
    $(TOAST_CLASS).toast();
    $(TAB_LOGIN).show();
    $(TAB_PASSWORD).hide();
    $(TAB_REGISTER).hide();
    $('#btnNext').click(function (){
        /* assume that this submits to the server */
        $('#span_usernotfound').hide();
        $('#span_userrequired').hide();
        let userNameVal = $('#txt_Username').val();
        $(this).text(VERIFYING);
        setTimeout(function(){
            if (userNameVal)
            {
                if (users.some(item => item.username == userNameVal))
                {
                    $('#span_userrequired').hide();
                    $('#txt_Username').removeClass('error');
                    $(TAB_LOGIN).hide();
                    $(TAB_PASSWORD).show();
                    $(TAB_REGISTER).hide();
                    $('#userName').html(userNameVal);
                }else
                {
                    $('#span_usernotfound').show();
                    $('#txt_Username').addClass('error');
                }
                

            }else{
                    $('#span_userrequired').show();
                    $('#txt_Username').addClass('error');
            }
            $('#btnNext').text(NEXT);
        }, 3000);
    });

    $('#back').click(function () {
        $(TAB_LOGIN).show();
        $(TAB_PASSWORD).hide();
        $(TAB_REGISTER).hide();
    });

    $('#signin').click(function () {
        $(TAB_LOGIN).show();
        $(TAB_PASSWORD).hide();
        $(TAB_REGISTER).hide();
    });

    $('#btnLogin').click(function () {
        /* assume that this submits to the server */
        $('#span_invalidpassword').hide();
        let passwordVal = $('#txt_Password').val();
        let userNameVal = $('#txt_Username').val();
        if (passwordVal)
        {
            let flag = false;
            for (var i = 0; i < users.length; i++)
            {
                if(users[i].username == userNameVal){
                    if (users[i].password == passwordVal)
                    {
                        flag = true;
                    }
                }
            }
            if (!flag)
            {
                $('#span_invalidpassword').show();
                $('#txt_Password').addClass('error');
            }
            else
            {
                $('#span_invalidpassword').hide();
                $('#txt_Password').removeClass('error');
            }
        }else{
            $('#span_invalidpassword').show();
            $('#txt_Password').addClass('error');
        }
    });

    $('#createAccount').click(function (){
        $(TAB_LOGIN).hide();
        $(TAB_PASSWORD).hide();
        $(TAB_REGISTER).show();
    });

    $('#btnCreateAccount').click(function () {
        /* assume that this submits to the server */
        let firstNameVal = $('#txt_Firstname').val();
        let lastNameVal = $('#txt_Lastname').val();
        let userNameVal = $('#txt_UsernameCreate').val();
        let retypeUserNameVal = $('#txt_RetypeUsernameCreate').val();
        let passwordVal = $('#txt_PasswordCreate').val();
        let retypePasswordVal = $('#txt_RetypePasswordCreate').val();

        let isValid = true;

        if (!firstNameVal)
        {
            isValid = false;
            $('#span_invalidfirstname').show();
            $('#txt_Firstname').addClass('error');
        }else{
            $('#span_invalidfirstname').hide();
            $('#txt_Firstname').removeClass('error');
        }

        if (!lastNameVal)
        {
            isValid = false;
            $('#span_invalidlastname').show();
            $('#txt_Lastname').addClass('error');
        }else{
            $('#span_invalidlastname').hide();
            $('#txt_Lastname').removeClass('error');
        }

        if (!userNameVal)
        {
            isValid = false;
            $('#span_invalidusernamecreate').show();
            $('#txt_UsernameCreate').addClass('error');
        }else{
            if (users.some(item => item.username == userNameVal)){
                isValid = false;
                $('#span_invalidusernamecreate').show();
                $('#txt_UsernameCreate').addClass('error');
            }else{
                $('#span_invalidusernamecreate').hide();
                $('#txt_UsernameCreate').removeClass('error');
            }
        }

        if (!retypeUserNameVal)
        {
            isValid = false;
            $('#span_invalidretypeusernamecreate').show();
            $('#txt_RetypeUsernameCreate').addClass('error');
        }else{
            if (userNameVal != retypeUserNameVal){
                isValid = false;
                $('#span_invalidretypeusernamecreate').show();
                $('#txt_RetypeUsernameCreate').addClass('error');
            }else{
                $('#span_invalidretypeusernamecreate').hide();
                $('#txt_RetypeUsernameCreate').removeClass('error');
            }
        }

        if (!passwordVal)
        {
            isValid = false;
            $('#span_invalidpasswordcreate').show();
            $('#txt_PasswordCreate').addClass('error');
        }else{
            $('#span_invalidpasswordcreate').hide();
            $('#txt_PasswordCreate').removeClass('error');
        }

        if (!retypePasswordVal)
        {
            isValid = false;
            $('#span_invalidretypepasswordcreate').show();
            $('#txt_RetypePasswordCreate').addClass('error');
        }else{
            if (passwordVal != retypePasswordVal){
                isValid = false;
                $('#span_invalidretypepasswordcreate').show();
                $('#txt_RetypePasswordCreate').addClass('error');
            }else{
                $('#span_invalidretypepasswordcreate').hide();
                $('#txt_RetypePasswordCreate').removeClass('error');
            }
        }

        if (isValid)
        {
            // assume: all is valid, post to server
            let user = { username: userNameVal, password: passwordVal};
            users.push(user);
            $(TAB_LOGIN).show();
            $(TAB_PASSWORD).hide();
            $(TAB_REGISTER).hide();
            $(TOAST_CLASS).toast('show');
        }
    });
});