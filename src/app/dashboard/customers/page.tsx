import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { Customer } from '@/types/customers';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    cpf: "123.456.789-00",
    created_at: "2025-08-09 10:00:00",
    created_by: 1,
    address: {
      id: 1,
      street: "Av. Brasil",
      number: "123",
      complement: "Apt 101",
      neighborhood: "Centro",
      city: "Ponta Grossa",
      state: "PR",
      cep: "84000-000",
      country: "Brazil",
      created_at: "2025-08-09 10:10:00",
      created_by: 1
    },
    contacts: [
      {
        id: 1,
        contact_type: 1,
        value: "+55 42 99999-9999",
        created_at: "2025-08-09 10:05:00",
        created_by: 1
      }
    ],
    vehicles: [
      {
        id: 1,
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        color: "Black",
        license_plate: "ABC-1234",
        mileage: "45000",
        new_column: 0,
        created_at: "2025-08-09 10:15:00",
        created_by: 1
      }
    ]
  },
  {
    id: 2,
    name: "Maria Silva",
    cpf: "987.654.321-00",
    created_at: "2025-08-08 14:20:00",
    created_by: 2,
    address: {
      id: 2,
      street: "Rua das Flores",
      number: "45",
      complement: "Casa",
      neighborhood: "Jardim América",
      city: "Curitiba",
      state: "PR",
      cep: "82000-000",
      country: "Brazil",
      created_at: "2025-08-08 14:25:00",
      created_by: 2
    },
    contacts: [
      {
        id: 2,
        contact_type: 2,
        value: "maria.silva@email.com",
        created_at: "2025-08-08 14:27:00",
        created_by: 2
      }
    ],
    vehicles: [
      {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2022,
        color: "White",
        license_plate: "XYZ-5678",
        mileage: "12000",
        new_column: 1,
        created_at: "2025-08-08 14:30:00",
        created_by: 2
      }
    ]
  },
  {
    id: 3,
    name: "Carlos Pereira",
    cpf: "111.222.333-44",
    created_at: "2025-08-07 09:15:00",
    created_by: 3,
    address: {
      id: 3,
      street: "Av. Sete de Setembro",
      number: "678",
      complement: "Sala 302",
      neighborhood: "Centro",
      city: "Londrina",
      state: "PR",
      cep: "86000-000",
      country: "Brazil",
      created_at: "2025-08-07 09:20:00",
      created_by: 3
    },
    contacts: [
      {
        id: 3,
        contact_type: 1,
        value: "+55 43 98888-7777",
        created_at: "2025-08-07 09:25:00",
        created_by: 3
      },
      {
        id: 4,
        contact_type: 2,
        value: "carlos.pereira@email.com",
        created_at: "2025-08-07 09:27:00",
        created_by: 3
      }
    ],
    vehicles: [
      {
        id: 3,
        make: "Ford",
        model: "Ranger",
        year: 2019,
        color: "Blue",
        license_plate: "JKL-9012",
        mileage: "78000",
        new_column: 0,
        created_at: "2025-08-07 09:30:00",
        created_by: 3
      }
    ]
  },
  {
    id: 4,
    name: "Ana Costa",
    cpf: "555.666.777-88",
    created_at: "2025-08-06 16:40:00",
    created_by: 4,
    address: {
      id: 4,
      street: "Rua das Palmeiras",
      number: "22B",
      complement: "",
      neighborhood: "Boa Vista",
      city: "Maringá",
      state: "PR",
      cep: "87000-000",
      country: "Brazil",
      created_at: "2025-08-06 16:45:00",
      created_by: 4
    },
    contacts: [
      {
        id: 5,
        contact_type: 1,
        value: "+55 44 97777-6666",
        created_at: "2025-08-06 16:50:00",
        created_by: 4
      }
    ],
    vehicles: [
      {
        id: 4,
        make: "Chevrolet",
        model: "Onix",
        year: 2021,
        color: "Red",
        license_plate: "MNO-3456",
        mileage: "23000",
        new_column: 1,
        created_at: "2025-08-06 16:55:00",
        created_by: 4
      }
    ]
  }
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Clientes</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Novo
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
