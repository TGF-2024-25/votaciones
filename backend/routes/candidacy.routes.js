import express from 'express';
import { upload } from '../middlewares/upload.js';
import { controller_create_candidacy, controller_delete_candidacy, controller_update_candidacy, 
    controller_search_candidacy, controller_consult_candidacy } from '../controllers/candidacy.controller.js';

const router = express.Router();

router.post('/create', upload.single('video'), controller_create_candidacy);
router.post('/delete', controller_delete_candidacy);
router.post('/update', upload.single('video'), controller_update_candidacy);
router.post('/search', controller_search_candidacy);
router.post('/consult', controller_consult_candidacy);

export default router;
