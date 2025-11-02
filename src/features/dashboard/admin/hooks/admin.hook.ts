import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  fetchAdminDashboard,
  updateAdminProfile,
} from '../services/admin.service';
import { useAdminStore } from '@/store/adminStore';
import type { ApiResponse } from '@/types/ApiResponse';
import {
  updateAdminProfileSchema,
  type UpdateAdminProfileSchemaPayload,
} from '../schema/admin.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { SETTING_STYLES } from '../constant/setting.constant';

export const useAdminDashboard = (enabled: boolean) => {
  const { setAdminData, clearAdminData } = useAdminStore();

  const query = useQuery({
    queryKey: ['dashboardAdmin'],
    queryFn: ({ signal }) => fetchAdminDashboard(signal),
    enabled,
    retry: (count, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return count < 1;
    },
    staleTime: 60 * 1000,
  });

  // sinkronisasi ke store
  useEffect(() => {
    if (query.isSuccess) {
      setAdminData(query.data.data);
    }
    if (query.isError) {
      clearAdminData();
    }
  }, [
    query.isSuccess,
    query.isError,
    query.data,
    setAdminData,
    clearAdminData,
  ]);

  return query;
};

export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ApiResponse<null>,
    Error,
    { id: string; payload: UpdateAdminProfileSchemaPayload }
  >({
    mutationFn: ({ id, payload }) => updateAdminProfile(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardAdmin'] });
    },
  });

  return {
    ...mutation,
    doUpdateAdminProfile: mutation.mutateAsync,
  };
};

export const useUpdateAdminProfileForm = () => {
  const methods = useForm<UpdateAdminProfileSchemaPayload>({
    resolver: zodResolver(updateAdminProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      profilePicture: undefined,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  return methods;
};

export const useSettingStyles = () => {
  const styles = useMemo(
    () => ({
      input: SETTING_STYLES.input,
      inputWithIcon: SETTING_STYLES.inputWithIcon,
      card: SETTING_STYLES.card,
      sectionLabel: SETTING_STYLES.sectionLabel,
      summaryPill: SETTING_STYLES.summaryPill,
      container: SETTING_STYLES.container,
    }),
    []
  );

  return styles;
};
