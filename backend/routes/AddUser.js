import express from 'express'
import { addNew } from '../controllers/User.js';

import getCurrentuser from '../middleware/getCurrentUser.js';
import upload from '../middleware/multer.js';

const AddNewMember = express.Router();

AddNewMember.post("/member",getCurrentuser,upload.single("image"),addNew)

export default AddNewMember;