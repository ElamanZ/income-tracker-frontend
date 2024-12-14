import CreateCategoryModal from "./CreateCategoryModal";
import CreateTransactionModal from "./CreateTransactionModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateDebtModal from "./CreateDebtModal";


export const modals = {
  createCategoryModal: CreateCategoryModal,
  updateCategoryModal: UpdateCategoryModal,
  createTransactionModal: CreateTransactionModal,
  createDebtModal: CreateDebtModal,
} as const;

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
