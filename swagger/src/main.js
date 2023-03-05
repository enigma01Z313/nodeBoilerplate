const getNavigationItems = () => {
  const routesList = document.querySelectorAll(".wrapper span h3.opblock-tag");

  const navigationWrap = document.createElement("nav");

  routesList.forEach((item) => {
    const thisId = item.id;
    const thisName = item.dataset.tag;

    const thisElem = document.createElement("a");
    thisElem.dataset.goto = `${thisId}`;

    const thisText = document.createTextNode(thisName);
    thisElem.append(thisText);
    thisElem.addEventListener("click", (e) => {
      const gotoTarget = e.target.dataset.goto;
      const gotoElement = document.getElementById(gotoTarget).parentNode;
      const gotoTop = gotoElement.offsetTop - 105;
      console.log(gotoTop);
      document.getElementsByTagName("html")[0].scrollTo(0, gotoTop);
    });

    navigationWrap.append(thisElem);
  });

  return navigationWrap;
};

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(
    ".swagger-ui > div > .wrapper:not(.information-container)"
  );
  const main = document.querySelector(
    ".swagger-ui > div > .wrapper:not(.information-container) > section"
  );
  const mainClasses = main.classList;

  mainClasses.remove("col-12");
  mainClasses.remove("col-12-desktop");
  mainClasses.add("col-8");
  mainClasses.add("col-8-desktop");

  const navigationElement = document.createElement("div");
  navigationElement.id = "swagger-navigation";
  navigationElement.classList.add("col-4-desktop");
  navigationElement.classList.add("col-4");

  const navigationHeader = document.createElement("h3");
  const navigationHeaderTxt = document.createTextNode("Navigation");
  navigationHeader.prepend(navigationHeaderTxt);

  const navigationItems = getNavigationItems();

  navigationElement.prepend(navigationHeader);
  navigationElement.append(navigationItems);

  wrapper.prepend(navigationElement);
});
