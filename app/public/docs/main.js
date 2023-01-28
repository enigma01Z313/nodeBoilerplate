const url = `${document.location.origin}/api/docs`;
// const url = "api/docs"

const createApiItem = (apiVersion) => {
  const newApiItem = document.createElement("h2");
  const newApiItemLink = document.createElement("a");
  const newApiItemLinkText = document.createTextNode(apiVersion.slice(1));
  const newApiItemText = document.createTextNode("Api version: ");

  newApiItemLink.setAttribute("href", `${apiVersion}/`);
  newApiItemLink.setAttribute("target", "_blank");
  newApiItemLink.appendChild(newApiItemLinkText);

  newApiItem.appendChild(newApiItemText);
  newApiItem.appendChild(newApiItemLink);

  return newApiItem;
};

const printApiList = (data) => {
  const apiRoot = document.getElementById("apiList");
  data.forEach((item) => {
    const newApiItem = createApiItem(item);
    apiRoot.appendChild(newApiItem);
  });
};

fetch(url)
  .then((response) => response.json())
  .then((data) => printApiList(data));
