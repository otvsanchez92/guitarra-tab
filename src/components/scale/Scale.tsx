import { TStore, useStore } from '@/store';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Scale = () => {
  const { instruments }: TStore = useStore((state: any) => state);
  const { t } = useTranslation();

  return (
    <>
      <Typography fontWeight={'bold'} variant="overline">
     {t('scale.title')}
      </Typography>{' '}
      {instruments[0].scale
        .filter((item: string, index: number) => instruments[0].scale.indexOf(item) === index)
        .map(item => (
          <Typography key={item} variant="overline">{` ${item} `}</Typography>
        ))}
    </>
  );
};

export { Scale };
