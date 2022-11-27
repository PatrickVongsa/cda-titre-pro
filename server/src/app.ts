import express from 'express';

import activityRouter from './routes/activty.route';
import catalogRouter from './routes/catalog.route';
import companyRouter from './routes/company.route';
import contactRouter from './routes/contact.route';
import daysOffRouter from './routes/days_off.route';
import daysOffStatusRouter from './routes/days_off_status.route';
import emergencyContactRouter from './routes/emergency_contact.route';
// import estimationCostRouter from './routes/estimation_cost.route';
import interactionRouter from './routes/interaction.route';
// import invoiceRouter from './routes/invoice.route';
import souceRouter from './routes/source.route';
import prospectStatusRouter from './routes/prospect_status.route';
import prospectRouter from './routes/prospect.route';
import projectRouter from './routes/project.route';
import projectStatusRouter from './routes/project_status.route';
import projectTypeRouter from './routes/project_type.route';
// import tvaRouter from './routes/tva.route';
import userRouter from './routes/user.route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Check if serveur is On
 */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from express !' });
});

/**
 * Route API pour l'entité Activity
 */
app.use('/api/activities', activityRouter);

/**
 * Route API pour l'entité Catalog
 */
app.use('/api/catalogs', catalogRouter);

/**
 * Route API pour l'entité Company
 */
app.use('/api/company', companyRouter);

/**
 * Route API pour l'entité Contact
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
 * Route API pour l'entité estimation_cost
 */
// app.use('/api/estimation-cost', estimationCostRouter);

/**
 * Route API pour l'entité Interaction
 */
app.use('/api/interactions', interactionRouter);

/**
 * Route API pour l'entité Invoice
 */
// app.use('/api/invoices', invoiceRouter);

/**
 * Route API pour l'entité Source
 */
app.use('/api/sources', souceRouter);

/**
 * Route API pour l'entité Prospect
 */
app.use('/api/prospects', prospectRouter);

/**
 * Route API pour l'entité Prospect_status
 */
app.use('/api/prospect-status', prospectStatusRouter);

/**
 * Route API pour l'entité Project
 */
 app.use('/api/projects', projectRouter);

/**
 * Route API pour l'entité Project_status
 */
 app.use('/api/projects-status', projectStatusRouter);

/**
 * Route API pour l'entité Project_type
 */
 app.use('/api/projects-types', projectTypeRouter);

/**
 * Route API pour l'entité Tva
 */
//  app.use('/api/tva', tvaRouter);

/**
 * Route API pour l'entité User
 */
app.use('/api/users', userRouter);

export default app;
