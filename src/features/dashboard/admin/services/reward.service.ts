import { API_PATHS } from '@/constants/apiPaths';
import type { ApiResponse } from '@/types/ApiResponse';
import apiClient from '@/utils/apiClient';
import type {
  CreateRewardInputPayload,
  UpdateRewardInputPayload,
} from '../schema/reward.schema';
import type { BaseRewards } from '../types/reward';

export const createReward = async (
  payload: CreateRewardInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(
    API_PATHS.ADMIN.REWARD(),
    payload
  );
  return data;
};

export const getRewards = async (): Promise<ApiResponse<BaseRewards[]>> => {
  const { data } = await apiClient.get<ApiResponse<BaseRewards[]>>(
    API_PATHS.ADMIN.REWARD()
  );
  return data;
};

export const updateReward = async (
  id: string,
  payload: UpdateRewardInputPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.patch<ApiResponse<null>>(
    API_PATHS.ADMIN.REWARD(id),
    payload
  );
  return data;
};

export const deleteReward = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    API_PATHS.ADMIN.REWARD(id)
  );
  return data;
};
