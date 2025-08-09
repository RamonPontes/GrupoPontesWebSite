'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import { Customer, CustomerContact } from '@/types/customers';
import { EnvelopeIcon, PencilLineIcon, PhoneCallIcon, TrashIcon } from '@phosphor-icons/react/dist/ssr';
import { alignItems } from '@mui/system';
import { Button, IconButton, OutlinedInput } from '@mui/material';

function noop(): void {
  // do nothing
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell align='center'>Veículos</TableCell>
              <TableCell align='center'>OSs</TableCell>
              <TableCell align='center'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '0' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.id.toString().padStart(4, '0')}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '0' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                      {row.address.city}, {row.address.state}, {row.address.country}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const phone = row.contacts.find((c: CustomerContact) => c.contact_type === 1);
                      const email = row.contacts.find((c: CustomerContact) => c.contact_type !== 1);
                      return (
                        <>
                          {phone && (
                            <Stack key={phone.id} sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
                              <PhoneCallIcon fontSize="var(--icon-fontSize-md)" />
                              {phone.value}
                            </Stack>
                          )}
                          {email && (
                            <Stack key={email.id} sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
                              <EnvelopeIcon fontSize="var(--icon-fontSize-md)" />
                              {email.value}
                            </Stack>
                          )}
                        </>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    {row.cpf}
                  </TableCell>
                  <TableCell align='center'>
                    {row.vehicles.length}
                  </TableCell>
                  <TableCell align='center'>
                    1 {/* ALterar */}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label="delete" size="medium">
                      <TrashIcon fontSize="var(--icon-fontSize-md)" />
                    </IconButton>
                    <IconButton aria-label="edit" size="medium">
                      <PencilLineIcon fontSize="var(--icon-fontSize-md)" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
