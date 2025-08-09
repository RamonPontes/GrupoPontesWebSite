export interface Customer {
  id: number
  name: string
  cpf: string
  created_at: string
  created_by: number
  address: CustomerAddress
  contacts: CustomerContact[]
  vehicles: CustomerVehicle[]
}

export interface CustomerContact {
  id: number
  contact_type: number
  value: string
  created_at: string
  created_by: number
}

export interface CustomerAddress {
  id: number
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  cep: string
  country: string
  created_at: string
  created_by: number
}

export interface CustomerVehicle {
  id: number
  make: string
  model: string
  year: number
  color: string
  license_plate: string
  mileage: string
  new_column: number
  created_at: string
  created_by: number
}