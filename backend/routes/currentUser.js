import express from 'express';
import getCurrentuser from '../middleware/getCurrentUser.js';
import { currentUser } from '../controllers/CurretUser.js';
import { AllMember, renew ,deleteMember,editmember} from '../controllers/User.js';

const currentUserRoute = express.Router();

currentUserRoute.get("/current",getCurrentuser,currentUser);
currentUserRoute.get("/all-members",getCurrentuser,AllMember);
currentUserRoute.put("/renew/:id", getCurrentuser, renew);
currentUserRoute.put("/update-member/:editid", getCurrentuser, editmember);
currentUserRoute.delete("/delete/:id", getCurrentuser, deleteMember);


export default currentUserRoute;