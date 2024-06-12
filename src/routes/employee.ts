import { Router } from 'express';
import { checkPermission } from '../middleware/checkPermission';
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '../controllers/employeeController';

const router = Router();

router.post('/', checkPermission('create', 'Employee'), createEmployee);
router.get('/', checkPermission('read', 'Employee'), getEmployees);
router.get('/:id', checkPermission('read', 'Employee'), getEmployee);
router.put('/:id', checkPermission('update', 'Employee'), updateEmployee);
router.delete('/:id', checkPermission('delete', 'Employee'), deleteEmployee);

export default router;
