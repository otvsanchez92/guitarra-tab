import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Color, ConfigContainer, ConfigBar, ConfigTitle } from './style';
import { Undo, Clear, Edit, Save, Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TConfigProps } from './types';

interface ConfigProps extends TConfigProps {}

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
  children
}: ConfigProps) => {
  const [strings, setStrings] = useState('6');
  const [colors, setColor] = useState('red');
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setStrings(value as string);
    onChangeNumberStrings(Number(value));
  };

  const handleChangeFrets = (event: SelectChangeEvent) => {
    const value = event.target.value;
    changeFrets(Number(value));
  };

  const colorsArray = [
    { value: 'red', label: t('colors.red'), color: 'red' },
    { value: 'blue', label: t('colors.blue'), color: 'blue' },
    { value: 'green', label: t('colors.green'), color: 'green' },
    { value: 'orange', label: t('colors.orange'), color: 'orange' },
    { value: 'purple', label: t('colors.purple'), color: 'purple' }
  ];

  const handleChangeColor = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setColor(value);
    onChangeColor(value);
  };

  return (
    <ConfigContainer>
      {children}

      <ConfigBar>
        <ConfigTitle>{t('config.controls')}:</ConfigTitle>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              {/* Grupo de ações */}
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Button 
                      onClick={clearNotes} 
                      title={t('config.clear')} 
                      variant="contained"
                      startIcon={<Clear />}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        minWidth: 120,
                        backgroundColor: '#ff4444',
                        '&:hover': {
                          backgroundColor: '#ff3333'
                        }
                      }}
                    >
                      {t('config.clear')}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      disabled={actives.length < 0} 
                      onClick={clearNote} 
                      title={t('config.undo')} 
                      variant="contained"
                      startIcon={<Undo />}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        minWidth: 120,
                        backgroundColor: '#4a90e2',
                        '&:hover': {
                          backgroundColor: '#357abd'
                        }
                      }}
                    >
                      {t('config.undo')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Grupo de configurações */}
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="select-colors" sx={{ textTransform: 'none' }}>
                        {t('config.color')}
                      </InputLabel>
                      <Select
                        labelId="select-colors"
                        id="colors-select"
                        value={colors}
                        label={t('config.color')}
                        onChange={handleChangeColor}
                        sx={{
                          borderRadius: 2,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      >
                        {colorsArray.map((color) => (
                          <MenuItem key={color.value} value={color.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Color style={{ backgroundColor: color.color, borderRadius: '50%', width: 16, height: 16 }} />
                              <span>{color.label}</span>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      onClick={copyScale} 
                      title={t('config.copyScale')} 
                      variant="contained"
                      startIcon={<Download />}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        minWidth: 120,
                        backgroundColor: '#2ecc71',
                        '&:hover': {
                          backgroundColor: '#27ae60'
                        }
                      }}
                    >
                      {t('config.copyScale')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ConfigBar>

      <ConfigBar>
        <ConfigTitle>{t('config.settings')}:</ConfigTitle>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-frets" sx={{ textTransform: 'none' }}>
                {t('config.frets')}
              </InputLabel>
              <Select
                labelId="select-frets"
                id="frets-select"
                value={frets.toString()}
                label={t('config.frets')}
                onChange={handleChangeFrets}
                defaultValue="24"
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              >
                <MenuItem value={'24'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>24</span>
                  </Box>
                </MenuItem>
                <MenuItem value={'12'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>12</span>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-strings" sx={{ textTransform: 'none' }}>
                {t('config.strings')}
              </InputLabel>
              <Select
                labelId="select-strings"
                id="strings-select"
                value={strings.toString()}
                label={t('config.strings')}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              >
                <MenuItem value={'7'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>7</span>
                  </Box>
                </MenuItem>
                <MenuItem value={'6'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>6</span>
                  </Box>
                </MenuItem>
                <MenuItem value={'5'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>5</span>
                  </Box>
                </MenuItem>
                <MenuItem value={'4'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>4</span>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button 
              onClick={changeTuning} 
              title={t('config.editTuning')}
              variant="contained"
              size="small"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                minWidth: 120
              }}
            >
              {editTuning ? (
                <>
                  <Save sx={{ mr: 1 }} /> {t('config.saveTuning')}
                </>
              ) : (
                <>
                  <Edit sx={{ mr: 1 }} /> {t('config.editTuning')}
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </ConfigBar>
    </ConfigContainer>
  );
};

export default Config;
