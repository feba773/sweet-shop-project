// src/tests/sweets.test.ts
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app'; // Your Express app
import User from '../models/User';
import Sweet from '../models/Sweet';

describe('/api/sweets', () => {
  let mongoServer: MongoMemoryServer;
  let adminToken: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create admin user and get token
    await request(app).post('/api/auth/register').send({ email: 'admin@test.com', password: 'password' });
    const adminUser = await User.findOne({ email: 'admin@test.com' });
    if(adminUser) {
        adminUser.role = 'ADMIN';
        await adminUser.save();
    }
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'password' });
    adminToken = res.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('DELETE /:id should delete a sweet for an admin user', async () => {
    const sweet = await new Sweet({ name: 'Deletable Candy', category: 'Test', price: 1, quantity: 1 }).save();
    
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Sweet removed');
  });
});