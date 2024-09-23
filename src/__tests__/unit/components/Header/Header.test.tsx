import Header from "@/components/Header/Header";
import { headerTestIds } from "@/utils/constants";
import { render, screen } from '@testing-library/react';

const renderHeader = () => {
  return render(<Header />)
};

describe('Header component tests', () => {
  it('should display without crashing', () => {
    renderHeader();

    const header = screen.getByTestId(headerTestIds.header);
    expect(header).toBeInTheDocument();
  });

  it('should display the greeting', () => {
    renderHeader();

    const greeting = screen.getByText('Good evening,');
    expect(greeting).toBeInTheDocument();
  });

  it('should display the notification bell icon', () => {
    renderHeader();

    const notificationBell = screen.getByTestId(headerTestIds.notificationBell);
    expect(notificationBell).toBeInTheDocument();
  });

  it('should display the user profile icon', () => {
    renderHeader();

    const userProfileIcon = screen.getByTestId(headerTestIds.userProfileIcon);
    expect(userProfileIcon).toBeInTheDocument();
  });

  it('should be hidden on large screen sizes', () => {
    renderHeader();

    const header = screen.getByTestId(headerTestIds.header);
    expect(header).toHaveClass('lg:hidden')
  });
});