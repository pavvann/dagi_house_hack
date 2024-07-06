var express = require('express');
var router = express.Router();
var axios = require('axios');
require('dotenv').config()

router.post('/label-text', async function(req, res, next) {
    const { text_inputs } = req.body;
    const apiKey = process.env.API_KEY_MBD
    const apiUrl = 'https://api.mbd.xyz/v1/farcaster/casts/labels/for-text';
    const categories = ['topics', 'sentiment', 'emotion', 'moderation'];

    try {
        // Store results for each category
        const results = {};

        // Iterate over each category and make API calls
        for (const category of categories) {
            const response = await axios.post(apiUrl, {
                text_inputs,
                label_category: category
            }, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': apiKey,
                }
            });

            // Extract the label with the highest score
            const labels = response.data.body[0];
            const maxLabel = labels.reduce((max, label) => label.score > max.score ? label : max, labels[0]);

            results[category] = maxLabel;
        }

        // Respond with the highest score labels
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
