# Unipile Node.js SDK

The Node.js SDK provides you tools to interact with Unipile’s API with ease. To have more informations about how Unipile’s API works and how to use it, please take a look at the following resources.

[Unipile API guide](https://developer.unipile.com/docs)

[Unipile API reference](https://developer.unipile.com/reference)

# Requirements

Node 18 recommended

# Table of Contents

- [Installation](#Installation)
- [Quick Start](#Quick_Start)
- [Features](#Features)
  - [Account Connection](#Account_Connection)
  - [Messages](#Messages)
  - [Attachments](#Attachments)
  - [Users](#Users)
- [LinkedIn Specific](#LinkedIn_Specific)
  - [Invitations](#Invitations)
  - [Posts](#Posts)
  - [Profiles](#Profiles)

# Installation

```
  npm install unipile-node-sdk
```

# Quick_Start

Authenticate using your Unipile account credentials

```javascript
import { UnipileClient } from 'unipile-node-sdk';

const client = new UnipileClient('https://{YOUR_DSN}', '{YOUR_ACCESS_TOKEN}');
```

Add a messaging account : LinkedIn

```javascript
const response = await client.account.connectLinkedin({
  username: 'your LinkedIn username',
  password: 'your LinkedIn password',
});
```

Retrieve a LinkedIn company profile

```javascript
const response = await client.users.getCompanyProfile({
  account_id: linkedinAccount.id,
  identifier: 'Unipile',
});
```

# Features

## Account_Connection

You can easily connect multiple accounts

- Generate a Hosted Auth Wizard link

  ```javascript
  await client.account.createHostedAuthLink({
    type: 'create', // or reconnect
    expiresOn: '2024-12-22T12:00:00.701Z',
    api_url: 'your api',
    providers: '*', // * means all provider
    success_redirect_url: 'your success url',
    failure_redirect_url: 'your fail url',
    notify_url: 'your notify url',
  });
  ```

- Implement a custom authentication to connect accounts on your application :

  - LinkedIn username/password
    ```javascript
    await client.account.connectLinkedin({
      username: 'your LinkedIn username',
      password: 'your LinkedIn password',
    });
    ```
  - Whatsapp
    ```javascript
    await client.account.connectWhatsapp();
    ```
  - Instagram
    ```javascript
    await client.account.connectInstagram({
      username: 'your Instagram username',
      password: 'your Instagram password',
    });
    ```
  - Messenger
    ```javascript
    await client.account.connectMessenger({
      username: 'your Messenger username',
      password: 'your Messenger password',
    });
    ```
  - Telegram
    ```javascript
    await client.account.connectTelegram();
    ```
  - X (Twitter)
    ```javascript
    await client.account.connectTwitter({
      username: 'your X username',
      password: 'your X password',
    });
    ```

- Have 2FA / OTP / In app validation security ? Solve the checkpoint
  ```javascript
  await client.account.solveCodeCheckpoint({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    provider: 'LINKEDIN',
    code: '******',
  });
  ```

## Messages

- Start a new chat
  ```javascript
  await client.messaging.startNewChat({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    attendees_ids: ['user id OR provider id'],
    text: 'new chat with message',
  });
  ```
- Send message
  ```javascript
  await client.messaging.sendMessage({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
    text: 'Hello World',
  });
  ```
- List messages in a chat
  ```javascript
  await client.messaging.getAllMessagesFromChat({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
  });
  ```
- List chats
  ```javascript
  await client.messaging.getAllChats();
  // OR sort your chats list
  await client.messaging.getAllChats({
    account_type: 'LINKEDIN',
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    limit: 50,
    after: '2024-07-22T12:00:00.000Z',
  });
  ```
- Retrieve a chat
  ```javascript
  await client.messaging.getChat('vISKyHtDUmagrk6vrnlXhw');
  ```
- List attendees
  ```javascript
  await client.messaging.getAllAttendees({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- List all attendees from a chat
  ```javascript
  await client.messaging.getAllAttendeesFromChat('vISKyHtDUmagrk6vrnlXhw');
  ```

## Attachments

- Send files attachments

  ```javascript
  const path = './src/unipile.png';
  const fileBuffer = await fs.readFile(path);

  await client.messaging.sendMessage({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
    text: 'Hello World',
    attachments: [['unipile.png', fileBuffer]],
  });
  ```

- Retrieve a attachment from a message
  ```javascript
  await client.messaging.getMessageAttachment({
    attachment_id: '5882031366722404334',
    message_id: '3aRdnf34UiympaebB4-NRA',
  });
  ```

## Users

- Retrieve users profiles
  ```javascript
  await client.users.getProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user id OR user provider id',
  });
  ```
- Retrieve my profile
  ```javascript
  await client.users.getOwnProfile('t5XY4yQzR9WVrlNFyzPMhw');
  ```

# LinkedIn_Specific

## InMail

Send messages to people outside users’ network with InMail credits that vary by subscription level.

```javascript
await client.messaging.startNewChat({
  account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  attendees_ids: ['user provider id'],
  text: 'send a inmail',
  options: {
    linkedin: {
      inmail: true,
    },
  },
});
```

## Invations

- Notify user that his profile has been consulted
  ```javascript
  await client.users.getProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user provider id',
    linkedin_sections: '*',
    notify: true,
  });
  ```
- Send LinkedIn Invitation
  ```javascript
  await client.users.sendInvitation({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    provider_id: 'user provider id',
    message: 'Send invitation',
  });
  ```
- List pending invitation
  ```javascript
  await client.users.getAllInvitationsSent({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- Delete Invitation
  ```javascript
  await client.users.cancelInvitationSent({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    invitation_id: '7221821214065876992',
  });
  ```

## Posts

- List Users/Companies posts
  ```javascript
  await client.users.getAllPosts({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user/company provider id',
  });
  ```
- Retrieve a post
  ```javascript
  await client.users.getPost({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
  });
  ```
- Create a new LinkedIn Post
  ```javascript
  await client.users.createPost({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    text: 'post content',
  });
  ```
- Send Comments in LinkedIn Post
  ```javascript
  await client.users.sendPostComment({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
    text: 'comment',
  });
  ```
- List Post Comments
  ```javascript
  await client.users.getAllPostComments({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
  });
  ```
- Add reaction on a post
  ```javascript
  await client.users.sendPostReaction({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
    reaction_type: 'funny',
  });
  ```

## Profiles

- List of contacts/Relations
  ```javascript
  await client.users.getAllRelations({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- Retrieve Companies Profiles
  ```javascript
  await client.users.getCompanyProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'Unipile',
  });
  ```
