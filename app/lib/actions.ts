'use server';
import { z } from 'zod';
import { Pool } from 'pg';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const CustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  image_url: z.string().url({ message: 'Invalid image URL' }),
});

export async function updateCustomer(prevState: any, formData: FormData) {
  const validatedFields = CustomerSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  const { id, name, email, image_url } = validatedFields.data;

  try {
    await pool.query(
      `UPDATE customers 
       SET name = $1, email = $2, image_url = $3
       WHERE id = $4`,
      [name, email, image_url, id],
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
