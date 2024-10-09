import SignIn from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import { signInPageTestIds } from "@/utils/constants";
import { render, screen } from "@testing-library/react";

const renderSignIn = () => {
  render(<SignIn />)
};

// Mock next/link component
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid={signInPageTestIds.redirectLink}>{children}</a>
  );
});

describe('Sign in page tests', () => {
  it('should render without crashing', () => {
    renderSignIn();

    const container = screen.getByTestId(signInPageTestIds.signInContainer);
    expect(container).toBeInTheDocument();
  });

  it('should display the logo and hero text', () => {
    renderSignIn();

    const logo = screen.getByTestId(signInPageTestIds.logo);
    const heroText = screen.getByText('Ready to take charge of your finances?');
    expect(logo).toBeInTheDocument();
    expect(heroText).toBeInTheDocument();
  });

  it.each([
    ['Continue with Facebook', signInPageTestIds.facebookButton],
    ['Continue with Google', signInPageTestIds.googleButton],
    ['Continue with Email', signInPageTestIds.emailButton]
  ])('should display the %s button', (buttonName, testId) => {
    renderSignIn();

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonName);
  });

  it('should have a redirect link to the sign-up page', () => {
    renderSignIn();

    const redirectLink = screen.getByTestId(signInPageTestIds.redirectLink);
    expect(redirectLink).toBeInTheDocument();
    expect(redirectLink).toHaveAttribute('href', '/sign-up');
    expect(redirectLink).toHaveTextContent('Register here.');
  });
});