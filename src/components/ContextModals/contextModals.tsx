import CreateCategoryModal from "./CreateCategoryModal";
import CreateTransactionModal from "./CreateTransactionModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateDebtModal from "./CreateDebtModal";
import UpdateTransactionModal from "./UpdateTransactionModal";
import UpdateDebtModal from "./UpdateDebtModal copy";


export const modals = {
  createCategoryModal: CreateCategoryModal,
  updateCategoryModal: UpdateCategoryModal,
  createTransactionModal: CreateTransactionModal,
  createDebtModal: CreateDebtModal,
  updateTransactionModal: UpdateTransactionModal,
  updateDebtModal: UpdateDebtModal
} as const;

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
