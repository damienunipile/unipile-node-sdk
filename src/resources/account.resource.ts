import QRCode from 'qrcode';
import { Input, Output, RequestOptions, Response } from '../types/index.js';
import { UnipileClient } from '../client.js';
import {
  deleteAccountValidator,
  postHostedAuthLinkValidator,
  accountSourceStatusValidator,
  untypedYetValidator,
  postWhatsappAccountValidator,
} from '../validation.js';

export class AccountResource {
  constructor(private client: UnipileClient) {}

  async getAll(input: Input.GetAccounts = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['accounts'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  async getAccountStatus(accountId: string, options?: RequestOptions): Promise<Response.AccountSourceStatus> {
    return await this.client.request.send({
      path: ['accounts', accountId, 'status'],
      method: 'GET',
      options,
      validator: accountSourceStatusValidator,
    });
  }

  async connectWhatsappAccount(options?: RequestOptions): Promise<Output.PostWhatsappAccount> {
    const response = await this.client.request.send<Response.PostWhatsappAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postWhatsappAccountValidator,
    });

    return {
      qrCodeBuffer: await QRCode.toBuffer(response.checkpoint.qrcode),
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
    };
  }

  async connectLinkedinAccount(input: Input.PostLinkedinAccount, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async solveCodeCheckpoint(input: Input.PostCodeCheckpoint, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', 'checkpoint'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async delete(id: string, options?: RequestOptions): Promise<Response.DeleteAccount> {
    return await this.client.request.send({
      path: ['accounts', id],
      method: 'DELETE',
      options,
      validator: deleteAccountValidator,
    });
  }

  async createHostedAuthLink(input: Input.HostedAuthLink, options?: RequestOptions): Promise<Response.HostedAuthLink> {
    return await this.client.request.send({
      path: ['hosted', 'accounts', 'auth_link'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postHostedAuthLinkValidator,
    });
  }
}
