import { createContext, useContext } from "react";

// Stores
import { type PlanningStore, type PlanningState } from "@/stores/planning/planning.store";
import { useStore } from "zustand";

export const PlanningContext = createContext<PlanningStore | undefined>(undefined);

export function usePlanningContext<T>(selector: (state: PlanningState) => T): T {
    const store = useContext(PlanningContext)
    if (!store) throw new Error('Missing PlanningContext.Provider in the tree')
    return useStore(store, selector)
}