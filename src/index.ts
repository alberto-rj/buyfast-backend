import { PORT, NODE_ENV } from './config';
import { app } from './app';

app.listen(PORT, () => {
  try {
    console.log(
      `🚀 Server is running at http://localhost:${PORT} in "${NODE_ENV}" mode.`,
    );
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
