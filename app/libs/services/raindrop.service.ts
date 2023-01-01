import type { AxiosResponse } from "axios";
import axios from "axios";
import qs from "querystring";

interface Collection {
  $ref: string;
  $id: number;
  $db: string;
}

interface Medium {
  type: string;
  link: string;
}

interface User {
  $ref: string;
  $id: number;
  $db: string;
}

interface CreatorRef {
  avatar: string;
  _id: number;
  name: string;
  email: string;
}

export interface Item {
  excerpt: string;
  note: string;
  type: string;
  cover: string;
  tags: string[];
  removed: boolean;
  _id: number;
  title: string;
  collection: Collection;
  link: string;
  created: Date;
  lastUpdate: Date;
  important: boolean;
  media: Medium[];
  user: User;
  highlights: any[];
  domain: string;
  creatorRef: CreatorRef;
  sort: number;
  collectionId: number;
}

export interface RaindropData {
  result: boolean;
  items: Item[];
  count: number;
  collectionId: number;
}

export interface RainDropReadListArgs {
  page?: number;
  perPage?: number;
}

const raindropServiceBase = axios.create({
  baseURL: process.env.RAINDROP_API_URL,
  // paramsSerializer: (query) => qs.stringify(query) as any,
});

class RaindropService {
  readLists({ page = 0, perPage = 8 }: RainDropReadListArgs): Promise<AxiosResponse<RaindropData>> {
    return raindropServiceBase.get("/raindrops/30171103", {
      params: {
        page,
        perpage: perPage,
      },
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_CLIENT_TOKEN}`,
      },
    });
  }
}

const raindropService = new RaindropService();

export default raindropService;
