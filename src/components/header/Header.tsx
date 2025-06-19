import { Toolbar } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, HeaderContainer, Logo } from './style';
import { LanguageSwitcher } from '../language-switcher';
import Image from 'next/image';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header>
      <HeaderContainer>
        <Toolbar>
          <Logo variant="h6">
            <Image src="/images/logo.svg" alt="logo" width={200} height={50} title="Maps Musical" />
          </Logo>
          <LanguageSwitcher />
        </Toolbar>
      </HeaderContainer>
      <Space />
    </header>
  );
};

export { Header };
