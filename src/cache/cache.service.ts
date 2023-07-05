import redis, { createClient } from "redis";
export default class CacheService {
  private client = createClient();
  init(){}
  connect(){
    
  }
}
