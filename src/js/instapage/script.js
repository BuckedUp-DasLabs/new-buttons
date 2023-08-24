const urlParams = new URLSearchParams(window.location.search);
const origin = window.location.pathname.replace("/", "").replace("/", "");
document.cookie =
  "offer_id=" + origin + "; path=/; domain=.buckedup.com;max-age=3600";
localStorage.setItem("first_page", origin);
const orderID = urlParams.get("order_uuid");


//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.
const isLP = true;

if(isLP)
  urlParams.set("utm_source","")

// const country = "ca"

const productsID = [1045]; //ID of each the product
const isFinalPage = true;
const buyButtonsIds = ["#element-35"]; //IDs of each button of each product(in the order put in productID).
const noThanksButtonsIds = ["#element-36"]; //IDs of each button that denies the purchase
const buyRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after buying
const noThanksRedirect = `https://get.buckedup.com/dbdus3?${urlParams}`; //Link the user will be sent after denying

//DONT CHANGE
const buyButton = [];
const noThanksButton = [];

buyButtonsIds.forEach((id) => {
  buyButton.push(document.querySelector(id));
});

noThanksButtonsIds.forEach((id) => {
  noThanksButton.push(document.querySelector(id));
});

const row = {}
productsID.forEach(id=>{
  row[id] = document.querySelector(`.products-list.prod-${id}`)
})
//CHANGE FROM HERE UNTILL COMMENT SAYING TO STOP.


//OFFER STEP:
// Offer Page: lp
// Upsell 1: us1
// Upsell 2: us2
// Downsell: ds1
// Final page: fu

// ACTION:
// when user buys on Landing Page: purchase
// when user buys on Upsell or Downsell or Final page: purchase-us
// any other action: click

//CHANGE ONLY WHAT IS SAID TO CHANGE.
const setDataLayer = (event, action, value, currency=undefined) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    step_count: "", //lp, us1, us2, us3, ds1, ty
    page_id: "", //OG-LP-OMO, pegar pelo query da url, passar pra frente.
    version_id: "", //v1-control, v2-dropdown, v2-modal
    event: event, //offer_view, interaction
    action: action, //purchase, purchase-us, click, view_page
    value: value, //final purchase value
    currency: currency,
    transaction_id: orderID,
  });
};

const dataLayerStart = () => {
  setDataLayer((event = "pageview"), (action = "load"), (value = 0));
};

const dataLayerBuy = (price, currentCurrency) => {
  setDataLayer(
    (event = "interaction"),
    (action = "purchase"),
    (value = price), //dont change
    (currency = currentCurrency)
  );
};

const dataLayerRedirect = () => {
  setDataLayer((event = "offerview"), (action = "viewaction"), (value = 0));
};

const dataLayerNoThanks = () => {
  setDataLayer((event = "interaction"), (action = "click"), (value = 0));
};

//STOP HERE.

let hasStock = false;