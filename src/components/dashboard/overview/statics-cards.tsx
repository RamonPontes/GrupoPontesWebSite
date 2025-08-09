import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { display } from '@mui/system';

export interface StaticsCardsProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export function StaticsCards({ diff, trend, sx, value, icon, title, color }: StaticsCardsProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title}
              </Typography>
              <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <Typography variant="h4">{value}</Typography>
                {diff ? (
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                      <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                      <Typography color={trendColor} variant="body2">
                        {diff}%
                      </Typography>
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
            <Avatar sx={{ backgroundColor: color, height: '56px', width: '56px' }}>
              {icon}
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
