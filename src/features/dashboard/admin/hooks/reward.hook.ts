import type { ApiResponse } from '@/types/ApiResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRewardSchema,
  updateRewardSchema,
  type CreateRewardInputPayload,
  type UpdateRewardInputPayload,
} from '../schema/reward.schema';
import {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
} from '../services/reward.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BaseRewards } from '../types/reward';

export const useCreateReward = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    CreateRewardInputPayload
  >({
    mutationFn: createReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
    },
  });
  return {
    ...mutation,
    doCreateReward: mutation.mutateAsync,
  };
};

export const useRewards = () => {
  const query = useQuery<ApiResponse<BaseRewards[]>>({
    queryKey: ['rewards'],
    queryFn: getRewards,
  });

  return {
    rewards: query.data?.data ?? [],
    ...query,
  };
};

export const useUpdateReward = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    { id: string; payload: UpdateRewardInputPayload }
  >({
    mutationFn: ({ id, payload }) => updateReward(id, payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['rewards'] });
    },
  });
  return {
    ...mutation,
    doUpdateReward: mutation.mutateAsync,
  };
};

export const useDeleteReward = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: deleteReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
    },
  });

  return {
    ...mutation,
    doDeleteReward: mutation.mutateAsync,
  };
};

export const useCreateRewardForm = () => {
  const method = useForm<CreateRewardInputPayload>({
    resolver: zodResolver(createRewardSchema),
    mode: 'onBlur',
  });
  return method;
};

export const useUpdateRewardForm = () => {
  const method = useForm<UpdateRewardInputPayload>({
    resolver: zodResolver(updateRewardSchema),
    mode: 'onBlur',
  });
  return method;
};
