import { PropsWithChildren, useRef } from "react";

// Context
import { PlanningContext } from "./PlanningContext";

// Stores
import { useAuth } from "@/stores/user/auth.store"
import { createPlanningStore, type PlanningStore } from "@/stores/planning/planning.store";

export const PlanningProvider = ({ children }: PropsWithChildren) => {
    const storeRef = useRef<PlanningStore>();
    const token = useAuth(state => state.token);
    storeRef.current = createPlanningStore(token!);

    return (
        <PlanningContext.Provider value={storeRef.current}>
            {children}
        </PlanningContext.Provider>
    )
}