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

const StyledSelect = styled(Select)(() => ({
  '& .MuiSelect-select': {
    padding: '4px',
    minWidth: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiSelect-icon': {
    display: 'none', // oculta a seta
  },
}));

const LanguageIconWrapper = styled(Box)({
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
      disableUnderline
      input={<InputBase />}
      renderValue={() => (
        <LanguageIconWrapper>
          <LanguageIcon />
        </LanguageIconWrapper>
      )}
    >
      <MenuItem value="en">
        English
      </MenuItem>
      <MenuItem value="pt-BR">
        Português
      </MenuItem>
    </StyledSelect>
  );
};
