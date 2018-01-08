## Home Cloud
> A local file hosting system build on top of Node.js &amp; Express.js.

### Use Cases
> `Home Cloud` can be used for home members to interacte with home sharing data under local network. With `Home Cloud` installed, you are able to use it as file transfer station. 

> For media files you captured in your travel such as sound of bird tweeting, image of sea view or video of sunrise, if you would like to keep and stream them in local, use `Home Cloud`.

> For large size files you would like to transfer between your other local devices, use `Home Cloud`.

### Get it Started
> Choose one laptop as `Home Cloud` running environment then download and install Node.js through https://nodejs.org/en/. After that, download `Home Cloud` source code.

```sh
> cd home-cloud
> npm install
> npm run start

# server will listen to port 3000
# check your laptop IP_ADDRESS 
# so other devices in your home network can access it through IP_ADDRESS:3000
```

### Folder Structure
```bash
├── public
│   ├── Audio   # where audios hosted
│   ├── Video   # where videos hosted 
│   ├── Photo   # where photos hosted
│   ├── Doc     # where documents hosted
│   └── Other   # where files such as zip files or raw files hosted
├── ...
```

### Implementation List
- [x] Share/Stream Files 
- [ ] Upload Files to specific folder
- [ ] Add User Credentials

<br/><br/><br/><br/>
Built by [@ZhaoC](https://github.com/ZhaoC) with :heart:
