import { AppDispatch, AppStore, RootState } from "@/common/presentation/view-model/store"
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore