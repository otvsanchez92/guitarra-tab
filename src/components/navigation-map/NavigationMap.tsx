import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const StyledLink = styled(Link)<{ component?: string }>({
  color: '#9b59b6',
  textDecoration: 'none',
  underline: 'none',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 400,

  '&:hover': {
    color: '#8e44ad',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const Separator = styled(Typography)({
  color: '#9b59b6',
  margin: '0 8px',
});

const nameMap: Record<string, string> = {
  '': 'home.title',
  scales: 'scales.title',
  editor: 'editor.title',
  instruments: 'instruments.title',
  guitar: 'instruments.guitar',
  bass: 'instruments.bass',
  violin: 'instruments.violin',
  ukulele: 'instruments.ukulele',
  banjo: 'instruments.banjo',
  mandolin: 'instruments.mandolin',
  cavaquinho: 'instruments.cavaquinho',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumb: React.FC = () => {
  const { pathname, query } = useRouter();
  const { t } = useTranslation();

  const parts = pathname.split('/').filter(Boolean);

  const breadcrumbs = parts.map((_, index) => {
    const path = '/' + parts.slice(0, index + 1).join('/');
    const key = parts[index];
    
    // Se for um parâmetro dinâmico, use o valor do query
    if (key.startsWith('[') && key.endsWith(']')) {
      const paramName = key.slice(1, -1);
      const value = query[paramName];
      return { path, name: value || capitalize(paramName) };
    }
    
    const name = nameMap[key] || capitalize(key);
    return { path, name };
  });

  const fullBreadcrumbs = [{ path: '/', name: nameMap[''] }, ...breadcrumbs];

  return (
    <Box sx={{
      bgcolor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      p: 2
    }}>
      {fullBreadcrumbs.map((breadcrumb: { path: string; name: string | string[] }, index: number) => (
        <>
          {index > 0 && <Separator>/</Separator>}
          <StyledLink href={breadcrumb.path} passHref style={{color: index === fullBreadcrumbs.length - 1 ? '#9b59b6' : '#fff'}}>
              {t(breadcrumb.name)}
          </StyledLink>
        </>
      ))}
    </Box>
  );
};

export default Breadcrumb;
