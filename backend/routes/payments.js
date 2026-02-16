import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import User from '../models/User.js';

const router = express.Router();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Crear preferencia de pago
router.post('/create-preference', async (req, res) => {
  try {
    const { toolId, toolName, price, userId, email } = req.body;

    const body = {
      items: [{
        id: toolId,
        title: toolName,
        description: `Acceso ilimitado a ${toolName}`,
        quantity: 1,
        unit_price: Number(price),
        currency_id: 'USD'
      }],
      payer: { email },
      back_urls: {
        success: `${process.env.CLIENT_URL}/payment/success`,
        failure: `${process.env.CLIENT_URL}/payment/failure`
      },
      auto_return: 'approved',
      external_reference: userId,
      notification_url: `${process.env.CLIENT_URL}/api/webhook/mercadopago`
    };

    const preference = await new Preference(client).create({ body });
    res.json({ preferenceId: preference.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar licencia
router.get('/check-license/:userId/:toolId', async (req, res) => {
  try {
    const { userId, toolId } = req.params;
    const user = await User.findById(userId);
    
    const hasLicense = user?.purchases.some(p => p.toolId === toolId) || false;
    res.json({ hasLicense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;