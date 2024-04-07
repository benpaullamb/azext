export default () => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', chrome.runtime.getURL('content-script.css'));
  document.head.appendChild(link);
};
