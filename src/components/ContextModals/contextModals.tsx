import CreateCategoryModal from "./CreateCategoryModal";
import CreateTransactionModal from "./CreateTransactionModal";
import UpdateCategoryModal from "./UpdateCategoryModal";


export const modals = {
  createCategoryModal: CreateCategoryModal,
  updateCategoryModal: UpdateCategoryModal,
  createTransactionModal: CreateTransactionModal
} as const;

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
