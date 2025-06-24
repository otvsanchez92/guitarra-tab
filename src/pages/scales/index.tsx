import { Container, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ScaleCard } from '@/components/scales/ScaleCard';
import { commonScales } from '@/data/scalesData';
import { Typography } from '@mui/material';
import { PageLayout } from '@/components/common/PageLayout';

export default function ScalesPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleScaleClick = (scale: any) => {
    router.push({
      pathname: '/editor',
      query: {
        scale: scale.name,
        notes: scale.notes.join(',')
      }
    });
  };

  return (
<PageLayout title={t('scales.title')}>
   
        <Grid container spacing={4}>
          {commonScales.map(scale => (
            <Grid item xs={12} sm={6} md={4} key={scale.id}>
              <ScaleCard scale={scale} onClick={() => handleScaleClick(scale)} />
            </Grid>
          ))}
        </Grid>
        </PageLayout>
  );
}
