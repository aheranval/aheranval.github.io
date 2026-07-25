async function checkLogin() {

    const {
        data
    } = await supabaseClient.auth.getSession();


    if (data.session) {

        document
            .getElementById("login-section")
            .style.display = "none";

        document
            .getElementById("admin-section")
            .style.display = "block";

    }

}


checkLogin();



document
.getElementById("login-button")
.addEventListener(
"click",
async () => {

    const email =
        document
        .getElementById("email")
        .value;


    const password =
        document
        .getElementById("password")
        .value;


    const {
        error
    } = await supabaseClient.auth.signInWithPassword({

        email,
        password

    });


    if(error){

        alert(error.message);

        return;

    }


    document
        .getElementById("login-section")
        .style.display = "none";


    document
        .getElementById("admin-section")
        .style.display = "block";

});
