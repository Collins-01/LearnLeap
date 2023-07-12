import redis, { createClient } from "redis";
import { CacheKey } from "./cache-keys";

export interface InputCacheDto {
  cacheKey: CacheKey;
  dataKey: string;
  data: any;
}

export interface GetCacheDto {
  cacheKey: CacheKey;
  dataKey: string;
}
export default class CacheService {
  private client = createClient({});

  constructor() {}

  /**
 * setValue =
 =>*/
  public setValue = async (dto: InputCacheDto) => {
    try {
      const response = await this.client.hSet(
        dto.cacheKey,
        dto.dataKey,
        dto.data
      );
    } catch (error) {
      console.log(`Error saving to cache :: ${error}`);
    }
  };

  /**
   * getValue
   */
  public getValue = async (dto: GetCacheDto) => {
    try {
      const userId = "123"; // User ID

      // Retrieve OTP from Redis Hash
      const response = await this.client.hGet(dto.cacheKey, dto.dataKey);
    } catch (error) {
      console.log(`Error fetching from  cache :: ${error}`);
    }
  };

  public deleteValue = async () => {};
}
