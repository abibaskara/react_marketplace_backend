import Employee from '../models/EmployeeModel.js';

export const getEmployee = async(req, res) => {
    try{
        const response = await Employee.findAll();
        if(response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: 'Data Employee Tidak Ada'
            });
        }
        
    } catch(error) {
        console.log(error.message);
    }
}

export const getEmployeeById = async(req, res) => {
    try{
        const response = await Employee.findOne({
            where: {
                id_employee: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const createEmployee = async(req, res) => {
    try{
        await Employee.create(req.body);
        res.status(201).json({message: 'Employee Created'});
    } catch(error) {
        console.log(error.message);
    }
}

export const updateEmployee = async(req, res) => {
    try{
        await Employee.update(req.body, {
            where: {
                id_employee: req.params.id
            }
        });
        res.status(200).json({message: 'Employee Updated'});
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteEmployee = async(req, res) => {
    try{
        await Employee.destroy({
            where: {
                id_employee: req.params.id
            }
        });
        res.status(200).json({message: 'Employee Deleted'});
    } catch(error) {
        console.log(error.message);
    }
}