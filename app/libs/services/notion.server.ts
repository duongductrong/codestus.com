import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

class NotionService {
  _client: Client | undefined;

  _n2m: NotionToMarkdown | undefined;

  client() {
    if (!this._client) {
      console.log("process.env.NOTION_API_KEY", process.env.NOTION_API_KEY);
      this._client = new Client({
        auth: process.env.NOTION_API_KEY,
      });
    }

    return this._client;
  }

  n2m() {
    if (!this._n2m) {
      this._n2m = new NotionToMarkdown({ notionClient: this.client() });
    }

    return this._n2m;
  }

  databaseId() {
    return process.env.NOTION_DATABASE_ID ?? "";
  }

  pageId() {
    return process.env.NOTION_PAGE_ID ?? "";
  }

  async n2mMarkdown(pageId: string) {
    const blocksInNotionPage = await this.n2m().pageToMarkdown(pageId);
    return this.n2m().toMarkdownString(blocksInNotionPage);
  }
}

const notionService = new NotionService();

export default notionService;
