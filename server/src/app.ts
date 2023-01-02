import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import activityRouter from './routes/activty.route';
import catalogRouter from './routes/catalog.route';
import companyRouter from './routes/company.route';
import contactRouter from './routes/contact.route';
import daysOffRouter from './routes/days_off.route';
import daysOffStatusRouter from './routes/days_off_status.route';
import emergencyContactRouter from './routes/emergency_contact.route';
import emergencyUserRouter from './routes/emergency_user.route';
// import estimationCostRouter from './routes/estimation_cost.route';
import interactionRouter from './routes/interaction.route';
// import invoiceRouter from './routes/invoice.route';
import souceRouter from './routes/source.route';
import prospectStatusRouter from './routes/prospect_status.route';
import prospectRouter from './routes/prospect.route';
import projectRouter from './routes/project.route';
import projectStatusRouter from './routes/project_status.route';
import projectTypeRouter from './routes/project_type.route';
import projectUserRouter from './routes/project_user.route';
// import tvaRouter from './routes/tva.route';
import userRouter from './routes/user.route';
import { isAuthenticated, resetPassword, verifyPassword, verifyUser } from './middlewares/auth.middleware';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Check if serveur is On
 */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from express !' });
});

/**
 * Route API pour le login
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check emptyness of the incoming data
    if (!email || !password) {
      return res.json({ message: 'Please enter all the details' });
    }
    //Check if the user already exist or not
    const user = await verifyUser(email);
    if (!user) {
      return res.json({ message: 'Wrong credentials' });
    }
    //Check password match
    const token = await verifyPassword(password, user);
    if (typeof token === 'object') {
      return res.status(500).json({ message: 'Wrong credentials' });
    } else {
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    return res.json({ error: error });
  }
});

/**
 * Route API pour changer son mdp
 */
app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword, oldPassword } = req.body;

    //Check emptyness of the incoming data
    if (!email || !oldPassword || !newPassword) {
      return res.json({ message: 'Please enter all the details' });
    }

    //Check if the user already exist or not
    const user = await verifyUser(email);
    if (!user) {
      return res.json({ message: 'Wrong credentials' });
    }
    //Check id oldPassword match
    const verifiedPassword = await argon2.verify(user.password, oldPassword);
    if (!verifiedPassword) {
      return res.json({ message: 'Wrong credentials' });
    }

    const updatedUserWitNewPassword = await resetPassword(newPassword, user);

    const token = await verifyPassword(newPassword, updatedUserWitNewPassword);
    if (typeof token === 'object') {
      return res.status(500).json({ message: 'Wrong credentials' });
    } else {
      return res.cookie('token', token).json({ success: true, message: 'LoggedIn Successfully' });
    }
  } catch (error) {
    return res.json({ error: error });
  }
});

/**
 * Route API pour l'entité Activity
 * tested in prospect.test.ts
 */
app.use('/api/activities', activityRouter);

/**
 * Route API pour l'entité Catalog
 */
app.use('/api/catalogs', catalogRouter);

/**
 * Route API pour l'entité Company
 * tested in company.test.ts
 */
app.use('/api/company', companyRouter);

/**
 * Route API pour l'entité Contact
 * tested in prospect.test.ts
 */
app.use('/api/contacts', contactRouter);

/**
 * Route API pour l'entité Days_off
 */
app.use('/api/days-off', daysOffRouter);

/**
 * Route API pour l'entité Days_off_status
 */
app.use('/api/days-off-status', daysOffStatusRouter);

/**
 * Route API pour l'entité Emergency_contact
 */
app.use('/api/emergency-contacts', emergencyContactRouter);

/**
 * Route API pour l'entité Emergency_user
 */
app.use('/api/emergency-users', emergencyUserRouter);

/**
 * Route API pour l'entité estimation_cost
 */
// app.use('/api/estimation-cost', estimationCostRouter);

/**
 * Route API pour l'entité Interaction
 * ****NOT tested in prospect.test.ts****
 */
app.use('/api/interactions', interactionRouter);

/**
 * Route API pour l'entité Invoice
 */
// app.use('/api/invoices', invoiceRouter);

/**
 * Route API pour l'entité Source
 * tested in prospect.test.ts
 */
app.use('/api/sources', souceRouter);

/**
 * Route API pour l'entité Prospect
 * tested in prospect.test.ts
 */
app.use('/api/prospects', prospectRouter);

/**
 * Route API pour l'entité Prospect_status
 * tested in prospect.test.ts
 */
app.use('/api/prospect-status', prospectStatusRouter);

/**
 * Route API pour l'entité Project
 * tested in project.test.ts
 */
app.use('/api/projects', projectRouter);

/**
 * Route API pour l'entité Project_status
 * tested in project.test.ts
 */
app.use('/api/project-status', projectStatusRouter);

/**
 * Route API pour l'entité Project_type
 * tested in project.test.ts
 */
app.use('/api/project-types', projectTypeRouter);

/**
 * Route API pour l'entité Project_type
 */
app.use('/api/project-users', projectUserRouter);

/**
 * Route API pour l'entité Tva
 */
//  app.use('/api/tva', tvaRouter);

/**
 * Route API pour l'entité User
 * tested in prospect.test.ts
 */
app.use('/api/users', userRouter);

export default app;
