/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as any

jest.mock('mongoose', () => ({
  Schema: function() {
    return {
      methods: {},
      index: jest.fn(),
    }
  },
  model: jest.fn().mockReturnValue({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }),
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
  },
}))