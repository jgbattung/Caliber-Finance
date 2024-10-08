import SignUp from "@/app/(auth)/sign-up/[[...sign-up]]/page";
import { landingPageTestsIds, signUpPageTestIds } from "@/utils/constants";
import { render, screen } from "@testing-library/react";

const renderSignUp = () => {
  render(<SignUp />)
}

describe('Sign up page tests', () => {
  it('should render without crashing', () => {
    renderSignUp();

    const container = screen.getByTestId(signUpPageTestIds.signUpContainer);
    expect(container).toBeInTheDocument();
  });

  it('should display the logo and hero text', () => {
    renderSignUp();

    const logo = screen.getByTestId(signUpPageTestIds.logo);
    const heroText = screen.getByText('Welcome to Caliber: Your path to financial precision.');
    expect(logo).toBeInTheDocument();
    expect(heroText).toBeInTheDocument();
  });

  it.each([
    ['Continue with Facebook', signUpPageTestIds.facebookButton],
    ['Continue with Google', signUpPageTestIds.googleButton],
    ['Continue with Email', signUpPageTestIds.emailButton]
  ])('should display the %s button', (buttonName, testId) => {
    renderSignUp();

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonName);
  });
});