'use client';

import { CustomerField } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import { updateCustomer } from '@/app/lib/actions';

export function CustomerForm({ customer }: { customer: CustomerField }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateCustomer, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" value={customer.id} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={customer.name}
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={customer.email}
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            defaultValue={customer.image_url}
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
