/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose = jest.createMockFromModule('mongoose') as any;

mongoose.Schema = function(this: any) {
  this.pre = jest.fn();
  return {
    pre: jest.fn(),
    index: jest.fn(),
  };
};

mongoose.model = jest.fn().mockReturnValue({});
mongoose.models = {};

export default mongoose;