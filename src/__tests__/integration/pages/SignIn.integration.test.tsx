import SignIn from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import { signInPageTestIds } from "@/utils/constants";
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

const renderSignIn = () => {
  render(<SignIn />)
}

describe('Sign In page integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['facebook', signInPageTestIds.facebookButton],
    ['google', signInPageTestIds.googleButton]
  ])('should call signIn with correct provider when %s button is clicked', async (provider, testId) => {
    renderSignIn();

    const button = screen.getByTestId(testId);
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith(provider, { callbackUrl: '/dashboard' } );
  });
});