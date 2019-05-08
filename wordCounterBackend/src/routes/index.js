import express from 'express';
import Frequency from '../config/model';

const router = express.Router();

router.get('/getdata', async (req, res) => {
  try {
    const data = await Frequency.find().sort({ word: 1 });
    if (data.length > 0) {
      return res.status(200).json(data);
    }
    return res.status(400).json();
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.post('/postdata', async (req, res) => {
  try {
    const string = (req.body.data).toLowerCase();
    const pattern = /\w+/g;

    // matched words
    const matchedWords = String(string).match(pattern);

    // perform operations on individual word from typed sentence
    const counts = matchedWords.reduce((stats, word) => {
      // stats => words over time
      // words => word in context
      if (stats.hasOwnProperty(word)) {
        // increase word count if word already exists.
        stats[word] += 1;
      } else {
        // new word
        stats[word] = 1;
      }
      // return for next iteration
      return stats;
    }, {});
    // console.log(counts,"fgfgfg");
    // perform operation on result
    Object.keys(counts).forEach(async (element, i) => {
      const data = await Frequency.findOne({ word: element });
      if (data) {
        const newcounts = counts[element] + data.count;
        await Frequency.findOneAndUpdate({ word: element }, { $set: { count: newcounts } });
      } else {
        await Frequency.create({
          word: element,
          count: counts[element],
        });
      }
      if (Object.keys(counts).length === i + 1) {
        const sortedData = await Frequency.find().sort({ word: 1 });
        return res.status(200).json(sortedData);
      }
    });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});


module.exports = router;
