import Image from 'next/image';
import { UpdateTask, DeleteTask } from '@/app/ui/tasks/buttons';
import { fetchFilteredTasks } from '@/app/lib/tasks/data';
import { formatDateToLocal } from '@/app/lib/utils';
import Status from './status';

export default async function TasksTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const tasks = await fetchFilteredTasks(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {tasks?.map((task) => (
                            <div
                                key={task.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {task.task}
                                        </p>
                                        <p>{formatDateToLocal(task.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateTask id={task.id} />
                                        <DeleteTask id={task.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Task
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {tasks?.map((task) => (
                                <tr
                                    key={task.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {/* <a href={task.task}> */}
                                        {task.task}
                                        {/* </a> */}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(task.date)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Status status={task.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateTask id={task.id} />
                                            <DeleteTask id={task.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
