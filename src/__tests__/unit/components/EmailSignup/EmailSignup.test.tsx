import EmailSignup from '@/components/EmailSignup/EmailSignup';
import { emailSignupTestIds } from '@/utils/constants';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { error } from 'console';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('@/lib/actions/user.actions', () => ({
  createUser: jest.fn(),
}));

const mockOnEmailSubmit = jest.fn();

const renderEmailSignup = () => {
  render(<EmailSignup onEmailSubmit={mockOnEmailSubmit} />);
};

describe('Email Signup tests', () => {
  renderEmailSignup();

  it('should render without crashing', () => {
    const signUpForm = screen.getByTestId(emailSignupTestIds.emailSignupForm);
    expect(signUpForm).toBeInTheDocument();
  });

  it('should render email field and submit button', () => {
    renderEmailSignup();
    
    const emailField = screen.getByTestId(emailSignupTestIds.emailField);
    const submitButton = screen.getByTestId(emailSignupTestIds.emailSubmitButton);
    expect(emailField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should call createUser and signIn with valid email', async () => {
    renderEmailSignup();

    const emailField = screen.getByTestId(emailSignupTestIds.emailField);
    const submitButton = screen.getByTestId(emailSignupTestIds.emailSubmitButton);

    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnEmailSubmit).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('should display an error message when the sign in fails', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: 'Some error' });

    renderEmailSignup();
    const emailField = screen.getByTestId(emailSignupTestIds.emailField);
    const submitButton = screen.getByTestId(emailSignupTestIds.emailSubmitButton);
  
    fireEvent.change(emailField, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to send login email. Please try again.')).toBeInTheDocument();
    })
  });
});