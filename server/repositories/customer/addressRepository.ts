import { query } from '../../config/req.js';
import { AddressInput } from '../../dto/customer/address.dto.js';
import { AddressRow } from '../../types/customer/address.js';


  export const getCustomerAddressRepository= async (customerId: number, type: string): Promise<AddressRow | null> => {
    const sql = `SELECT * FROM customer_address WHERE customer_id = ? AND type = ?`;
    const results = await query<AddressRow[]>(sql, [customerId, type]);

    return results.length ? results[0] : null;
  }

  export const updateCustomerAddressRepository= async (customerId: number, type: string, addressData: AddressInput) => {
    const sql = `
      UPDATE customer_address
      SET company = ?, email = ?, phone = ?, street_number = ?, address1 = ?, address2 = ?, city = ?, postal_code = ?, country = ?
      WHERE customer_id = ? AND type = ?
    `;
    await query(sql, [
      addressData.company,
      addressData.email,
      addressData.phone,
      addressData.street_number,
      addressData.address1,
      addressData.address2,
      addressData.city,
      addressData.postal_code,
      addressData.country,
      customerId,
      type
    ]);
  }

  export const createCustomerAddressRepository= async (customerId: number, type: string, addressData: AddressInput) => {
    const sql = `
      INSERT INTO customer_address (company, email, phone, street_number, address1, address2, city, postal_code, country, customer_id, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await query(sql, [
      addressData.company,
      addressData.email,
      addressData.phone,
      addressData.street_number,
      addressData.address1,
      addressData.address2,
      addressData.city,
      addressData.postal_code,
      addressData.country,
      customerId,
      type
    ]);
  }
