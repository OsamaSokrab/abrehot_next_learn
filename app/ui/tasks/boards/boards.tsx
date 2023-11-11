import { fetchFilteredTasks } from "@/app/lib/tasks/data";
import BoardDelayed from "./board_delayed";
import BoardDone from "./board_done";
import BoardPending from "./board_pending";
import BoardCancelled from "./board_cancelled";

export default async function boards({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    // const tasks = await fetchFilteredTasks(query, currentPage);

    return (
        <div className="grid grid-cols-4 w-full gap-[1.5rem]">
            <BoardPending query={query} currentPage={currentPage} />
            <BoardDone query={query} currentPage={currentPage} />
            <BoardDelayed query={query} currentPage={currentPage} />
            <BoardCancelled query={query} currentPage={currentPage} />
        </div>
    )
}
