import { z } from 'zod'

export const employeeCreateValidator = z.object({
    name : z.string().min(1),
    position : z.string().min(1),
    department : z.string().min(1),
    salary: z.number().positive(),
});

export const employeeUpdateValidator = z.object({
    name : z.string().min(1).optional(),
    position : z.string().min(1).optional(),
    department : z.string().min(1).optional(),
    salary: z.number().positive().optional(),
})