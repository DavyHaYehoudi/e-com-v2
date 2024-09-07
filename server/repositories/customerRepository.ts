import {query} from '../config/req.js';


// Récupérer les données du customer par email avec option pour les colonnes souhaitées
export const getCustomerByEmail = async (email: string, columns: string[] = ['*']) => {
    const columnList = columns.join(', ');
    const sql = `SELECT ${columnList} FROM customer WHERE email = ?`;
    const [row] = await query(sql, [email]);
    return row;
};

// Créer un customer
export const addCustomer = async (email: string) => {
    const sql = `INSERT INTO customer (email) 
                 VALUES (?)`;
    const result = await query(sql, [email]);
    return result; 
};

