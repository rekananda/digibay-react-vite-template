import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalConfirmationType = {
  show: boolean;
  title: string;
  label: string;
  code?: string;
}

type LayoutState = {
  sidebarOpen: boolean;
  sidebarIcon: boolean;
}

export interface State extends LayoutState {
  modalConfirmation: ModalConfirmationType;
  isModalConfirmed: boolean;
}

const initialState: State = {
  modalConfirmation: {
    show: false,
    title: "",
    label: "",
  },
  isModalConfirmed: false,
  sidebarOpen: true,
  sidebarIcon: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setModalConfirmation: (state: State, action: PayloadAction<ModalConfirmationType>) => {
      state.modalConfirmation = action.payload;
    },
    confirmModal: (state: State) => {
      state.isModalConfirmed = true;
    },
    resetModalConfirmation: (state: State) => {
      state.modalConfirmation = {
        show: false,
        title: "",
        label: "",
      };
      state.isModalConfirmed = false;
    },
    setSidebar: (state: State, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setIconSidebar: (state: State, action: PayloadAction<boolean>) => {
      state.sidebarIcon = action.payload;
    },
    toggleSidebar: (state: State) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleSidebarIcon: (state: State) => {
      state.sidebarIcon = !state.sidebarIcon;
    },
    resetLayout: (state: State, action: PayloadAction<LayoutState>) => {
      state.sidebarOpen = action.payload.sidebarOpen;
      state.sidebarIcon = action.payload.sidebarIcon;
    },
  },
});

export const {
  setModalConfirmation,
  confirmModal,
  resetModalConfirmation,
  setSidebar,
  setIconSidebar,
  toggleSidebar,
  toggleSidebarIcon,
  resetLayout,
} = globalSlice.actions;

export default globalSlice.reducer;
