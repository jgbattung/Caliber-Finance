const clientPromise = Promise.resolve({
  db: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockResolvedValue(null),
  insertOne: jest.fn().mockResolvedValue({ insertedId: 'some-id' }),
});

export default clientPromise;