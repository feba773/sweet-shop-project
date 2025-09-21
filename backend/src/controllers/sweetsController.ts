// src/controllers/sweetsController.ts
import { Request, Response } from 'express';
import Sweet from '../models/Sweet';

// @desc    Add a new sweet
// @route   POST /api/sweets
// @access  Private
export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Please provide name, category, and price' });
    }

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity,
    });

    const createdSweet = await sweet.save();
    res.status(201).json(createdSweet);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find({});
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single sweet by ID
// @route   GET /api/sweets/:id
// @access  Public
export const getSweetById = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
      res.status(200).json(sweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
      sweet.name = name || sweet.name;
      sweet.category = category || sweet.category;
      sweet.price = price || sweet.price;
      sweet.quantity = quantity ?? sweet.quantity; // Use ?? to allow setting quantity to 0

      const updatedSweet = await sweet.save();
      res.status(200).json(updatedSweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// Add this to the end of src/controllers/sweetsController.ts

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
      await Sweet.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Sweet removed' });
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// Add this to the end of src/controllers/sweetsController.ts

// @desc    Search for sweets
// @route   GET /api/sweets/search
// @access  Public
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice); // Greater than or equal to
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice); // Less than or equal to
      }
    }

    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// Add these to the end of src/controllers/sweetsController.ts

// @desc    Purchase a sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity > 0) {
      sweet.quantity -= 1;
      await sweet.save();
      res.status(200).json({ message: 'Purchase successful', sweet });
    } else {
      res.status(400).json({ message: 'Out of stock' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Restock a sweet
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid amount to restock' });
    }

    sweet.quantity += amount;
    const updatedSweet = await sweet.save();
    res.status(200).json({ message: 'Restock successful', sweet: updatedSweet });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};