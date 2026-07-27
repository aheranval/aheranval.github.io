

// Form submission
document
    .getElementById("adventure-form")
    .addEventListener(
        "submit",
        function(event) {
            event.preventDefault();

            const stamps = [
                ...document.querySelectorAll(
                    'input[type="checkbox"]:checked'
                )
            ].map(
                checkbox => checkbox.value
            );

            const newAdventure = {
                hidden: false,

                date:
                    document
                        .getElementById("date")
                        .value,

                country:
                    document
                        .getElementById("country")
                        .value,

                state:
                    document
                        .getElementById("state")
                        .value,

                city:
                    document
                        .getElementById("city")
                        .value,

                location:
                    document
                        .getElementById("location")
                        .value,

                distance:
                    Number(
                        document
                            .getElementById("distance")
                            .value
                    ),

                duration:
                    Number(
                        document
                            .getElementById("duration")
                            .value
                    ),

                timeOfDay:
                    document
                        .getElementById("time")
                        .value,

                notes:
                    document
                        .getElementById("notes")
                        .value,

                photo:
                    document
                        .getElementById("photo")
                        .value,

                rating:
                    Number(
                        document
                            .getElementById("rating")
                            .value
                    ),

                difficulty:
                    document
                        .getElementById("difficulty")
                        .value,

                mapLink: "",
                stamps: stamps
            };
            
            saveAdventure(newAdventure);
        }
    );

// Add adventure
async function saveAdventure(newAdventure) {
    const {
        error
    } = await supabaseClient
        .from("adventures")
        .insert([newAdventure]);
    if (error) {
        console.error(error);
        alert(
            "Could not save adventure."
        );
        return;
    }
    alert(
        "Adventure saved!"
    );
    document
        .getElementById("adventure-form")
        .reset();
}
