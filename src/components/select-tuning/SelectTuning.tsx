import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TSelectTuningProps } from './type';
import { notes } from '@/utils/scales';
import { SelectContainer } from './style';

const SelectTuning = ({ onChange, value, key, position }: TSelectTuningProps) => (
  <SelectContainer key={key}>
    <Select
      labelId="select-tuning"
      id="select-tuning"
      value={value}
      onChange={(event: SelectChangeEvent) => onChange(event.target.value, position)}
      sx={{
        color: '#f0f0f0',
        bgcolor: '#1a1a1a',
        fontSize: 13,
        fontWeight: 700,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
        '& .MuiSvgIcon-root': { color: '#aaa' }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: '#1e1e1e',
            '& .MuiMenuItem-root': {
              color: '#fff',
              padding: '8px 16px',
              '&:hover': { bgcolor: '#2a2a2a' },
              '&.Mui-selected': { bgcolor: '#333', '&:hover': { bgcolor: '#3a3a3a' } }
            }
          }
        }
      }}
    >
      {notes.map((note: string) => (
        <MenuItem key={note} value={note}>
          {note}
        </MenuItem>
      ))}
    </Select>
  </SelectContainer>
);

export { SelectTuning };
