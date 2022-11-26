import express from 'express';

import activityRouter from './routes/activty.route';
import souceRouter from './routes/source.route';
import prospect_statusRouter from './routes/prospect_status.route';
// import pisteRouter from './routes/piste.route';
// import contactRouter from './routes/contact.route';
// import interactionRouter from './routes/interaction.route';

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
 * Route API pour l'entité Source
 */
app.use('/api/sources', souceRouter);

/**
 * Route API pour l'entité Prospect_status
 */
app.use('/api/prospect-status', prospect_statusRouter);


// app.use('/api/pistes', pisteRouter);
// app.use('/api/contacts', contactRouter);
// app.use('/api/interactions', interactionRouter);

export default app;
