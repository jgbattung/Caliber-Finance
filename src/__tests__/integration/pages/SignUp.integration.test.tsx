import SignUp from '@/app/(auth)/sign-up/[[...sign-up]]/page';
import { signUpPageTestIds } from '@/utils/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { signIn } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

const renderSignUp = () => {
  render(<SignUp />)
};


describe('Sign Up page integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['facebook', signUpPageTestIds.facebookButton],
    ['google', signUpPageTestIds.googleButton]
  ])('should call signIn with correct provider when %s button is clicked', async (provider, testId) => {
    renderSignUp();

    const button = screen.getByTestId(testId);
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith(provider, { callbackUrl: '/dashboard' });
  });
});