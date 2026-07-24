let adventures = [];
let databaseLoaded = false;

// Load existing database
fetch("data/adventures.json")
    .then(response => response.json())
    .then(data => {
        adventures = data.adventures;
        databaseLoaded = true;

        console.log(
            "Loaded adventures:",
            adventures
        );
    })
    .catch(error => {
        console.error(
            "Could not load adventure database:",
            error
        );

        alert(
            "Could not load existing adventures.json"
        );
    });

// Form submission
document
    .getElementById("adventure-form")
    .addEventListener(
        "submit",
        function(event) {
            event.preventDefault();

            if (!databaseLoaded) {
                alert("Database still loading. Try again!");
                return;
            }

            const stamps = [
                ...document.querySelectorAll(
                    'input[type="checkbox"]:checked'
                )
            ].map(
                checkbox => checkbox.value
            );

            const newAdventure = {
                id: Date.now(),
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

// Add adventure + download JSON
function saveAdventure(newAdventure) {
    adventures.push(newAdventure);

    const database = {
        version: 1,
        adventures: adventures
    };

    const json = JSON.stringify(
        database,
        null,
        4
    );

    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "adventures.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    alert(
        "Adventure added! Replace data/adventures.json with the downloaded file."
    );
}
