import { Request,Response, query } from "express";
import { Pool } from 'pg';
import { employeeCreateValidator,employeeUpdateValidator } from "../validators/employeeValidator";
import { object } from "zod";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_crud_db',
    password: 'root',
    port: 5432,
  });

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Database connected:', res.rows[0]);
    }
  });

  export const createEmployee = async (req: Request, res: Response) => {
    try {
      // Validate and parse the input
      const input = employeeCreateValidator.parse(req.body);
      console.log('Parsed Input:', input);
  
      // Insert the employee data into the database
      const result = await pool.query(
        'INSERT INTO employees (name, position, department, salary) VALUES ($1, $2, $3, $4) RETURNING *',
        [input.name, input.position, input.department, input.salary]
      );
  
      // Check if the insert was successful
      if (result.rows.length > 0) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(400).json({ error: 'Failed to create employee' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(400).json({ error: (error as any).message });
    }
  };

export const getEmployees = async( req: Request , res: Response) =>{
    try {
        const result = await pool.query('SELECT * from employees');
        res.json(result.rows)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getEmployee = async(req: Request , res: Response) => {
    try {
        const id = parseInt(req.params.id,10)
        const result = await pool.query('SELECT * from employees WHERE id = $1', [id]);
        if(result.rows.length === 0){
            return res.status(404).json({ error: 'NOT_FOUND' });
        }
        else{
            res.json(result.rows[0])
        }
    } catch (error) {
        res.status(500).json({ error });
    }


}

export const updateEmployee = async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id, 10);
        const input = employeeUpdateValidator.parse(req.body);
        const fields: string[] = [];
        const values = [];

        Object.keys(input).forEach((key, index) => {
            fields.push(`${key} = $${index + 1}`);
            values.push((input as any)[key]);
          });

          values.push(id);
          const result = await pool.query(`UPDATE employees SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
          values);

          if(result.rows.length === 0){
            return res.status(404).json({ error: 'NOT_FOUND' });
          }
          else{
            res.json(result.rows[0]);
          }
      } catch (error) {
        res.status(400).json({ error });
      }
}

export const deleteEmployee = async(req: Request, res: Response) => {
         try {
                const id = parseInt(req.params.id, 10);
                const result = await pool.query('DELETE from employees where id = $1 RETURNING *', [id]);
                if(result.rows.length === 0){
                    return res.status(404).json({ error: 'NOT_FOUND' });
                }
                else{
                    res.status(204).json({ message: 'Employee deleted successfully' });
                }
         } catch (error) {
            res.status(500).json({ error });
         }
         
}
  