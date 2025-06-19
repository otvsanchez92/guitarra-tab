import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  MenuItem,
  styled,
  InputBase,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
  '& .MuiSelect-icon': {
    color: 'white', // seta branca
    right: 8,        // posicionamento interno
  },
}));

const LanguageIconWrapper = styled(Box)({
  color: 'white',
  fontSize: '1.2rem',
});

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value; 
    i18n.changeLanguage(language);
  };

  return (
    <StyledSelect
      value={i18n.language}
      onChange={handleLanguageChange as any}
      sx={{ minWidth: 120, height: 40 }}
      disableUnderline
      input={<InputBase />}
    >
      <MenuItem
        value="en"
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LanguageIconWrapper>
          <LanguageIcon />
        </LanguageIconWrapper>
        en
      </MenuItem>
      <MenuItem
        value="pt-BR"
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LanguageIconWrapper>
          <LanguageIcon />
        </LanguageIconWrapper>
        pt-BR
      </MenuItem>
    </StyledSelect>
  );
};
