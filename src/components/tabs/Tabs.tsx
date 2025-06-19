import { TTabsProps } from './types';
import { TabContainer } from './style';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Tabs = ({ notes, tuning, strings }: TTabsProps) => {
  const { t } = useTranslation();

  const lines: Record<number, (string | React.ReactNode)[]> = {};

  for (let i = 0; i < strings; i++) {
    lines[i] = [];
  }

  notes.forEach(({ x, y, color }) => {
    for (let i = 0; i < strings; i++) {
      if (i === y) {
        lines[i].push(
          <span key={lines[i].length} style={{ color, minWidth: '3ch', display: 'inline-block' }}>
            {x.toString().padEnd(3, '-')}
          </span>
        );
      } else {
        lines[i].push(
          <span key={lines[i].length} style={{ color: 'inherit', minWidth: '3ch', display: 'inline-block' }}>
            {'---'}
          </span>
        );
      }
    }
  });

  return (
    <TabContainer>
      <Typography fontWeight="bold" variant="overline">
        {t('tabs.title')}
      </Typography>

      {tuning.slice(0, strings).map((note, index) => (
        <Typography
          key={index}
          component="div"
          sx={{
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            display: 'flex',
            gap: 0.5
          }}
        >
          <span style={{ minWidth: '2ch' }}>{`${note.padEnd(2)}|`}</span>
          {lines[index]}
        </Typography>
      ))}
    </TabContainer>
  );
};

export { Tabs };
