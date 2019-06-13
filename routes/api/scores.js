const express = require('express');
const router = express.Router();
const Score = require('../../models/Score');
const secretKey = require('../../config/keys').secretKey;


router.get('/', (req, res) => {
    Score.find()
    .sort({ score: -1, date: -1 })
    .limit(10)
    .then(scores => res.json(scores))
    .catch(err => res.status(404).json({ noScoresFound: 'No scores found' }));
});

router.post('/', (req, res) => {
    if(req.body.secretKey != secretKey){
        return res.status(403).json({score: "Please do not post fake scores, this is a personal project being shown to potential employers!"});
    }
    Score.findOne({score: req.body.score, name: req.body.name})
    .then(s => {
        if(s){
            return res.status(409).json({score: "This score has already been posted"});
        }else{
            newScore = new Score({
                score: req.body.score,
                name: req.body.name
            }).save()
               .then(score => res.json(score))
               .catch(err => console.log(err));
        }
    });
});



module.exports = router;