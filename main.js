async function getPlayerDetails() {
    const apiKey1 = "df12d127e6a63fa8cc20b56175e552dd46c64b9029d26a5bade1ab1a070eba04";
    const apiKey2 = "915f8f0d692fc1c1fc5465c0c66d688a";
    const searchPlayer = document.getElementById('search-player').value;

    // URLs for both APIs
    const playerUrl = `https://apiv3.apifootball.com/?action=get_players&player_name=${searchPlayer}&APIkey=${apiKey1}`;
    const leaguesUrl = `https://api.soccersapi.com/v2.2/leagues/?user=juliantcoleman1&token=${apiKey2}&t=list`;

    try {
        // Fetching both APIs 
        const [playerResponse, leaguesResponse] = await Promise.all([
            fetch(playerUrl),
            fetch(leaguesUrl)
        ]);

        // Check if responses are okay
        if (!playerResponse.ok || !leaguesResponse.ok) {
            throw new Error(`HTTP Error: ${playerResponse.status} or ${leaguesResponse.status}`);
        }

        // Parse JSON data
        const playerData = await playerResponse.json();
        const leaguesData = await leaguesResponse.json();

        // Display both player and league data
        displayResults(playerData, leaguesData);

    } catch (error) {
        console.log("Error fetching data from APIs:", error);
    }
}

function displayResults(playerData, leaguesData) {
    // elements I want to include from the player data array
    const [{player_image, player_name, player_birthdate, team_name, player_injured, 
            player_goals, player_assists, player_rating}] = playerData;

    // Create HTML for player data
    const playerHTML = `
    <div>
        <img src="${player_image}" alt='player123' width="200px" height="auto" style="border-radius: 50%">
        <p>Player Name: ${player_name}</p>
        <p>Birthdate: ${player_birthdate}</p>
        <p>Club: ${team_name}</p>
        <p>Injured: ${player_injured}</p>
        <p>Rating: ${player_rating}</p>
        <p>Goals: ${player_goals}</p>
        <p>Assists: ${player_assists}</p>
    </div>`;

    // Create HTML for league names only
    const leaguesHTML = leaguesData.data.map(league => `
        <p>League: ${league.name}</p>
    `).join('');

    // Combine both HTML blocks
    const combinedHTML = `
        <h2>Player Details</h2>
        ${playerHTML}
        <h2>Leagues</h2>
        ${leaguesHTML}
    `;

    // Inject the HTML into the DOM
    const displayResults = document.getElementById('displayResults');
    displayResults.innerHTML = combinedHTML;
}

// Event listener to trigger the function on button click
document.querySelector('button').addEventListener('click', getPlayerDetails);
