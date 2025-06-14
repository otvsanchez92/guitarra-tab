import { TStore, useStore } from '@/store';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Scale = () => {
  const { scale }: TStore = useStore((state: any) => state);
  const { t } = useTranslation();

  return (
    <>
      <Typography fontWeight={'bold'} variant="overline">
     {t('scale.title')}
      </Typography>{' '}
      {scale
        .filter((item: string, index: number) => scale.indexOf(item) === index)
        .map(item => (
          <Typography key={item} variant="overline">{` ${item} `}</Typography>
        ))}
    </>
  );
};

export { Scale };
