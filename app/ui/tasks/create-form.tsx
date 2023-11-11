'use client';

import Link from 'next/link';
import {
    ArrowSmallRightIcon,
    CheckIcon,
    ClockIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTask } from '@/app/lib/tasks/actions';
import { useFormState } from 'react-dom';

export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createTask, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}

                {/* Task Name */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter A Task
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="task"
                                name="task"
                                type="string"
                                step="0.01"
                                placeholder="Enter task name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="task-error"
                            />
                        </div>
                        {state.errors?.task ? (
                            <div
                                id="task-error"
                                aria-live="polite"
                                className="mt-2 text-sm text-red-500"
                            >
                                {state.errors.task.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    {/* Task Status */}
                    <fieldset>
                        <legend className="mb-2 block text-sm font-medium">
                            Set the Task status
                        </legend>
                        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="pending"
                                        name="status"
                                        type="radio"
                                        value="pending"
                                        className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                                    />
                                    <label
                                        htmlFor="pending"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                                    >
                                        Pending <ClockIcon className="h-4 w-4" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="done"
                                        name="status"
                                        type="radio"
                                        value="done"
                                        className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                                    />
                                    <label
                                        htmlFor="done"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                                    >
                                        Done <CheckIcon className="h-4 w-4" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="delayed"
                                        name="status"
                                        type="radio"
                                        value="delayed"
                                        className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                                    />
                                    <label
                                        htmlFor="delayed"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                                    >
                                        Delayed <ArrowSmallRightIcon className="h-4 w-4" />
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="cancelled"
                                        name="status"
                                        type="radio"
                                        value="cancelled"
                                        className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                                    />
                                    <label
                                        htmlFor="cancelled"
                                        className="ml-2 flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                                    >
                                        Cancelled <XCircleIcon className="h-4 w-4" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {state.errors?.status ? (
                            <div
                                aria-describedby="status-error"
                                aria-live="polite"
                                className="mt-2 text-sm text-red-500"
                            >
                                {state.errors.status.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>
                        ) : null}
                    </fieldset>
                    {state.errors?.status ? (
                        <div
                            id="status-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.status.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Task Date */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Enter A Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="date"
                                name="date"
                                type="string"
                                step="0.01"
                                placeholder="Enter a date"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="date-error"
                            />
                        </div>
                    </div>
                </div>
                {state.errors?.date ? (
                    <div
                        id="date-error"
                        aria-live="polite"
                        className="mt-2 text-sm text-red-500"
                    >
                        {state.errors.date.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                ) : null}
                {state.message ? (
                    <div aria-live="polite" className="my-2 text-sm text-red-500">
                        <p>{state.message}</p>
                    </div>
                ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/tasks"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Task</Button>
            </div>
        </form>
    );
}
