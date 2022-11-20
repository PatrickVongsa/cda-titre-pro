import express from 'express';

// import piste_statusRouter from './routes/piste_status.route';
// import souceRouter from './routes/source.route';
import activityRouter from './routes/activty.route';
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
 * Route API pour l'entié Activity
 */
app.use('/api/activities', activityRouter);

// app.use('/api/piste_status', piste_statusRouter);
// app.use('/api/sources', souceRouter);
// app.use('/api/pistes', pisteRouter);
// app.use('/api/contacts', contactRouter);
// app.use('/api/interactions', interactionRouter);

export default app;
