import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import tenantRoutes from './routes/tenants.js';
import adminRoutes from './routes/admin.js';
import eventsRoutes from './routes/events.js';

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "https://coldi-assessments-v4yn-m7vxxcqzw-octers-projects.vercel.app",
//       "https://unexonerative-merilyn-emulatively.ngrok-free.dev"
//     ],
//     credentials: true,
//   })
// );
app.use(express.json());

app.get('/', (req, res) => res.send('Coldi backend up'));

app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/tenant', tenantRoutes);
app.use('/admin', adminRoutes);

app.get('/healthz', (req, res) => res.json({ ok: true }));

export default app;
