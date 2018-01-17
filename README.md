## Home Cloud
> A local file hosting system build on top of Node.js &amp; Express.js.

### Use Cases
> `Home Cloud` can be used for home members to interact with home sharing data under local network. With `Home Cloud` installed, you are able to use it as file transfer station. You are able to transfer data between Mobile and Desktop using only browsers.

> For media files you captured in your travel such as sound of bird tweeting, image of sea view or video of sunrise, if you would like to keep and stream them locally, use `Home Cloud`.

### Live Demo
https://home-cloud.herokuapp.com
> Note: File uploading will be rejected for external ip request to avoid data flooding. Please try this feature locally. You can edit the `whitelist` for trusted IP address to upload content. `*` in whitelist will enable all ip request for uploading.

### Get it Started
Choose one laptop as `Home Cloud` running environment then download and install Node.js through https://nodejs.org/en/. After that, download `Home Cloud` source code.

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
- [x] Implement file sharing/stream function 
- [x] Implement file uploading function
- [x] Implement whitelist to enable file uploading for authorized IP address
- [ ] Implement automatic image slider
- [ ] Implement file editing
- [ ] Compress preview image to increase performance
<br/><br/><br/><br/>
Built by [@ZhaoC](https://github.com/ZhaoC) with :heart:
