import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-100 text-gray-500': status === 'pending',
                    'bg-green-500 text-white': status === 'done',
                    'bg-yellow-500 text-white': status === 'delayed',
                    'bg-red-500 text-white': status === 'cancelled',
                },
            )}
        >
            {status === 'pending' ? (
                <>
                    Pending
                    <ClockIcon className="ml-1 w-4 text-gray-500" />
                </>
            ) : null}
            {status === 'done' ? (
                <>
                    Done
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === 'delayed' ? (
                <>
                    Delayed
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === 'cancelled' ? (
                <>
                    Cancelled
                    <CheckIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
        </span>
    );
}
