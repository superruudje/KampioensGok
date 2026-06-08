import type { Match } from "@/types/tournament";

export const results: Record<
    number,
    Pick<
        Match,
        | "result"
        | "result_after_extra_time"
        | "result_after_penalties"
        | "events"
    >
> = {
    // 1: {
    //     result: [2, 1],
    //     events: []
    // }
};