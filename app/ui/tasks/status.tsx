import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskStatus({ taskStatus }: { taskStatus: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-100 text-gray-500': taskStatus === 'pending',
                    'bg-green-500 text-white': taskStatus === 'done',
                    'bg-yellow-500 text-white': taskStatus === 'delayed',
                    'bg-red-500 text-white': taskStatus === 'cancelled',
                },
            )}
        >
            {taskStatus === 'pending' ? (
                <>
                    Pending
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                </>
            ) : null}
            {taskStatus === 'done' ? (
                <>
                    Done
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {taskStatus === 'delayed' ? (
                <>
                    Delayed
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {taskStatus === 'cancelled' ? (
                <>
                    Cancelled
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
        </span>
    );
}
