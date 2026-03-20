import { z } from 'zod'

export const step1Schema = z.object({
  company: z.string().min(1, 'Brand is required'),
  year: z.number().min(2000).max(2024),
  owner: z.string().min(1, 'Owner is required'),
  fuel: z.string().min(1, 'Fuel type is required'),
})

export const step2Schema = z.object({
  transmission: z.string().min(1, 'Transmission is required'),
  km_driven: z.number().min(1, 'KM driven is required'),
  mileage_mpg: z.number().min(1, 'Mileage is required'),
  engine_cc: z.number().min(1, 'Engine CC is required'),
  max_power_bhp: z.number().min(1, 'Max power is required'),
  torque_nm: z.number().min(1, 'Torque is required'),
  seats: z.number().min(2).max(9),
})

export const step3Schema = z.object({
  seller_type: z.string().min(1, 'Seller type is required'),
})
