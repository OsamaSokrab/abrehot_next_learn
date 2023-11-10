'use client';

import { CustomerField, TasksForm } from '@/app/lib/tasks/definitions';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTask } from '@/app/lib/tasks/actions';
import { useFormState } from 'react-dom';

export default function EditInvoiceForm({
    link,
    customers,
}: {
    link: TasksForm;
    customers: CustomerField[];
}) {
    const initialState = { message: null, errors: {} };
    const updateResourceWithId = updateTask.bind(null, link.id);
    const [stateLink, dispatch] = useFormState(updateResourceWithId, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>

                    {stateLink.errors?.customerId ? (
                        <div
                            id="customer-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.customerId.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Link Name */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter A Task
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="title"
                                name="title"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="title-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.title ? (
                        <div
                            id="title-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.title.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Link Url */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter Link Url
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="url"
                                name="url"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="url-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.url ? (
                        <div
                            id="url-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.url.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Root */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter Root Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="root"
                                name="root"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="root-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.root ? (
                        <div
                            id="root-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.root.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Stem */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter Link Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="stem"
                                name="stem"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="stem-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.stem ? (
                        <div
                            id="stem-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.stem.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Branch */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter Branch Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="branch"
                                name="branch"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="branch-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.branch ? (
                        <div
                            id="branch-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.branch.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Leaf Name */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter Leaf Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="leaf"
                                name="leaf"
                                type="string"
                                step="0.01"
                                placeholder="Enter link name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="leaf-error"
                            />
                        </div>
                    </div>

                    {stateLink.errors?.leaf ? (
                        <div
                            id="leaf-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {stateLink.errors.leaf.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {stateLink.message ? (
                    <div aria-live="polite" className="my-2 text-sm text-red-500">
                        <p>{stateLink.message}</p>
                    </div>
                ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Link</Button>
            </div>
        </form>
    );
}
