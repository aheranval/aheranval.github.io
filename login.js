document
.getElementById("github-login")
.addEventListener(
"click",
async () => {

    await supabaseClient.auth.signInWithOAuth({

        provider: "github"

    });

});
