import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import {
  Space,
  HeaderContainer,
  Logo,
  Navigation,
  NavButton,
  HeaderItems,
} from './style';
import { LanguageSwitcher } from '../language-switcher';
import Image from 'next/image';
import Link from 'next/link';
import {
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { LuMenu } from 'react-icons/lu';
import { Breadcrumb } from '../navigation-map';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuClose = () => setMobileMenuAnchor(null);

  const handleMenuClick = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <header>
      <HeaderContainer>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo e Navegação Desktop */}
          <HeaderItems>
            <Link href="/" title="NeckChart" style={{ textDecoration: 'none' }}>
              <Logo variant="h6">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={44}
                  height={50}
                  title="NeckChart"
                />
                <span style={{ fontFamily: 'Lilita One, sans-serif', fontSize: '1.5rem', letterSpacing: '0.02em' }}>
                  <span style={{ color: '#FFD700' }}>Neck</span>
                  <span style={{ color: '#9b59b6' }}>Chart</span>
                </span>
              </Logo>
            </Link>

            <Navigation sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <NavButton href="/scales" variant="text">
                {t('header.scales')}
              </NavButton>
              <NavButton href="/editor" variant="text">
                {t('header.editor')}
              </NavButton>
              <NavButton href="/instruments" variant="text">
                {t('header.instruments')}
              </NavButton>
            </Navigation>
          </HeaderItems>

          {/* Idioma + Menu Mobile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LanguageSwitcher />

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={(event: React.MouseEvent<HTMLElement>) => setMobileMenuAnchor(event.currentTarget)}
            >
              <LuMenu size={24} color="white" />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu suspenso mobile */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
            },
            '& .MuiMenuItem-root': {
              color: '#ffffff',
            },
          }}
        >
          <MenuItem onClick={() => handleMenuClick('/scales')}>
            {t('header.scales')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/editor')}>
            {t('header.editor')}
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('/instruments')}>
            {t('header.instruments')}
          </MenuItem>
        </Menu>
        <Breadcrumb />
      </HeaderContainer>
    </header>
  );
};
