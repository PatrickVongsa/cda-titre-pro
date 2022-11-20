import * as dotenv from 'dotenv';

import app from './src/app';

dotenv.config();

const PORT: string = (process.env.PORT as string) || '8000';

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
