import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { config } from '@/config';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { StaticsCards } from '@/components/dashboard/overview/statics-cards';
import { AlarmIcon, UsersIcon } from '@phosphor-icons/react/dist/ssr';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

type StaticCardProps = {
  diff?: number;
  trend: 'up' | 'down';
  value: string;
  title: string;
  icon: React.ReactNode;
  color: string
};


const statics: StaticCardProps[] = [
  {
    diff: 10,
    trend: 'up',
    value: "12.345",
    title: "Clientes",
    icon: <UsersIcon fontSize="var(--icon-fontSize-lg)" />,
    color: 'var(--mui-palette-success-main)'
  },
  {
    diff: 0.5,
    trend: 'down',
    value: "54.321",
    title: "Total OS",
    icon: <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />,
    color: 'var(--mui-palette-info-main)'
  },
  {
    diff: 1,
    trend: 'up',
    value: "7",
    title: "Ordens pendentes",
    icon: <AlarmIcon fontSize="var(--icon-fontSize-lg)" />,
    color: 'var(--mui-palette-error-main)'
  },
  {
    diff: 253,
    trend: 'up',
    value: "R$ 532",
    title: "Receita hoje",
    icon: <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />,
    color: 'var(--mui-palette-primary-main)'
  }
];

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      {statics.map((staticItem, index) => (
        <Grid
          key={index}
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <StaticsCards
            diff={staticItem.diff}
            trend={staticItem.trend}
            sx={{ height: '100%' }}
            value={staticItem.value}
            title={staticItem.title}
            icon={staticItem.icon}
            color={staticItem.color}
          />
        </Grid>
      ))}

      <Grid
        size={{
          lg: 8,
          xs: 12,
        }}
      >
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 8,
          md: 12,
          xs: 12,
        }}
      >
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
