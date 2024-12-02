import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    queryClient.setQueryData(['me'], null);
    navigate({ to: '/signin' });
  }

  return [logout];
}