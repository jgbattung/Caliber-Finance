import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { leftSidebarTestIds } from "@/utils/constants";
import { sidebarMainMenuLinks, sidebarQuickActions } from "@/utils/Sidebar/sidebarUtils";
import { render, screen } from "@testing-library/react";

const renderLeftSidebar = () => {
  render(<LeftSidebar />);
};

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Left Sidebar tests', () => {
  it('should display without crashing', () => {
    renderLeftSidebar();

    const leftSidebar = screen.getByTestId(leftSidebarTestIds.leftSidebar);
    expect(leftSidebar).toBeInTheDocument();
  });

  it('should only be visible in larger screens and above', () => {
    renderLeftSidebar();

    const leftSidebar = screen.getByTestId(leftSidebarTestIds.leftSidebar);
    expect(leftSidebar).toHaveClass('max-lg:hidden');
  });

  describe('Quick actions tests', () => {
  
    it('should display the correct buttons, icons, and text for the quick actions', () => {
      renderLeftSidebar();
  
      sidebarQuickActions.forEach((action) => {
        const button = screen.getByTestId(action.buttonId);
        const icon = screen.getByTestId(`icon-${action.buttonId}`);
        const text = screen.getByTestId(action.text);
  
        expect(button).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(text).toBeInTheDocument();
      });
    });
  });

  describe('Main menu tests', () => {
    it('should display the correct link, icons, and text for the main menu', () => {
      renderLeftSidebar();

      sidebarMainMenuLinks.forEach((link) => {
        const buttonLink = screen.getByTestId(link.buttonId);
        const icon = screen.getByTestId(`icon-${link.buttonId}`);
        const text = screen.getByTestId(link.text);

        expect(buttonLink).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(text).toBeInTheDocument();
      });
    });
  });
});