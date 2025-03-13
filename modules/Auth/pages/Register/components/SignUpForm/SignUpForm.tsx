import { SignUpSteps, useSignUpStore } from '@/store/useSignUpStore';
import { ReactNode, memo } from 'react';
import { NameStep } from './NameStep';
import { BirthStep } from './BirthStep';
import { CredentialsStep } from './CredentialsStep';
import { SignUpWrapper } from '@/modules/Auth/components';

const renderStep: Record<SignUpSteps, ReactNode> = {
  [SignUpSteps.NAME]: <NameStep />,
  [SignUpSteps.CREDENTIALS]: <CredentialsStep />,
  [SignUpSteps.BIRTH]: <BirthStep />,
};

const MemoizedSignUpWrapper = memo(({ children }: { children: ReactNode }) => {
  return <SignUpWrapper>{children}</SignUpWrapper>;
});

MemoizedSignUpWrapper.displayName = 'MemoizedSignUpWrapper';

export const SignUpForm = () => {
  const step = useSignUpStore((state) => state.step);

  return <MemoizedSignUpWrapper>{renderStep[step]}</MemoizedSignUpWrapper>;
};
