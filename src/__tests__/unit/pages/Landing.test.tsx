/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Landing from "@/app/(marketing)/page";
import { landingPageTestsIds } from "@/utils/constants";
import { render, screen } from "@testing-library/react";

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...rest }: any) => <a {...rest}>{children}</a>
}));

const renderLanding = () => {
  return render(<Landing />)
};

describe('Landing page tests', () => {
  it('should render without crashing', () => {
    renderLanding();

    const mainContainer = screen.getByTestId(landingPageTestsIds.mainContainer);
    const heroText = screen.getByText('Precision finance for a powerful future');
    expect(mainContainer).toBeInTheDocument();
    expect(heroText).toBeInTheDocument();
  });

  it('should display the logo', () => {
    renderLanding();

    const logo = screen.getByTestId(landingPageTestsIds.logo);
    expect(logo).toBeInTheDocument();
  });

  it('displays the Login button', () => {
    renderLanding();

    const loginButton = screen.getByTestId(landingPageTestsIds.loginButton);
    expect(loginButton).toBeInTheDocument();
  });

  it('displays the Register button', () => {
    renderLanding();

    const registerButton = screen.getByTestId(landingPageTestsIds.registerButton);
    expect(registerButton).toBeInTheDocument();
  });
});