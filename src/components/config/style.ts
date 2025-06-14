import styled from 'styled-components';
import { Typography } from '@mui/material';

export const Color = styled.div`
  width: 100%;
  height: 16px;
`;

export const ConfigContainer = styled.div`
  margin: 22px auto 32px auto;
  diplay: flex;
`;

export const ConfigBar = styled.div`
  margin: 16px auto;

  p {
    margin-bottom: 8px;
  }
`;

export const ConfigTitle = styled(Typography)`
  margin: 16px auto;
`;
