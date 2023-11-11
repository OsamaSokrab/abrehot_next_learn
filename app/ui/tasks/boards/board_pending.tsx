import Image from 'next/image';
import { UpdateTask, DeleteTask } from '@/app/ui/tasks/buttons';
import { fetchFilteredPendingTasks } from '@/app/lib/tasks/data';
import { formatDateToLocal } from '@/app/lib/utils';
import Status from '../status';
import { ClockIcon } from '@heroicons/react/24/outline';

export default async function BoardPending({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const tasks = await fetchFilteredPendingTasks(query, currentPage);

    return (
        <div className='flex flex-col '>
            <h2 className='text-[1.2rem] font-500 inline-flex items-center text-center rounded-full px-2 py-1 bg-gray-100 text-gray-500 my-[1rem]'>
                Pending
                <ClockIcon className="ml-1 w-4 text-gray-500" />
            </h2>
            <div className='flex flex-col gap-[1.5rem]'>
                {tasks?.map((task) => (
                    <div
                        key={task.id}
                        className="flex flex-col  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-lg p-[1rem]"
                    >
                        <h3 className="text-center font-500 text-[1.2rem] ">
                            {task.task}
                        </h3>
                        <div className="flex justify-between">
                            <div className="text-[0.875rem] ml-[1rem] inline-flex items-center rounded-full px-2 py-1 bg-gray-400 text-white">
                                {formatDateToLocal(task.date)}
                            </div>
                            <div className="flex justify-end  mr-[1rem]">
                                <UpdateTask id={task.id} />
                                <DeleteTask id={task.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}