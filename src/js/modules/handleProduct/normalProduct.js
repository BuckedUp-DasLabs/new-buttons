import { haveAllStock, hasThisStock } from "./stockFunctions.js";
import { createButton } from "./domElements.js";
import toggleButton from "../toggleButton.js";

const compareFn = (a, b) => {
  if (a.getAttribute("order") > b.getAttribute("order")) return 1;
  return -1;
};

const createWrapper = (element, values) => {
  const domElementWrapper = document.createElement("div")
  domElementWrapper.classList.add("products-list__wrapper")
  let dropdown = undefined;
  if (element.classList.contains("has-dropdown-mobile")) {
    dropdown = document.createElement("div");
    const p = document.createElement("p");
    const svg = '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5981 15.5C11.4434 17.5 8.55662 17.5 7.40192 15.5L1.33975 5C0.185047 3 1.62842 0.499998 3.93782 0.499998L16.0622 0.499999C18.3716 0.5 19.815 3 18.6603 5L12.5981 15.5Z" fill="black"/></svg>'
    dropdown.setAttribute("role", "button");
    dropdown.classList.add("dropdown-mobile")
    p.innerHTML = values[0].name;
    dropdown.appendChild(p)
    dropdown.insertAdjacentHTML('beforeend', svg)
    element.appendChild(dropdown)
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    })
    document.addEventListener("click", (e) => {
      if(!dropdown.contains(e.target))
        dropdown.classList.remove("active")
    })
  }
  element.appendChild(domElementWrapper)
  return [domElementWrapper, dropdown];
}

const normalProduct = (data) => {
  if (!haveAllStock(data.product.options))
    window.location.href = noThanksRedirect;
  const optionsElements = Array.from(document.querySelectorAll(`.prod-${data.product.id}`)).sort(compareFn);
  hasStock = true;
  console.log(data);
  data.product.options.forEach((op, i) => {
    if (!hasThisStock(op.values)) window.location.href = noThanksRedirect;
    const [domElement, dropdownMobile] = createWrapper(optionsElements[i], op.values)
    console.log(dropdownMobile)
    op.values.filter((val) => val.in_stock).forEach((value) => {
      const [wrapper, button] = createButton(op.id, value.id, value.price, value.images[0], value.name);
      if (!value.in_stock) button.toggleAttribute("disabled");
      domElement.appendChild(wrapper);
      if (dropdownMobile)
        button.addEventListener("change", () => {
          if (button.checked)
            dropdownMobile.querySelector("p").innerHTML = button.getAttribute("label-text")
        })

    });
  });
  optionsElements.forEach(element => {
    element.querySelector("input").checked = true;
  })
  toggleButton();
};

export default normalProduct;
