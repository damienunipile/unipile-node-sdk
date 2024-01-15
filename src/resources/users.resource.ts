import {
  GetProfileInput,
  RequestOptions,
  UnipileClient,
  untypedYetValidator,
  Response,
  PostInvitationInput,
  GetAllPostsInput,
  GetPostInput,
  GetAllPostCommentsInput,
} from '../index.js';

export class UsersResource {
  constructor(private client: UnipileClient) {}

  async getProfile(input: GetProfileInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { identifier, account_id } = input;

    return await this.client.request.send({
      path: ['users', identifier],
      method: 'GET',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }

  async sendInvitation(input: PostInvitationInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['users', 'invite'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllPosts(input: GetAllPostsInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { identifier, account_id, limit, is_company, cursor } = input;

    const parameters: Record<string, string> = {};
    parameters.account_id = account_id;
    if (is_company) parameters.is_company = is_company ? 'true' : 'false';
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['users', identifier, 'posts'],
      method: 'GET',
      parameters,
      options,
      validator: untypedYetValidator,
    });
  }

  async getPost(input: GetPostInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, post_id } = input;

    return await this.client.request.send({
      path: ['posts', post_id],
      method: 'GET',
      parameters: {
        account_id,
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllPostComments(input: GetAllPostCommentsInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, post_id } = input;

    return await this.client.request.send({
      path: ['posts', post_id, 'comments'],
      method: 'GET',
      parameters: {
        account_id,
      },
      options,
      validator: untypedYetValidator,
    });
  }
}
