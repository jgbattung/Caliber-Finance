import RightSidebar from "@/components/RightSidebar/RightSidebar";
import { rightSidebarTestIds } from "@/utils/constants";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const renderRightSidebar = () => {
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });
  render(<RightSidebar />);
};

describe('Right Sidebar tests', () => {
  it('should display without crashing', () => {
    renderRightSidebar();

    const rightSidebar = screen.getByTestId(rightSidebarTestIds.rightSidebar);
    expect(rightSidebar).toBeInTheDocument();
  });

  it('should display the user icon', () => {
    renderRightSidebar();

    const userIcon = screen.getByTestId(rightSidebarTestIds.userIcon);
    expect(userIcon).toBeInTheDocument();
  });
});