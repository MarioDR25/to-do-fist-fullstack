import express, { Application } from 'express';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 3000;

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});