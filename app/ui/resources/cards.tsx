import Image from 'next/image';
import { UpdateResource, DeleteResource } from '@/app/ui/resources/buttons';
import { fetchFilteredResources } from '@/app/lib/resources/data';
import nature from '@/public/nature.webp'

export default async function ResourcesCards({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const links = await fetchFilteredResources(query, currentPage);

    return (
        <div className="grid grid-cols-3 bg-white gap-[1rem]">
            {links?.map((link) => (
                <div
                    key={link.id}
                    className='p-[1.5rem] max-w-[330px] w-full bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[0.5rem] relative z-[1] border-[#E2E8F0]'
                >
                    <div className='rounded-[1.5rem] mt-[calc(3rem * -1)] relative h-[230px] border-[#E2E8F0]'>
                        <Image
                            src={nature}
                            alt='resource image'
                            width={282}
                            height={230}
                            className='object -cover rounded-[0.5rem] border-none border[#E2E8F0]'
                        />
                    </div>
                    <div className='flex items-center flex-col gap-[0.5rem] pt-[0.5rem] border[#E2E8F0]'>
                        <div className="text-[#718096] text-[0.875rem] border[#E2E8F0] flex items-center justify-around">
                            <a href={link.url}>
                                {link.root} / {link.stem} /{link.branch}
                            </a>
                        </div>
                        <h2 className="leading-[1.33] text-[1.2rem] font-[500] border[#E2E8F0]">
                            <a href={link.url}>
                                {link.title}
                            </a>
                        </h2>
                        <div className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-[0.5rem] border[#E2E8F0]">
                                <UpdateResource id={link.id} />
                                <DeleteResource id={link.id} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>)
}