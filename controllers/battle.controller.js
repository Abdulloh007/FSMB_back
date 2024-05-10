const { Battle, Tournament, Application } = require("../models/index.model");


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

async function generateMatches(participants) {
    const matches = [];
    const numParticipants = participants.length;

    for (let i = 0; i < numParticipants; i++) {
        for (let j = i + 1; j < numParticipants; j++) {
            matches.push([participants[i], participants[j]]);
            await Battle.create({
                
            })
        }
    }
    return matches;
};

async function RunTournament(req, res) {
    try {
        const { tornamentId } = req.query
        const tournament = await Tournament.findByPk(tornamentId, {include: [Application]})

        const shuffledParticipants = shuffleArray(tournament.applications);
        const matches = await generateMatches(shuffledParticipants);

        res.status(200).json(tournament)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { RunTournament }