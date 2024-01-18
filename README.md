# Service Worker Caching Strategies

This project demonstrates the implementation of service workers alongside with caching strategies in order to create enhance the user experince in the web environment.
In this practical example you'll be presented to concepts such as:
- [Service Workers](https://web.dev/learn/pwa/service-workers)
- Data Fetching
- Web Storage / Cache Storage
- [Caching Stragegies](https://developer.chrome.com/docs/workbox/caching-strategies-overview)
- Developer Tools 

By default, the application operates in "Cache First Falling Back To Network" mode, but you can change it directly in the `service-worker.js` file.
![Cache First Falling Back To Network](https://github.com/robertheory/service-worker-offline-first/assets/41833666/39731181-dab8-43e2-bdc6-c1beefffbb34)
> Image from [Strategies for service worker caching on Chrome for Developers](https://developer.chrome.com/docs/workbox/caching-strategies-overview#cache_first_falling_back_to_network)

## Testing cache strategies

Follow these steps to observe and test the offline functionality:

1. Open the Website in the Browser:
   Open the index.html file in your preferred web browser.

2. Access Developer Tools:
   Right-click on the webpage and select "Inspect" or press Ctrl + Shift + I (Windows/Linux) or Cmd + Opt + I (Mac) to open the Developer Tools.

3. Navigate to the Network Tab:
   Within the Developer Tools, navigate to the "Network" tab.

4. Fetch Data with Internet:
   Type a valid github username then click on the "search" button on the webpage.
   Observe the network requests in the "Network" tab, confirming that data is fetched successfully.

5. Disable Internet Connection (Network Throttling):
   Within the Developer Tools, find the "Network Throttling" option and set it to "Offline" or disable the internet connection by other means.

6. Fetch Data Offline:
   Click on the "search" button again on the webpage.
   Observe that the network requests are still successful even with the internet connection disabled. This demonstrates the effectiveness of the service worker in providing an offline experience.

7. Disable Cache:
   Still in the "Network" tab, find the "Disable Cache" option and enable it.

8. Fetch Data with Cache Disabled:
   Click on the "Fetch Data" button once more.
   Observe that the network requests may now fail since the cache is disabled. This highlights the importance of caching for offline functionality.

These steps simulate a real-world scenario where the internet connection is lost, but the service worker allows the website to continue functioning by serving cached content.
Additionally, disabling the cache demonstrates the reliance on cached data for an optimal offline experience.

## Offline Experience Limitations

- While service workers can enhance the offline experience, complete offline functionality may have limitations.
- Dynamic content fetching, real-time updates, and certain interactive features may not work seamlessly in an offline mode.

## Browser Limitations

- Browsers have their own limitations on the caching size and storage, impacting the extent of offline content that can be stored.
- Some browsers may have varying levels of support for service workers or may require specific configurations.

## Customization Opportunities

- Despite limitations, developers can customize the offline experience to suit specific requirements.
- Techniques like graceful degradation and providing cached fallbacks for critical content can be employed to ensure a smoother offline experience.

Feel free to explore and modify the code to understand how service workers enable offline functionality in web applications. Happy coding!

## References

Service workers
https://web.dev/learn/pwa/service-workers

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

Strategies for service worker caching 
https://developer.chrome.com/docs/workbox/caching-strategies-overview

Related reading 
https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

https://developer.mozilla.org/en-US/docs/Web/API/Cache

https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

https://developer.chrome.com/docs/workbox/

https://web.dev/learn/pwa/progressive-web-apps

https://web.dev/learn/pwa/caching

https://web.dev/learn/pwa/offline-data
