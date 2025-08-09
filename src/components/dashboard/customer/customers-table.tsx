'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Customer, CustomerContact } from '@/types/customers';
import { EnvelopeIcon, PencilLineIcon, PhoneCallIcon, TrashIcon } from '@phosphor-icons/react/dist/ssr';
import { IconButton } from '@mui/material';
import { CustomersForm } from './customers-form';

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

  const [formOpen, setFormOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState<Customer | undefined>(undefined);

  const handleEdit = (row: Customer) => {
    setCustomer(row);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setCustomer(undefined);
  };

  return (
    <>
      <CustomersForm open={formOpen} customer={customer} onClose={handleCloseForm} />

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
              {rows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.id.toString().padStart(4, '0')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2">{row.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.address.city}, {row.address.state}, {row.address.country}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const phone = row.contacts.find((c: CustomerContact) => c.contact_type === 1);
                      const email = row.contacts.find((c: CustomerContact) => c.contact_type !== 1);
                      return (
                        <>
                          {phone && (
                            <Stack direction="row" spacing={0.5} alignItems="center" key={phone.id}>
                              <PhoneCallIcon fontSize="var(--icon-fontSize-md)" />
                              {phone.value}
                            </Stack>
                          )}
                          {email && (
                            <Stack direction="row" spacing={0.5} alignItems="center" key={email.id}>
                              <EnvelopeIcon fontSize="var(--icon-fontSize-md)" />
                              {email.value}
                            </Stack>
                          )}
                        </>
                      );
                    })()}
                  </TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell align='center'>{row.vehicles.length}</TableCell>
                  <TableCell align='center'>1 {/* Alterar depois */}</TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label="delete" size="medium" onClick={() => {/* implementar delete */ }}>
                      <TrashIcon fontSize="var(--icon-fontSize-md)" />
                    </IconButton>
                    <IconButton aria-label="edit" size="medium" onClick={() => handleEdit(row)}>
                      <PencilLineIcon fontSize="var(--icon-fontSize-md)" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
    </>
  );
}
