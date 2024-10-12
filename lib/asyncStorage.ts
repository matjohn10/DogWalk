import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
    return "";
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

export function useStoreData() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: { key: string; value: string }) {
      await storeData(data.key, data.value);
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({ queryKey: [data.key] });
    },
  });
}
export const useGetData = (key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const help = await getData(key);
      return !!help ? help : "";
    },
  });
};
