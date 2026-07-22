import { Router } from 'express';
import { Setting } from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const settingsRouter = Router();

settingsRouter.get('/', asyncHandler(async (_req, res) => {
  // Carry the previous default brand forward for existing installations without
  // changing any administrator-selected custom name.
  const settings = await Setting.findOneAndUpdate({ siteName: 'SAS Academy' }, { siteName: 'Lexora' }, { new: true }) || await Setting.findOne() || await Setting.create({});
  res.json({
    success: true,
    settings: {
      siteName: settings.siteName,
      supportEmail: settings.supportEmail,
      contactPhone: settings.contactPhone,
      addressUrl: settings.addressUrl,
      instagramUrl: settings.instagramUrl,
      whatsappUrl: settings.whatsappUrl,
      youtubeUrl: settings.youtubeUrl,
      announcement: settings.announcement,
      maintenanceMode: settings.maintenanceMode
    }
  });
}));
