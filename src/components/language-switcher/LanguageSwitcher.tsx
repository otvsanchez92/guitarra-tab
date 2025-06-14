import { useTranslation } from 'react-i18next';
import { Select, MenuItem, InputBase } from '@mui/material';
import { useState } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChange = (event: any) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      size="small"
      sx={{
        minWidth: '120px',
        '& .MuiSelect-select': {
          padding: '6px 12px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)'
          }
        }
      }}
      IconComponent={() => <span style={{ color: 'white' }}>▼</span>}
      disableUnderline
      input={<InputBase />}
    >
      <MenuItem
        value="en"
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }
        }}
      >
        English
      </MenuItem>
      <MenuItem
        value="pt-BR"
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          }
        }}
      >
        Português
      </MenuItem>
    </Select>
  );
};
