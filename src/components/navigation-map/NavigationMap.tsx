import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const StyledLink = styled(Link)({
  color: '#9b59b6',
  textDecoration: 'none',
  '&:hover': {
    color: '#FFD700',
  },
});

const Separator = styled(Typography)({
  color: '#9b59b6',
  margin: '0 8px',
});

const nameMap: Record<string, string> = {
  '': 'Home',
  scales: 'scales',
  editor: 'editor',
  instruments: 'instruments',
  guitar: 'guitar',
  bass: 'bass',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumb: React.FC = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  const parts = pathname.split('/').filter(Boolean);

  const breadcrumbs = parts.map((_, index) => {
    const path = '/' + parts.slice(0, index + 1).join('/');
    const key = parts[index];
    const name = nameMap[key] || capitalize(key);
    return { path, name };
  });

 
  const fullBreadcrumbs = [{ path: '/', name: nameMap[''] }, ...breadcrumbs];


  if(fullBreadcrumbs.length === 1) {
    return null;
  }

  return (
    <Box sx={{
      bgcolor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      p: 2,
      display: 'flex',
      alignItems: 'center'
    }}>
      {fullBreadcrumbs.map((breadcrumb, index) => (
        <Typography key={breadcrumb.path}>
        <React.Fragment>
          {index > 0 && <Separator>/</Separator>}
          <StyledLink href={breadcrumb.path}>
            {t(breadcrumb.name)}
          </StyledLink>
        </React.Fragment>
        </Typography>
      ))}
    </Box>
  );
};

export default Breadcrumb;
