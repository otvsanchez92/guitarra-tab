import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip
} from '@mui/material';
import {
  Undo,
  DeleteOutline,
  Edit,
  Save,
  FileDownload,
  AddBox
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TConfigProps } from './types';
import { ConfigContainer, Toolbar, ColorDot } from './style';

interface ConfigProps extends TConfigProps {
  addInstrument: () => void;
}

const Config: React.FC<ConfigProps> = ({
  onChangeNumberStrings,
  onChangeColor,
  clearNotes,
  clearNote,
  changeTuning,
  actives,
  editTuning,
  copyScale,
  changeFrets,
  frets,
  children,
  addInstrument
}) => {
  const [strings, setStrings] = useState('6');
  const [color, setColor] = useState('red');
  const { t } = useTranslation();

  const colorsArray = [
    { value: 'red', label: t('colors.red') },
    { value: 'blue', label: t('colors.blue') },
    { value: 'green', label: t('colors.green') },
    { value: 'orange', label: t('colors.orange') },
    { value: 'purple', label: t('colors.purple') }
  ];

  const colorMap: Record<string, string> = {
    red: '#e74c3c',
    blue: '#3498db',
    green: '#2ecc71',
    orange: '#e67e22',
    purple: '#9b59b6'
  };

  const handleStringsChange = (e: SelectChangeEvent) => {
    setStrings(e.target.value);
    onChangeNumberStrings(Number(e.target.value));
  };

  const handleFretsChange = (e: SelectChangeEvent) => {
    changeFrets(Number(e.target.value));
  };

  const handleColorChange = (e: SelectChangeEvent) => {
    setColor(e.target.value);
    onChangeColor(e.target.value);
  };

  return (
    <ConfigContainer>
      {children}

      <Toolbar>
        {/* Ações */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={t('config.clear')}>
            <IconButton
              onClick={clearNotes}
              size="small"
              sx={{ color: '#e74c3c', '&:hover': { bgcolor: 'rgba(231,76,60,0.12)' } }}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('config.undo')}>
            <span>
              <IconButton
                onClick={clearNote}
                disabled={actives.length === 0}
                size="small"
                sx={{ color: '#aaa', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                <Undo />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={editTuning ? t('config.saveTuning') : t('config.editTuning')}>
            <IconButton
              onClick={changeTuning}
              size="small"
              sx={{
                color: editTuning ? '#2ecc71' : '#aaa',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
              }}
            >
              {editTuning ? <Save /> : <Edit />}
            </IconButton>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: '#333' }} />

        {/* Seletores */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel sx={{ fontSize: 12 }}>{t('config.strings')}</InputLabel>
            <Select
              value={strings}
              label={t('config.strings')}
              onChange={handleStringsChange}
              sx={{ fontSize: 13, borderRadius: 1.5 }}
            >
              {['4', '5', '6', '7'].map(n => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel sx={{ fontSize: 12 }}>{t('config.frets')}</InputLabel>
            <Select
              value={frets.toString()}
              label={t('config.frets')}
              onChange={handleFretsChange}
              sx={{ fontSize: 13, borderRadius: 1.5 }}
            >
              <MenuItem value="12">12</MenuItem>
              <MenuItem value="24">24</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel sx={{ fontSize: 12 }}>{t('config.color')}</InputLabel>
            <Select
              value={color}
              label={t('config.color')}
              onChange={handleColorChange}
              sx={{ fontSize: 13, borderRadius: 1.5 }}
              renderValue={val => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ColorDot style={{ backgroundColor: colorMap[val] }} />
                  {colorsArray.find(c => c.value === val)?.label}
                </Box>
              )}
            >
              {colorsArray.map(c => (
                <MenuItem key={c.value} value={c.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ColorDot style={{ backgroundColor: colorMap[c.value] }} />
                    {c.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: '#333' }} />

        {/* Ações secundárias */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={t('config.addInstrument')}>
            <IconButton
              onClick={addInstrument}
              size="small"
              sx={{ color: '#9b59b6', '&:hover': { bgcolor: 'rgba(155,89,182,0.12)' } }}
            >
              <AddBox />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('config.download')}>
            <IconButton
              onClick={copyScale}
              size="small"
              sx={{ color: '#2ecc71', '&:hover': { bgcolor: 'rgba(46,204,113,0.12)' } }}
            >
              <FileDownload />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </ConfigContainer>
  );
};

export default Config;
