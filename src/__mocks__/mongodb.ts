/* eslint-disable @typescript-eslint/no-explicit-any */
const mongodb = jest.createMockFromModule('mongodb') as any;

   mongodb.MongoClient = {
     connect: jest.fn().mockResolvedValue({
       db: jest.fn().mockReturnThis(),
       collection: jest.fn().mockReturnThis(),
       findOne: jest.fn().mockResolvedValue(null),
       insertOne: jest.fn().mockResolvedValue({ insertedId: 'some-id' }),
     }),
   };

   export default mongodb;