import { Request, Response } from 'express';
import Url from '../models/url'; 
import validUrl from 'valid-url';
import shortid from 'shortid';
import mongoose from 'mongoose';

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { longUrl, customSlug, userId } = req.body;
    const baseUrl = 'https://short.ly';

    // Validate the long URL...
    const validUrl = ensureValidUrl(longUrl);
    if (!validUrl) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Check if a custom slug is provided and not already taken
    let urlCode = customSlug;
    if (customSlug) {
      const existing = await Url.findOne({ urlCode: customSlug });
      if (existing) {
        return res.status(400).json({ error: 'Slug already in use' });
      }
    } else {
      // Generate a unique slug if a custom one isn't provided
      urlCode = shortid.generate();
    }

    const shortUrl = `${baseUrl}/${urlCode}`;

    // Save the new URL with the custom or generated slug
    const newUrl = new Url({
      longUrl,
      shortUrl,
      urlCode,
      ...(userId && { user: userId }),
    });

    await newUrl.save();
    res.json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};




export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid or missing user ID' });
    }

    const urls = await Url.find({ user: userId });
    res.json(urls);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
function ensureValidUrl(url:string) {
  try {
    // Check if the URL has a scheme. If not, prepend "http://"
    const hasScheme = /^https?:\/\//i.test(url);
    const completeUrl = hasScheme ? url : `http://${url}`;
    new URL(completeUrl);
    return completeUrl; // Return the modified URL if it's valid
  } catch (error) {
    return error;
  }
}