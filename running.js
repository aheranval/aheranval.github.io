// Load running adventures
fetch("data/adventures.json")
    .then(response => response.json())
    .then(data => {
        const adventures = data.adventures;

        // Calculate statistics
        const visibleRuns = adventures.filter(
            run => !run.hidden
        );

        const totalMiles = visibleRuns.reduce(
            (sum, run) => sum + run.distance,
            0
        );

        const countries = new Set(
            visibleRuns.map(run => run.country)
        );

        const states = new Set(
            visibleRuns
                .map(run => run.state)
                .filter(Boolean)
        );

        const cities = new Set(
            visibleRuns
                .map(run => run.city)
                .filter(Boolean)
        );

        const places = new Set(
            visibleRuns.map(run => run.location)
        );

        // Update stat cards
        document.getElementById("total-miles")
            .textContent = totalMiles.toFixed(1);

        document.getElementById("country-count")
            .textContent = countries.size;

        document.getElementById("state-count")
            .textContent = states.size;

        document.getElementById("city-count")
            .textContent = cities.size;

        document.getElementById("place-count")
            .textContent = places.size;

        // Recent adventures
        const container =
            document.getElementById("recent-adventures");

        visibleRuns
            .slice()
            .reverse()
            .forEach(run => {
                const card = document.createElement("div");
                card.className = "run-card";

                card.innerHTML = `
                    <h3>
                        ${run.country}
                        ${run.city ? " - " + run.city : ""}
                    </h3>

                    <p class="run-date">
                        ${run.date}
                    </p>

                    <p>
                        ${run.distance} miles
                        ${run.difficulty}
                    </p>

                    <p>
                        ${run.notes}
                    </p>
                `;

                container.appendChild(card);
            });

        // -----------------------------
        // Passport stamps
        // -----------------------------
        const earnedStamps = new Set();

        visibleRuns.forEach(run => {
            (run.stamps || []).forEach(stamp => {
                earnedStamps.add(stamp);
            });
        });

        earnedStamps.forEach(stamp => {
            const badge =
                document.getElementById(stamp);

            if (badge) {
                badge.style.opacity = "1";
            }
        });
    })
    .catch(error => {
        console.error(
            "Could not load running data:",
            error
        );
    });
