import { emailSchema } from '@/lib/validations/email';
import { z } from 'zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { signUpPageTestIds } from '@/utils/constants';
import { createUser } from '@/lib/actions/user.actions';
import { signIn } from 'next-auth/react';

interface EmailSignInProps {
  onEmailSubmit: (email: string) => void;
}

type EmailFormValues = z.infer<typeof emailSchema>;

const EmailSignup: React.FC<EmailSignInProps> = ({ onEmailSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const handleSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createUser({
        email: data.email,
        provider: 'email',
      });

      const result = await signIn('email', {
        email: data.email,
        redirect: false,
      });

      if (result?.error) {
        setError('Failed to send login email. Please try again.');
      } else {
        onEmailSubmit(data.email);
      }
    } catch (error) {
      console.error('Error during email signup:', error);
      setError('An unexpected error occured. Please try again.');
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className='w-72'>
      <form
        onSubmit={emailForm.handleSubmit(handleSubmit)}
        className='space-y-4'
      >
        <input 
          {...emailForm.register('email')}
          type='email'
          placeholder='Enter your email'
          className='w-full px-3 py-2 rounded-md text-color-primary-reverse focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400 font-inter text-body-xs'
        />
        {emailForm.formState.errors.email && (
          <p className='text-error-500 text-accent-xs'>{emailForm.formState.errors.email.message}</p>
        )}
        {error && (
          <p className='text-error-500 text-accent-xs'>{error}</p>
        )}
        <Button
          data-testid={signUpPageTestIds.emailContinueButton}
          type='submit'
          className='w-full mt-2 text-white transition-all bg-primary-600 hover:bg-primary-700'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}

export default EmailSignup