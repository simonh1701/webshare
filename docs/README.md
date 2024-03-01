<h1 align="center">
  <br>
  <a href="https://webshare.simonh1701.app/">
    <img src="./resources/icon.svg" alt="WebShare Icon" width="120">
  </a>
  <br>
  WebShare
  <br>
</h1>

<h3 align="center" >Easily share text snippets accross devices.</h3>
<p align="center" ><b>WebShare is the web's clipboard.</b> Effortlessly share text snippets between different devices where traditional methods like email and messaging services would be too cumbersome to use.</p>

It is incredibly frustrating to rely on sending emails or using messaging apps just to transfer text snippets or links between devices. If you are logged in with the same account on both devices you have to message yourself. That feels like a hack rather than a solution, and is cluttering inboxes and message threads.
And what happens when you have set up neither service on one of the devices? This is where WebShare can help. With WebShare you simply:

1. **Open [Webshare](https://webshare.simonh1701.app/) on both devices**
2. **On Device 1: Send data in the _Share_ tab.** <br> Enter your data, encrypt it with a passphrase and get back a unique identifier that can be used to retrieve it.
3. **On device 2: Retrive data in the _Load_ tab.** <br> Enter the unique identifier and the corresponding passphrase to load the data.

| Encrypt And Share                                           | Load And Decrypt                                          |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| ![Encrypt And Share](./resources/Encrypt%20And%20Share.png) | ![Load And Decrypt](./resources/Load%20And%20Decrypt.png) |

## Features

Take a look at what WebShare has to offer and if it is right for you.

### Human-Readable IDs

WebShare creates user-friendly, easy-to-recall IDs when you share data. This makes it easy to type in the ID when retrieving the data on another device.

### Encryption

WebShare uses a passphrase you choose to encrypt your data with AES before sending it to the server. Unencrypted data never leaves your browser.

### Automatic Deletion

Your data will be deleted when a certain number of reads or a specified time has been reached.

## Technologies

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Components**: [Headless UI](https://headlessui.com/)
- **Database**: [Upstash Redis](https://upstash.com/)
