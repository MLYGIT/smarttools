import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();

// Seguridad
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SmartTools API funcionando' });
});

// Webhook MercadoPago
app.post('/api/webhook/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const payment = await fetch(
        `https://api.mercadopago.com/v1/payments/${data.id}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
          }
        }
      ).then(r => r.json());

      if (payment.status === 'approved') {
        const userId = payment.external_reference;
        const toolId = payment.additional_info.items[0].id;
        const toolName = payment.additional_info.items[0].title;
        
        const licenseKey = `SMART-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        await mongoose.model('User').findByIdAndUpdate(userId, {
          $push: {
            purchases: {
              toolId,
              toolName,
              licenseKey,
              amount: payment.transaction_amount,
              purchasedAt: new Date(),
              paymentId: payment.id
            }
          }
        });
      }
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

// Conectar DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB error:', err));