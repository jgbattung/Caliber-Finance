import BottomNav from "@/components/BottomNav/BottomNav"
import { bottomNavTestIds } from "@/utils/constants";
import { bottomNavRoutes } from "@/utils/NavigationRoutes/bottomNavRoutes";
import { render, screen } from "@testing-library/react"

const renderBottomNav = () => {
  render(<BottomNav />);
};

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Bottom Nav tests', () => {
  it('should display without crashing', () => {
    renderBottomNav();

    const bottomNav = screen.getByTestId(bottomNavTestIds.bottomNav);
    expect(bottomNav).toBeInTheDocument();
  });

  it('should display the correct icons', () => {
    renderBottomNav();

    bottomNavRoutes.forEach((route) => {
      const icon = screen.getByTestId(`icon-${route.iconId}`);
      expect(icon).toBeInTheDocument();
    });
  });

  it('should be hidden on large screen sizes', () => {
    renderBottomNav();

    const bottomNav = screen.getByTestId(bottomNavTestIds.bottomNav);
    expect(bottomNav).toHaveClass('lg:hidden');
  });
});