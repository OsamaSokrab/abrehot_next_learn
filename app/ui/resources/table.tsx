import Image from 'next/image';
import { UpdateResource, DeleteResource } from '@/app/ui/resources/buttons';
import { fetchFilteredResources } from '@/app/lib/resources/data';

export default async function ResourcesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const links = await fetchFilteredResources(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {links?.map((link) => (
                            <div
                                key={link.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {link.title}
                                        </p>
                                        <p>{link.url}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateResource id={link.id} />
                                        <DeleteResource id={link.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Root
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    stem
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    branch
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    leaf
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {links?.map((link) => (
                                <tr
                                    key={link.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <a href={link.url}>
                                            {link.title}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {link.root}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {link.stem}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {link.branch}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {link.leaf}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateResource id={link.id} />
                                            <DeleteResource id={link.id} />
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