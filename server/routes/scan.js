const express = require('express');
const router = express.Router();
const { runScan, getHistory } = require('../controllers/scanController');

router.post('/scan', runScan);
router.get('/history', getHistory);

module.exports = router;
