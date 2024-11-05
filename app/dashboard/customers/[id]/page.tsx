import { notFound } from 'next/navigation';
import { Pool } from 'pg';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CustomerForm } from '@/app/ui/customers/customer-form';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customer Details',
};

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getCustomer(id: string) {
  try {
    const data = await pool.query('SELECT * FROM customers WHERE id = $1', [
      id,
    ]);

    if (!data.rows[0]) {
      notFound();
    }

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer');
  }
}

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCustomer(params.id);

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/customers"
            className="rounded-md border p-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="w-5" />
          </Link>
          <h1 className={`${lusitana.className} text-2xl`}>Customer Profile</h1>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20">
              <Image
                src={customer.image_url}
                alt={customer.name}
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <p className="text-gray-600">{customer.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <CustomerForm customer={customer} />
        </div>
      </div>
    </main>
  );
}
